import { useState } from 'react';

interface FAQItem {
	question: string;
	answer: string;
}

const faqData: FAQItem[] = [
	{
		question: 'What is PromptFlow?',
		answer: 'PromptFlow is a powerful AI prompt workflow builder that allows you to create, manage, and execute complex AI prompt chains. You can build sophisticated workflows by connecting multiple AI prompts together to automate tasks and create more intelligent AI interactions.',
	},
	{
		question: 'How do I create my first workflow?',
		answer: "To create your first workflow, click on the 'Builder' button in the navigation or go to the Build page. You can start from scratch by adding prompt nodes and connecting them, or choose from our pre-built templates to get started quickly.",
	},
	{
		question: 'What are templates and how do I use them?',
		answer: 'Templates are pre-built workflow configurations for common use cases like content creation, data analysis, customer support, and more. You can browse templates on the Templates page, click on one you like, and it will load in the workflow builder where you can customize it to your needs.',
	},
	{
		question: 'How do I connect prompt nodes together?',
		answer: 'In the workflow builder, you can connect nodes by dragging from the output handle (right side) of one node to the input handle (left side) of another node. This creates a flow where the output of one prompt becomes the input for the next prompt.',
	},
	{
		question: 'Can I save my own templates?',
		answer: "Yes! Once you've created a workflow you're happy with, you can save it as a template by clicking the 'Save Template' button in the toolbar. You can give it a name, description, and assign it to a category for easy organization.",
	},
	{
		question: 'What AI models are supported?',
		answer: 'PromptFlow supports various AI models including GPT-3.5, GPT-4, Claude, and other popular language models. You can configure which model to use for each prompt node in your workflow.',
	},
	{
		question: 'Is there a limit to how many nodes I can add?',
		answer: 'There are no strict limits on the number of nodes you can add to a workflow. However, very large workflows may take longer to execute and could be subject to rate limiting from AI providers.',
	},
	{
		question: 'How do I handle errors in my workflows?',
		answer: "PromptFlow includes built-in error handling. If a node fails during execution, you'll see an error indicator and can inspect the error details. You can also set up conditional flows to handle different scenarios.",
	},
	{
		question: 'Can I export or share my workflows?',
		answer: "Currently, you can save workflows as templates which can be shared within the application. We're working on additional export and sharing features for future releases.",
	},
	{
		question: 'Is my data secure?',
		answer: 'Yes, we take data security seriously. Your workflows and data are stored securely, and we follow best practices for data protection. Please see our Privacy Policy for detailed information about how we handle your data.',
	},
	{
		question: 'Do you offer customer support?',
		answer: 'Yes! If you have questions or need help, you can reach out to our support team through the contact information provided in the footer, or check our documentation and GitHub repository for additional resources.',
	},
	{
		question: "What's the difference between the free and paid plans?",
		answer: 'The free plan includes basic workflow building features and a limited number of executions per month. Paid plans offer more executions, advanced features, priority support, and access to premium templates. Check our Pricing page for detailed plan comparisons.',
	},
];

export default function FAQ() {
	const [openItems, setOpenItems] = useState<number[]>([]);

	const toggleItem = (index: number) => {
		setOpenItems((prev) =>
			prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
		);
	};

	return (
		<div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
			<div className="bg-white rounded-lg shadow-sm p-8">
				<div className="text-center mb-12">
					<h1 className="text-3xl font-bold text-gray-900 mb-4">
						Frequently Asked Questions
					</h1>
					<p className="text-lg text-gray-600">
						Find answers to common questions about PromptFlow and how to get the most
						out of your AI workflows.
					</p>
				</div>

				<div className="space-y-4">
					{faqData.map((item, index) => (
						<div key={index} className="border border-gray-200 rounded-lg">
							<button
								onClick={() => toggleItem(index)}
								className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-inset"
							>
								<span className="text-lg font-medium text-gray-900">
									{item.question}
								</span>
								<svg
									className={`w-5 h-5 text-gray-500 transform transition-transform duration-200 ${
										openItems.includes(index) ? 'rotate-180' : ''
									}`}
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 9l-7 7-7-7"
									/>
								</svg>
							</button>
							{openItems.includes(index) && (
								<div className="px-6 pb-4">
									<p className="text-gray-700 leading-relaxed">{item.answer}</p>
								</div>
							)}
						</div>
					))}
				</div>

				<div className="mt-12 bg-blue-50 rounded-lg p-6">
					<h3 className="text-lg font-semibold text-blue-900 mb-2">
						Still have questions?
					</h3>
					<p className="text-blue-700 mb-4">
						Can't find what you're looking for? We're here to help!
					</p>
					<div className="flex flex-col sm:flex-row gap-4">
						<a
							href="https://github.com/ryanpmiller/flow-prompt"
							target="_blank"
							rel="noopener noreferrer"
							className="inline-flex items-center px-4 py-2 border border-blue-300 rounded-md shadow-sm text-sm font-medium text-blue-700 bg-white hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
						>
							<svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
								<path
									fillRule="evenodd"
									d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
									clipRule="evenodd"
								/>
							</svg>
							Check GitHub
						</a>
						<div className="text-sm text-blue-600">
							<p>Email: support@promptflow.com</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
