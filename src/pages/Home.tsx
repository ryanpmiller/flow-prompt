import { Link } from 'react-router-dom';

import { BriefcaseIcon, SparklesIcon, UserGroupIcon } from '@heroicons/react/24/solid';

const featuredTemplates = [
	{
		id: 'resume-builder',
		title: 'Resume Builder',
		description: 'Create ATS-optimized resumes and cover letters',
	},
	{
		id: 'cold-email',
		title: 'Cold Email Generator',
		description: 'Generate personalized outreach emails',
	},
	{
		id: 'brand-name',
		title: 'Brand Name Creator',
		description: 'Generate creative brand names and messaging',
	},
	{
		id: 'content-repurposer',
		title: 'Content Repurposer',
		description: 'Transform content for multiple platforms',
	},
	{
		id: 'research-assistant',
		title: 'Research Assistant',
		description: 'Analyze and summarize research papers',
	},
];

const personas = [
	{
		title: 'For Creators',
		description: 'Get viral content ideas instantly',
		icon: <SparklesIcon className="size-14" />,
	},
	{
		title: 'For Freelancers',
		description: 'Send perfect client pitches',
		icon: <BriefcaseIcon className="size-14" />,
	},
	{
		title: 'For Job Seekers',
		description: 'Get hired faster with tailored content',
		icon: <UserGroupIcon className="size-14" />,
	},
];

export default function Home() {
	return (
		<div className="bg-white">
			{/* Hero Section */}
			<div className="relative overflow-hidden">
				<div className="max-w-7xl mx-auto">
					<div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:w-full lg:pb-28 xl:pb-32">
						<main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16">
							<div className="text-center">
								<h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
									<span className="block">Build Smarter AI Prompts.</span>
									<span className="block text-indigo-600">Visually.</span>
								</h1>
								<p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
									Chain, test, and run AI workflows — no code, just creativity.
								</p>
								<div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
									<div className="rounded-md shadow">
										<Link
											to="/build"
											className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
										>
											Try Live Demo
										</Link>
									</div>
									<div className="mt-3 sm:mt-0 sm:ml-3">
										<Link
											to="/templates"
											className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 md:py-4 md:text-lg md:px-10"
										>
											View Templates
										</Link>
									</div>
								</div>
								<p className="mt-3 text-sm text-gray-500">No credit card needed</p>
							</div>
						</main>
					</div>
				</div>
			</div>

			{/* How it Works Section */}
			<div className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center">
						<h2 className="text-3xl font-extrabold text-gray-900">How It Works</h2>
					</div>
					<div className="mt-12">
						<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
							<div className="text-center">
								<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
									1
								</div>
								<h3 className="mt-6 text-lg font-medium text-gray-900">
									Choose a Flow
								</h3>
								<p className="mt-2 text-base text-gray-500">
									Templates for content, branding, job hunting, and more
								</p>
							</div>
							<div className="text-center">
								<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
									2
								</div>
								<h3 className="mt-6 text-lg font-medium text-gray-900">
									Customize + Chain Prompts
								</h3>
								<p className="mt-2 text-base text-gray-500">
									Add your content, tweak tone, preview output
								</p>
							</div>
							<div className="text-center">
								<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto">
									3
								</div>
								<h3 className="mt-6 text-lg font-medium text-gray-900">
									Export or Embed
								</h3>
								<p className="mt-2 text-base text-gray-500">
									Use it, share it, or automate it via API
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Featured Templates Section */}
			<div className="py-16">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<h2 className="text-3xl font-extrabold text-gray-900 text-center">
						Featured Templates
					</h2>
					<div className="mt-12 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
						{featuredTemplates.map((template) => (
							<div
								key={template.id}
								className="relative rounded-lg border border-gray-200 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400"
							>
								<div className="flex-1 min-w-0">
									<Link
										to={`/templates/${template.id}`}
										className="focus:outline-none"
									>
										<p className="text-lg font-medium text-gray-900">
											{template.title}
										</p>
										<p className="text-sm text-gray-500 truncate">
											{template.description}
										</p>
									</Link>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* User Personas Section */}
			<div className="py-16 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="grid grid-cols-1 gap-8 md:grid-cols-3">
						{personas.map((persona) => (
							<div key={persona.title} className="text-center">
								<div className="flex justify-center mb-4">{persona.icon}</div>
								<h3 className="text-lg font-medium text-gray-900">
									{persona.title}
								</h3>
								<p className="mt-2 text-base text-gray-500">
									{persona.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Final CTA */}
			<div className="bg-white">
				<div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
					<div className="text-center">
						<h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
							Turn ideas into action with PromptFlow
						</h2>
						<div className="mt-8 flex justify-center">
							<div className="inline-flex rounded-md shadow">
								<Link
									to="/build"
									className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
								>
									Start Building
								</Link>
							</div>
							<div className="ml-3 inline-flex">
								<Link
									to="/templates"
									className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50"
								>
									View All Templates
								</Link>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
