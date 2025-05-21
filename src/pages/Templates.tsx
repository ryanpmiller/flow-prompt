import { Link } from 'react-router-dom';

const templates = [
	{
		id: 'content-repurposer',
		title: 'Content Repurposer Pro',
		description: 'Transform blog posts into multiple social media formats',
		steps: [
			'Summarize main points',
			'Generate tweet hooks',
			'Create LinkedIn post',
			'Instagram carousel',
		],
	},
	{
		id: 'cold-email',
		title: 'Cold Email Generator',
		description: 'Create personalized cold emails for your target audience',
		steps: ['Define audience', 'Generate intro', 'Add personalization', 'Insert CTA'],
	},
	{
		id: 'resume-builder',
		title: 'Resume & Cover Letter Flow',
		description: 'Create ATS-optimized job applications',
		steps: ['Match keywords', 'Generate cover letter', 'Predict interview questions'],
	},
	{
		id: 'research-assistant',
		title: 'AI Research Assistant',
		description: 'Analyze and summarize research papers and articles',
		steps: ['Extract key points', 'Generate insights', 'Create discussion questions'],
	},
];

export default function Templates() {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="text-center">
				<h1 className="text-3xl font-bold text-gray-900">Template Gallery</h1>
				<p className="mt-4 text-xl text-gray-600">
					Start with a pre-built flow or create your own from scratch
				</p>
			</div>

			<div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
				{templates.map((template) => (
					<div
						key={template.id}
						className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow"
					>
						<h3 className="text-lg font-medium text-gray-900">{template.title}</h3>
						<p className="mt-2 text-gray-600">{template.description}</p>
						<div className="mt-4">
							<h4 className="text-sm font-medium text-gray-900">Steps:</h4>
							<ul className="mt-2 space-y-1">
								{template.steps.map((step, index) => (
									<li key={index} className="text-sm text-gray-600">
										{index + 1}. {step}
									</li>
								))}
							</ul>
						</div>
						<div className="mt-6">
							<Link
								to={`/build?template=${template.id}`}
								className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
							>
								Use Template
							</Link>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
