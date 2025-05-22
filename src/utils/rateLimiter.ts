interface RateLimitConfig {
	maxRequests: number; // Maximum number of requests
	windowMs: number; // Time window in milliseconds
}

export class RateLimiter {
	private requests: number[] = [];
	private config: RateLimitConfig;

	constructor(config: RateLimitConfig) {
		this.config = config;
	}

	async waitForCapacity(): Promise<void> {
		const now = Date.now();
		this.requests = this.requests.filter((time) => time > now - this.config.windowMs);

		if (this.requests.length >= this.config.maxRequests) {
			const oldestRequest = this.requests[0];
			const waitTime = oldestRequest + this.config.windowMs - now;
			await new Promise((resolve) => setTimeout(resolve, waitTime));
			return this.waitForCapacity();
		}

		this.requests.push(now);
	}
}

// Create rate limiters for different providers
export const rateLimiters = {
	openai: new RateLimiter({ maxRequests: 20, windowMs: 60 * 1000 }), // 20 requests per minute
	anthropic: new RateLimiter({ maxRequests: 10, windowMs: 60 * 1000 }), // 10 requests per minute
};
