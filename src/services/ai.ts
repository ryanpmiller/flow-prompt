import { SupportedModel, getAnthropicModelName } from '../config/models';
import { rateLimiters } from '../utils/rateLimiter';

interface CompletionResult {
	text: string;
	usage: {
		prompt_tokens: number;
		completion_tokens: number;
		total_tokens: number;
	};
}

interface APIErrorOptions {
	status?: number;
	code?: string;
}

class APIError extends Error {
	status?: number;
	code?: string;

	constructor(message: string, options?: APIErrorOptions) {
		super(message);
		this.name = 'APIError';
		if (options) {
			this.status = options.status;
			this.code = options.code;
		}
	}
}

const validateEnvironment = () => {
	if (!import.meta.env.VITE_OPENAI_API_KEY && !import.meta.env.VITE_ANTHROPIC_API_KEY) {
		throw new Error(
			'No API keys found. Please set VITE_OPENAI_API_KEY and/or VITE_ANTHROPIC_API_KEY'
		);
	}
};

const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 1000;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const handleAPIResponse = async (response: Response, apiName: string) => {
	if (response.ok) {
		return await response.json();
	}

	const error = await response.json().catch(() => null);
	const message = error?.error?.message || `${apiName} API error: ${response.statusText}`;
	throw new APIError(message, {
		status: response.status,
		code: error?.error?.code,
	});
};

const normalizeUsage = (usage: {
	prompt_tokens: number;
	completion_tokens: number;
	total_tokens?: number;
}) => {
	return {
		prompt_tokens: usage.prompt_tokens,
		completion_tokens: usage.completion_tokens,
		total_tokens: usage.total_tokens ?? usage.prompt_tokens + usage.completion_tokens,
	};
};

export const createCompletion = async ({
	prompt,
	model,
	temperature = 0.7,
	maxTokens
}: {
	prompt: string;
	model: SupportedModel;
	temperature?: number;
	maxTokens?: number;
	max_completion_tokens?: number;
}): Promise<CompletionResult> => {
	validateEnvironment();

	const isAnthropicModel = model.startsWith('claude-');
	const rateLimiter = isAnthropicModel ? rateLimiters.anthropic : rateLimiters.openai;

	let lastError: Error | null = null;
	for (let attempt = 0; attempt < MAX_RETRIES; attempt++) {
		try {
			// Wait for rate limit capacity
			await rateLimiter.waitForCapacity();

			if (isAnthropicModel) {
				if (!import.meta.env.VITE_ANTHROPIC_API_KEY) {
					throw new Error('Anthropic API key not found');
				}

				const response = await fetch('/api/anthropic/messages', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						'x-api-key': import.meta.env.VITE_ANTHROPIC_API_KEY,
						'anthropic-version': '2023-06-01',
						'anthropic-dangerous-direct-browser-access': 'true',
					},
					body: JSON.stringify({
						model: getAnthropicModelName(model),
						messages: [{ role: 'user', content: prompt }],
						max_tokens: maxTokens,
						temperature,
						stream: false,
					}),
				});

				const result = await handleAPIResponse(response, 'Anthropic');
				return {
					text: result.content[0].text,
					usage: normalizeUsage({
						prompt_tokens: result.usage.input_tokens,
						completion_tokens: result.usage.output_tokens,
						total_tokens: result.usage.input_tokens + result.usage.output_tokens,
					}),
				};
			} else {
				if (!import.meta.env.VITE_OPENAI_API_KEY) {
					throw new Error('OpenAI API key not found');
				}

				// Determine which token parameter to use
				const tokenLimit = model.startsWith('o4-mini')
					? { max_completion_tokens: maxTokens }
					: { max_tokens: maxTokens };

				const response = await fetch('/api/openai/chat/completions', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
					},
					body: JSON.stringify({
						model,
						messages: [{ role: 'user', content: prompt }],
						...tokenLimit,
						temperature,
					}),
				});

				const result = await handleAPIResponse(response, 'OpenAI');
				return {
					text: result.choices[0].message.content,
					usage: normalizeUsage(result.usage),
				};
			}
		} catch (error) {
			lastError = error as Error;

			// Don't retry on authentication or validation errors
			if (error instanceof APIError && (error.status === 401 || error.status === 400)) {
				throw error;
			}

			// On last attempt, throw the error
			if (attempt === MAX_RETRIES - 1) {
				throw error;
			}

			// Wait before retrying
			await sleep(RETRY_DELAY_MS * Math.pow(2, attempt));
		}
	}

	throw lastError || new Error('Maximum retries exceeded');
};
