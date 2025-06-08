// Real-time data integration example
import { SupportedModel } from '../config/models';
import { createCompletion } from './ai';

interface DataSource {
	name: string;
	url: string;
	headers?: Record<string, string>;
	transform?: (data: unknown) => unknown;
}

// Configure available data sources
export const DATA_SOURCES: Record<string, DataSource> = {
	weather: {
		name: 'Weather API',
		url: 'https://api.openweathermap.org/data/2.5/weather',
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_WEATHER_API_KEY}`,
		},
	},
	news: {
		name: 'News API',
		url: 'https://newsapi.org/v2/top-headlines',
		headers: {
			'X-API-Key': import.meta.env.VITE_NEWS_API_KEY,
		},
	},
	stocks: {
		name: 'Stock API',
		url: 'https://api.polygon.io/v2/aggs/ticker',
		headers: {
			Authorization: `Bearer ${import.meta.env.VITE_STOCKS_API_KEY}`,
		},
	},
};

// Function to fetch real-time data
export async function fetchRealTimeData(
	source: keyof typeof DATA_SOURCES,
	params: Record<string, string>
): Promise<unknown> {
	const config = DATA_SOURCES[source];
	if (!config) {
		throw new Error(`Unknown data source: ${source}`);
	}

	const url = new URL(config.url);
	Object.entries(params).forEach(([key, value]) => {
		url.searchParams.append(key, value);
	});

	try {
		const response = await fetch(url.toString(), {
			headers: config.headers,
		});

		if (!response.ok) {
			throw new Error(`Failed to fetch from ${config.name}: ${response.statusText}`);
		}

		const data = await response.json();
		return config.transform ? config.transform(data) : data;
	} catch (error) {
		console.error(`Error fetching real-time data from ${config.name}:`, error);
		throw error;
	}
}

// Enhanced AI completion with real-time data
export async function getCompletionWithRealTimeData({
	prompt,
	model,
	dataSources = [],
	temperature = 0.7,
	maxTokens,
}: {
	prompt: string;
	model: SupportedModel;
	dataSources?: Array<{ source: keyof typeof DATA_SOURCES; params: Record<string, string> }>;
	temperature?: number;
	maxTokens?: number;
}) {
	// Fetch real-time data if requested
	let contextData = '';
	if (dataSources.length > 0) {
		const dataPromises = dataSources.map(async ({ source, params }) => {
			try {
				const data = await fetchRealTimeData(source, params);
				return `${DATA_SOURCES[source].name} Data: ${JSON.stringify(data, null, 2)}`;
			} catch (error) {
				return `${DATA_SOURCES[source].name} Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
			}
		});

		const results = await Promise.all(dataPromises);
		contextData = results.join('\n\n');
	}

	// Enhance prompt with real-time data
	const enhancedPrompt = contextData
		? `Current Data Context:\n${contextData}\n\nUser Request:\n${prompt}\n\nPlease use the current data context to provide an accurate, up-to-date response.`
		: prompt;

	// Use existing AI service
	return await createCompletion({
		prompt: enhancedPrompt,
		model,
		temperature,
		maxTokens,
	});
}
