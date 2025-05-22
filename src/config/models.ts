interface ModelConfig {
	name: string;
	maxOutput: number;
}

export const MODEL_CONFIGS: Record<string, ModelConfig> = {
	'gpt-4.1-2025-04-14': {
		name: 'GPT-4.1',
		maxOutput: 32768,
	},
	'gpt-4o-2024-08-06': {
		name: 'GPT-4o',
		maxOutput: 16384,
	},
	'o4-mini-2025-04-16': {
		name: 'o4-Mini',
		maxOutput: 100000,
	},
	'claude-3-7-sonnet-20250219': {
		name: 'Claude 3.7 Sonnet',
		maxOutput: 64000,
	},
	'claude-3-5-haiku-20241022': {
		name: 'Claude 3.5 Haiku',
		maxOutput: 4096,
	},
} as const;

export type SupportedModel = keyof typeof MODEL_CONFIGS;

export const getModelConfig = (model: string): ModelConfig => {
	const config = MODEL_CONFIGS[model as SupportedModel];
	if (!config) {
		throw new Error(`Unsupported model: ${model}`);
	}
	return config;
};

export const formatModelName = (model: string): string => {
	return getModelConfig(model).name;
};

export const getMaxOutputTokens = (model: string): number => {
	return getModelConfig(model).maxOutput;
};

export const getAnthropicModelName = (model: string): string => {
	// If it's already an Anthropic model name, return as is
	if (model.startsWith('claude-')) {
		return model;
	}
	throw new Error(`Not an Anthropic model: ${model}`);
};

// Get the first available model as default
export const DEFAULT_MODEL = Object.keys(MODEL_CONFIGS)[0] as SupportedModel;
