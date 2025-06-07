import { Edge } from 'reactflow';

import { DEFAULT_MODEL, SupportedModel, getModelConfig } from '../config/models';
import { createCompletion } from '../services/ai';
import { PromptNode } from '../store/flowStore';
import { getMaxOutputTokens } from './tokenCounter';

interface ExecutePromptParams {
	content: string;
	settings?: {
		temperature?: number;
		model?: SupportedModel;
		tone?: string;
	};
}

export interface NodeResult {
	text: string;
	usage?: {
		promptTokens: number;
		completionTokens: number;
		totalTokens: number;
	};
	error?: string;
}

const callLLM = async ({ content, settings }: ExecutePromptParams): Promise<NodeResult> => {
	try {
		const model = settings?.model || DEFAULT_MODEL;
		const modelConfig = getModelConfig(model);
		const maxOutputTokens = modelConfig.maxOutput;
		const tokenParam = modelConfig.maxTokensParam || 'maxTokens';

		const response = await createCompletion({
			prompt: content,
			model,
			temperature: settings?.temperature,
			[tokenParam]: maxOutputTokens,
		});

		const usage = {
			promptTokens: response.usage.prompt_tokens,
			completionTokens: response.usage.completion_tokens,
			totalTokens:
				response.usage.total_tokens ??
				response.usage.prompt_tokens + response.usage.completion_tokens,
		};

		return {
			text: response.text,
			usage,
		};
	} catch (error) {
		const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
		console.error('Error calling LLM:', error);
		return {
			text: `Error: ${errorMessage}`,
			error: errorMessage,
		};
	}
};

const getNodeInputs = (
	nodeId: string,
	nodes: PromptNode[],
	edges: Edge[]
): { nodeIds: string[]; values: string[] } => {
	const inputEdges = edges.filter((edge) => edge.target === nodeId);
	const inputNodeIds = inputEdges.map((edge) => edge.source);
	const inputValues = inputNodeIds.map((id) => {
		const node = nodes.find((n) => n.id === id);
		return node?.data.content || '';
	});

	return { nodeIds: inputNodeIds, values: inputValues };
};

const replaceTemplateVariables = (template: string, variables: Record<string, unknown>): string => {
	// First, try to extract the tone from settings and add it to variables
	if (variables.tone) {
		template = template.replace(/{{tone}}/g, String(variables.tone));
	}

	// Replace other variables
	return template.replace(/{{(\w+)}}/g, (_, key) => {
		const value = variables[key];
		if (value === undefined) {
			console.warn(`Template variable {{${key}}} not provided`);
			return `{{${key}}}`;
		}
		return String(value);
	});
};

export interface FlowExecutionResult {
	results: Map<string, NodeResult>;
	totalUsage: {
		promptTokens: number;
		completionTokens: number;
		totalTokens: number;
	};
}

export const executeFlow = async (
	nodes: PromptNode[],
	edges: Edge[]
): Promise<FlowExecutionResult> => {
	const results = new Map<string, NodeResult>();
	const processed = new Set<string>();
	const totalUsage = {
		promptTokens: 0,
		completionTokens: 0,
		totalTokens: 0,
	};

	const processNode = async (nodeId: string): Promise<string> => {
		if (processed.has(nodeId)) {
			return results.get(nodeId)?.text || '';
		}

		const node = nodes.find((n) => n.id === nodeId);
		if (!node) return '';

		try {
			const { nodeIds, values } = getNodeInputs(nodeId, nodes, edges);

			// Wait for all input nodes to be processed
			await Promise.all(nodeIds.map(processNode));

			// Create variables object from input values and settings
			const variables: Record<string, unknown> = {
				...node.data.settings,
				input: values[0] || '', // First input as default
			};

			// Add numbered inputs if there are multiple
			values.forEach((value, index) => {
				variables[`input${index + 1}`] = value;
			});

			// Smart input handling for transform nodes
			let processedContent: string;

			if (node.data.type === 'transform' && values.length > 0) {
				// For transform nodes with input connections, automatically inject input
				const inputContent = values[0]; // Primary input content

				// Check if the user already has {{input}} in their content
				const hasInputVariable = node.data.content.includes('{{input}}');

				if (hasInputVariable) {
					// User explicitly used {{input}}, so use normal variable replacement
					processedContent = replaceTemplateVariables(node.data.content, variables);
				} else {
					// User didn't use {{input}}, so automatically inject input content
					// Format: Input content first, then user's transformation instructions
					const userInstructions = replaceTemplateVariables(node.data.content, variables);
					processedContent = inputContent.trim() + '\n\n' + userInstructions;
				}
			} else {
				// For input nodes or transform nodes without connections, use normal processing
				processedContent = replaceTemplateVariables(node.data.content, variables);
			}

			const result = await callLLM({
				content: processedContent,
				settings: node.data.settings,
			});

			results.set(nodeId, result);
			processed.add(nodeId);

			// Update total usage if available
			if (result.usage) {
				totalUsage.promptTokens += result.usage.promptTokens;
				totalUsage.completionTokens += result.usage.completionTokens;
				totalUsage.totalTokens += result.usage.totalTokens;
			}

			return result.text;
		} catch (error) {
			const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
			const result: NodeResult = {
				text: `Error: ${errorMessage}`,
				error: errorMessage,
			};
			results.set(nodeId, result);
			processed.add(nodeId);
			return result.text;
		}
	};

	// Find end nodes (nodes with no outgoing edges)
	const endNodes = nodes.filter((node) => !edges.some((edge) => edge.source === node.id));

	// Process all end nodes and their dependencies
	await Promise.all(endNodes.map((node) => processNode(node.id)));

	return { results, totalUsage };
};

export const executeNode = async (
	node: PromptNode,
	input: string | null = null
): Promise<NodeResult> => {
	const settings = node.data.settings || {};
	const model = settings.model || DEFAULT_MODEL;
	const maxOutputTokens = getMaxOutputTokens(model);

	// Smart input handling for transform nodes
	let promptContent: string;

	if (input && node.data.type === 'transform') {
		// Check if the user already has {{input}} in their content
		const hasInputVariable = node.data.content.includes('{{input}}');

		if (hasInputVariable) {
			// User explicitly used {{input}}, so replace it normally
			promptContent = node.data.content.replace('{{input}}', input);
		} else {
			// User didn't use {{input}}, so automatically inject input content
			// Format: Input content first, then user's transformation instructions
			promptContent = input.trim() + '\n\n' + node.data.content;
		}
	} else {
		// For input nodes or when no input provided, use content as-is
		promptContent = node.data.content;
	}

	const result = await createCompletion({
		prompt: promptContent,
		model,
		temperature: settings.temperature,
		maxTokens: maxOutputTokens,
	});

	const usage = {
		promptTokens: result.usage.prompt_tokens,
		completionTokens: result.usage.completion_tokens,
		totalTokens:
			result.usage.total_tokens ??
			result.usage.prompt_tokens + result.usage.completion_tokens,
	};

	return {
		text: result.text,
		usage,
	};
};

export const isAnthropicModel = (model: string): boolean => {
	return model.includes('claude-3');
};

export const getAnthropicModelName = (model: string): string => {
	// The model names already include version strings, so we can use them directly
	return model;
};
