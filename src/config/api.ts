const isDevelopment = import.meta.env.MODE === 'development';

export const API_CONFIG = {
	openai: {
		apiKey: import.meta.env.VITE_OPENAI_API_KEY,
		baseUrl: isDevelopment ? '/api/openai' : 'https://api.openai.com/v1',
	},
	anthropic: {
		apiKey: import.meta.env.VITE_ANTHROPIC_API_KEY,
		baseUrl: isDevelopment ? '/api/anthropic' : 'https://api.anthropic.com/v1',
	},
};

export type ModelProvider = 'openai' | 'anthropic';

export interface ProviderConfig {
	apiKey: string;
	baseUrl: string;
}

export const getProviderConfig = (provider: ModelProvider): ProviderConfig => {
	const config = API_CONFIG[provider];
	if (!config.apiKey) {
		throw new Error(
			`API key not found for ${provider}. Please set ${
				provider === 'openai' ? 'VITE_OPENAI_API_KEY' : 'VITE_ANTHROPIC_API_KEY'
			} in your environment.`
		);
	}
	return config;
};
