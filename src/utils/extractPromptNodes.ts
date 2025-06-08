import { featuredTemplates } from '../config/templates';

interface PromptTemplate {
	name: string;
	type: 'input' | 'transform';
	template: string;
	category: string;
}

/**
 * Extracts individual prompt nodes from featured templates and converts them
 * to the format used in the FlowBuilder sidebar.
 */
export function extractPromptNodesFromFeaturedTemplates(): PromptTemplate[] {
	const extractedNodes: PromptTemplate[] = [];
	const seenTemplates = new Set<string>(); // To avoid duplicates

	featuredTemplates.forEach((template) => {
		template.nodes.forEach((node, nodeIndex) => {
			const nodeData = node.data;

			// Generate a meaningful name based on the node content
			const nodeName = generateNodeName(
				nodeData.content,
				nodeData.type,
				template.name,
				nodeIndex
			);

			// Create a unique key to avoid duplicates
			const templateKey = `${nodeData.type}-${normalizeContent(nodeData.content)}`;

			if (!seenTemplates.has(templateKey)) {
				seenTemplates.add(templateKey);

				extractedNodes.push({
					name: nodeName,
					type: nodeData.type,
					template: nodeData.content,
					category: template.category,
				});
			}
		});
	});

	return extractedNodes;
}

/**
 * Generates a descriptive name for a prompt node based on its content and context
 */
function generateNodeName(
	content: string,
	type: 'input' | 'transform',
	templateName: string,
	nodeIndex: number
): string {
	// For input nodes, try to identify what kind of input it's collecting
	if (type === 'input') {
		// Look for common patterns in template variables
		const templateVars = extractTemplateVariables(content);

		if (templateVars.includes('jobDescription') || templateVars.includes('resume')) {
			return 'Career Input Form';
		}
		if (templateVars.includes('companyName') || templateVars.includes('productService')) {
			return 'Sales Outreach Input';
		}
		if (templateVars.includes('blogTopic') || templateVars.includes('contentGoals')) {
			return 'Content Creation Input';
		}
		if (templateVars.includes('campaignObjective') || templateVars.includes('targetAudience')) {
			return 'Marketing Campaign Input';
		}
		if (
			templateVars.includes('datasetDescription') ||
			templateVars.includes('businessContext')
		) {
			return 'Data Analysis Input';
		}
		if (templateVars.includes('projectDescription') || templateVars.includes('stakeholders')) {
			return 'Project Planning Input';
		}
		if (templateVars.includes('meetingNotes') || templateVars.includes('meetingType')) {
			return 'Meeting Summary Input';
		}
		if (templateVars.includes('brandProduct') || templateVars.includes('brandGuidelines')) {
			return 'Brand Development Input';
		}
		if (templateVars.includes('clientInfo') || templateVars.includes('projectRequirements')) {
			return 'Sales Proposal Input';
		}
		if (templateVars.includes('originalContent') || templateVars.includes('contentType')) {
			return 'Content Repurposing Input';
		}

		// Default based on template name
		return `${templateName} Input`;
	}

	// For transform nodes, identify the purpose from the content
	const firstLine = content.split('\n')[0].toLowerCase();

	if (firstLine.includes('resume') || firstLine.includes('ats')) {
		return 'ATS Resume Optimizer';
	}
	if (firstLine.includes('cover letter')) {
		return 'Cover Letter Generator';
	}
	if (firstLine.includes('cold email') || firstLine.includes('outreach')) {
		return 'Cold Email Writer';
	}
	if (firstLine.includes('blog') || firstLine.includes('article')) {
		return 'Blog Post Writer';
	}
	if (firstLine.includes('social media') || firstLine.includes('campaign')) {
		return 'Social Media Campaign';
	}
	if (firstLine.includes('data analys') || firstLine.includes('insight')) {
		return 'Data Analyst';
	}
	if (firstLine.includes('project') && firstLine.includes('manage')) {
		return 'Project Manager';
	}
	if (firstLine.includes('meeting') && firstLine.includes('summary')) {
		return 'Meeting Summarizer';
	}
	if (firstLine.includes('brand') || firstLine.includes('identity')) {
		return 'Brand Strategist';
	}
	if (firstLine.includes('sales') && firstLine.includes('proposal')) {
		return 'Sales Proposal Writer';
	}
	if (firstLine.includes('lead') && firstLine.includes('qualif')) {
		return 'Lead Qualifier';
	}
	if (firstLine.includes('content') && firstLine.includes('promotion')) {
		return 'Content Promoter';
	}
	if (firstLine.includes('email') && firstLine.includes('marketing')) {
		return 'Email Marketer';
	}
	if (firstLine.includes('repurpos') || firstLine.includes('format')) {
		return 'Content Repurposer';
	}
	if (firstLine.includes('follow-up') || firstLine.includes('tracking')) {
		return 'Follow-up Coordinator';
	}
	if (firstLine.includes('presentation') || firstLine.includes('stakeholder')) {
		return 'Presentation Builder';
	}
	if (firstLine.includes('governance') || firstLine.includes('template')) {
		return 'Process Documentor';
	}

	// Fallback: try to identify key action words
	if (content.includes('analyz') || content.includes('assess')) {
		return `${templateName} Analyzer`;
	}
	if (content.includes('creat') || content.includes('generat')) {
		return `${templateName} Creator`;
	}
	if (content.includes('optim') || content.includes('improv')) {
		return `${templateName} Optimizer`;
	}
	if (content.includes('transform') || content.includes('convert')) {
		return `${templateName} Transformer`;
	}

	// Final fallback
	return `${templateName} Transform ${nodeIndex + 1}`;
}

/**
 * Extracts template variables from content (e.g., {{variable}})
 */
function extractTemplateVariables(content: string): string[] {
	const regex = /\{\{([^}]+)\}\}/g;
	const variables: string[] = [];
	let match;

	while ((match = regex.exec(content)) !== null) {
		variables.push(match[1].trim());
	}

	return variables;
}

/**
 * Normalizes content for comparison (removes extra whitespace, etc.)
 */
function normalizeContent(content: string): string {
	return content.replace(/\s+/g, ' ').trim().substring(0, 100);
}
