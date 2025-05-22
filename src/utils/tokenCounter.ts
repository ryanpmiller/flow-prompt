import { encode } from 'gpt-tokenizer';

import { getMaxOutputTokens as getConfigMaxOutputTokens } from '../config/models';

export interface TokenCount {
	prompt: number;
	completion: number;
	total: number;
}

export interface TokenUsage {
	used: TokenCount;
	remaining: number;
}

export const getMaxOutputTokens = (model: string): number => {
	return getConfigMaxOutputTokens(model);
};

export const countTokens = (text: string | null | undefined): number => {
	if (!text || typeof text !== 'string') return 0;
	try {
		// Clean up the text - remove null characters and normalize whitespace
		const cleanText = text.replace(/\0/g, '').trim();
		if (!cleanText) return 0;

		const tokens = encode(cleanText);
		const count = tokens.length;
		return isNaN(count) ? 0 : count;
	} catch (error) {
		console.warn('Error counting tokens:', error);
		return 0;
	}
};

export const estimateTokenUsage = (
	prompt: string | null | undefined,
	completion: string | null | undefined = null
): TokenCount => {
	const promptTokens = countTokens(prompt);
	const completionTokens = countTokens(completion);

	return {
		prompt: promptTokens,
		completion: completionTokens,
		total: promptTokens + completionTokens,
	};
};

export const formatTokenCount = (count: number | null | undefined): string => {
	if (typeof count !== 'number' || isNaN(count)) return '0';
	return count.toLocaleString();
};
