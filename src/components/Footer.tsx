import { Link } from 'react-router-dom';

export default function Footer() {
	const currentYear = new Date().getFullYear();

	// Social sharing functions
	const shareOnTwitter = () => {
		const text = 'Check out PromptFlow - Create powerful AI prompt workflows with ease! 🚀';
		const url = 'https://promptflow.com';
		const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
		window.open(twitterUrl, '_blank', 'noopener,noreferrer');
	};

	const shareOnLinkedIn = () => {
		const url = 'https://promptflow.com';
		const title = 'PromptFlow - AI Prompt Workflow Builder';
		const summary =
			"Create powerful AI prompt workflows with ease using PromptFlow's intuitive builder.";
		const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}&summary=${encodeURIComponent(summary)}`;
		window.open(linkedInUrl, '_blank', 'noopener,noreferrer');
	};

	const shareOnFacebook = () => {
		const url = 'https://promptflow.com';
		const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
		window.open(facebookUrl, '_blank', 'noopener,noreferrer');
	};

	const shareOnReddit = () => {
		const url = 'https://promptflow.com';
		const title = 'PromptFlow - AI Prompt Workflow Builder';
		const redditUrl = `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`;
		window.open(redditUrl, '_blank', 'noopener,noreferrer');
	};

	return (
		<footer className="bg-gray-50 border-t border-gray-200">
			<div className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
				<div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
					{/* Product */}
					<div>
						<h3 className="text-xs sm:text-sm font-semibold text-gray-600 tracking-wider uppercase mb-3 sm:mb-4">
							Product
						</h3>
						<div className="space-y-2 sm:space-y-3">
							<Link
								to="/build"
								className="text-sm sm:text-base text-gray-500 hover:text-gray-900 block transition-colors"
							>
								Builder
							</Link>
							<Link
								to="/templates"
								className="text-sm sm:text-base text-gray-500 hover:text-gray-900 block transition-colors"
							>
								Templates
							</Link>
							<Link
								to="/pricing"
								className="text-sm sm:text-base text-gray-500 hover:text-gray-900 block transition-colors"
							>
								Pricing
							</Link>
							<a
								href="#"
								className="text-sm sm:text-base text-gray-500 hover:text-gray-900 block transition-colors"
							>
								Features
							</a>
						</div>
					</div>

					{/* Resources */}
					<div>
						<h3 className="text-xs sm:text-sm font-semibold text-gray-600 tracking-wider uppercase mb-3 sm:mb-4">
							Resources
						</h3>
						<div className="space-y-2 sm:space-y-3">
							<Link
								to="/faq"
								className="text-sm sm:text-base text-gray-500 hover:text-gray-900 block transition-colors"
							>
								FAQ
							</Link>
							<a
								href="https://github.com/ryanpmiller/flow-prompt"
								className="text-sm sm:text-base text-gray-500 hover:text-gray-900 block transition-colors"
								target="_blank"
								rel="noopener noreferrer"
							>
								GitHub
							</a>
							<a
								href="#"
								className="text-sm sm:text-base text-gray-500 hover:text-gray-900 block transition-colors"
							>
								Documentation
							</a>
							<a
								href="#"
								className="text-sm sm:text-base text-gray-500 hover:text-gray-900 block transition-colors"
							>
								Tutorials
							</a>
							<a
								href="#"
								className="text-sm sm:text-base text-gray-500 hover:text-gray-900 block transition-colors"
							>
								API Reference
							</a>
						</div>
					</div>

					{/* Company */}
					<div>
						<h3 className="text-xs sm:text-sm font-semibold text-gray-600 tracking-wider uppercase mb-3 sm:mb-4">
							Company
						</h3>
						<div className="space-y-2 sm:space-y-3">
							<a
								href="#"
								className="text-sm sm:text-base text-gray-500 hover:text-gray-900 block transition-colors"
							>
								About Us
							</a>
							<a
								href="#"
								className="text-sm sm:text-base text-gray-500 hover:text-gray-900 block transition-colors"
							>
								Blog
							</a>
							<a
								href="#"
								className="text-sm sm:text-base text-gray-500 hover:text-gray-900 block transition-colors"
							>
								Contact
							</a>
							<a
								href="#"
								className="text-sm sm:text-base text-gray-500 hover:text-gray-900 block transition-colors"
							>
								Careers
							</a>
							<a
								href="#"
								className="text-sm sm:text-base text-gray-500 hover:text-gray-900 block transition-colors"
							>
								Status
							</a>
						</div>
					</div>

					{/* Legal */}
					<div>
						<h3 className="text-xs sm:text-sm font-semibold text-gray-600 tracking-wider uppercase mb-3 sm:mb-4">
							Legal
						</h3>
						<div className="space-y-2 sm:space-y-3">
							<Link
								to="/privacy"
								className="text-sm sm:text-base text-gray-500 hover:text-gray-900 block transition-colors"
							>
								Privacy
							</Link>
							<Link
								to="/terms"
								className="text-sm sm:text-base text-gray-500 hover:text-gray-900 block transition-colors"
							>
								Terms
							</Link>
							<a
								href="#"
								className="text-sm sm:text-base text-gray-500 hover:text-gray-900 block transition-colors"
							>
								Security
							</a>
							<a
								href="#"
								className="text-sm sm:text-base text-gray-500 hover:text-gray-900 block transition-colors"
							>
								Cookies
							</a>
						</div>
					</div>
				</div>

				{/* Newsletter Signup */}
				<div className="mt-8 pt-6 border-t border-gray-200 sm:mt-12 sm:pt-8">
					<div className="mx-auto text-center">
						<h3 className="text-base font-semibold text-gray-900 mb-2 sm:text-lg">
							Stay Updated
						</h3>
						<p className="text-sm text-gray-600 mb-3 sm:text-base sm:mb-4">
							Get the latest updates, tips, and new templates delivered to your inbox.
						</p>
						<div className="flex flex-col space-y-2 max-w-xs mx-auto sm:flex-row sm:space-y-0 sm:space-x-3 sm:max-w-md">
							<input
								type="email"
								placeholder="Enter your email"
								className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:px-4 sm:text-base"
							/>
							<button className="px-4 py-2 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors sm:px-6 sm:text-base">
								Subscribe
							</button>
						</div>
						<p className="text-xs text-gray-500 mt-2">
							No spam. Unsubscribe at any time.
						</p>
					</div>
				</div>

				<div className="mt-8 border-t border-gray-200 pt-6 sm:pt-8 md:flex md:items-center md:justify-between">
					<div className="flex justify-center space-x-6 mb-4 md:mb-0 md:order-2">
						<button
							onClick={shareOnTwitter}
							className="text-gray-400 hover:text-gray-500 transition-colors"
						>
							<span className="sr-only">Share on Twitter</span>
							<svg
								className="h-5 w-5 sm:h-6 sm:w-6"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
							</svg>
						</button>
						<a
							href="https://github.com/ryanpmiller/flow-prompt"
							className="text-gray-400 hover:text-gray-500 transition-colors"
							target="_blank"
							rel="noopener noreferrer"
						>
							<span className="sr-only">GitHub</span>
							<svg
								className="h-5 w-5 sm:h-6 sm:w-6"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									fillRule="evenodd"
									d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
									clipRule="evenodd"
								/>
							</svg>
						</a>
						<button
							onClick={shareOnLinkedIn}
							className="text-gray-400 hover:text-gray-500 transition-colors"
						>
							<span className="sr-only">Share on LinkedIn</span>
							<svg
								className="h-5 w-5 sm:h-6 sm:w-6"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									fillRule="evenodd"
									d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
						<button
							onClick={shareOnFacebook}
							className="text-gray-400 hover:text-gray-500 transition-colors"
						>
							<span className="sr-only">Share on Facebook</span>
							<svg
								className="h-5 w-5 sm:h-6 sm:w-6"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
							</svg>
						</button>
						<button
							onClick={shareOnReddit}
							className="text-gray-400 hover:text-gray-500 transition-colors"
						>
							<span className="sr-only">Share on Reddit</span>
							<svg
								className="h-5 w-5 sm:h-6 sm:w-6"
								fill="currentColor"
								viewBox="0 0 24 24"
							>
								<path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
							</svg>
						</button>
					</div>
					<p className="text-center text-sm text-gray-400 sm:text-base md:mt-0 md:order-1 md:text-left">
						&copy; {currentYear} PromptFlow. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	);
}
