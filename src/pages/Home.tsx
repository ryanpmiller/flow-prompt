import { Link } from 'react-router-dom';

import { BriefcaseIcon, SparklesIcon, UserGroupIcon } from '@heroicons/react/24/solid';

import AnimatedBackground from '../components/AnimatedBackground';
import CategoryPill from '../components/CategoryPill';
import { featuredTemplates } from '../config/templates';

const personas = [
	{
		title: 'For Creators',
		description: 'Get viral content ideas instantly',
		icon: <SparklesIcon className="size-full" />,
	},
	{
		title: 'For Freelancers',
		description: 'Send perfect client pitches',
		icon: <BriefcaseIcon className="size-full" />,
	},
	{
		title: 'For Job Seekers',
		description: 'Get hired faster with tailored content',
		icon: <UserGroupIcon className="size-full" />,
	},
];

export default function Home() {
	return (
		<div className="bg-white">
			{/* Hero Section */}
			<div className="relative overflow-hidden">
				<AnimatedBackground />
				<div className="max-w-7xl mx-auto">
					<div className="relative z-10 pb-8 sm:pb-16 md:pb-24 lg:w-full lg:pb-32 xl:pb-40">
						<main className="mt-6 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 lg:mt-16">
							<div className="text-center">
								<h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
									<span className="block">Build Smarter AI Prompts.</span>
									<span className="block text-indigo-600">Visually.</span>
								</h1>
								<p className="mt-3 max-w-sm mx-auto text-base text-gray-500 sm:text-lg sm:max-w-md md:mt-6 md:text-xl md:max-w-3xl leading-relaxed">
									Chain, test, and run AI workflows — no code, just creativity.
								</p>
								<div className="mt-5 max-w-xs mx-auto space-y-3 sm:max-w-md sm:space-y-0 sm:flex sm:justify-center sm:space-x-3 md:mt-8">
									<div className="rounded-md shadow">
										<Link
											to="/build"
											className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 sm:px-6 md:py-4 md:text-lg md:px-8"
										>
											Try Live Demo
										</Link>
									</div>
									<div>
										<Link
											to="/templates"
											className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 sm:px-6 md:py-4 md:text-lg md:px-8"
										>
											View Templates
										</Link>
									</div>
								</div>
								<p className="mt-3 text-xs text-gray-500 sm:mt-4 sm:text-sm">
									No credit card needed
								</p>
							</div>
						</main>
					</div>
				</div>
			</div>

			{/* How it Works Section */}
			<div className="py-12 sm:py-16 lg:py-24 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-8 sm:mb-12 lg:mb-16">
						<h2 className="text-2xl font-extrabold text-gray-900 mb-3 sm:text-3xl sm:mb-4 lg:text-4xl lg:mb-6">
							How It Works
						</h2>
						<p className="text-base text-gray-600 max-w-2xl mx-auto sm:text-lg lg:text-xl sm:max-w-3xl">
							Get started with AI workflows in three simple steps
						</p>
					</div>
					<div className="mt-8 sm:mt-12 lg:mt-16">
						<div className="grid grid-cols-1 gap-6 sm:gap-8 lg:gap-12 md:grid-cols-3">
							<div className="text-center">
								<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto text-base font-bold sm:h-14 sm:w-14 sm:text-lg lg:h-16 lg:w-16 lg:text-xl">
									1
								</div>
								<h3 className="mt-4 text-base font-semibold text-gray-900 sm:mt-6 sm:text-lg lg:mt-8 lg:text-xl">
									Choose a Flow
								</h3>
								<p className="mt-2 text-sm text-gray-500 leading-relaxed sm:mt-3 sm:text-base lg:mt-4 lg:text-lg">
									Templates for content, branding, job hunting, and more
								</p>
							</div>
							<div className="text-center">
								<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto text-base font-bold sm:h-14 sm:w-14 sm:text-lg lg:h-16 lg:w-16 lg:text-xl">
									2
								</div>
								<h3 className="mt-4 text-base font-semibold text-gray-900 sm:mt-6 sm:text-lg lg:mt-8 lg:text-xl">
									Customize + Chain Prompts
								</h3>
								<p className="mt-2 text-sm text-gray-500 leading-relaxed sm:mt-3 sm:text-base lg:mt-4 lg:text-lg">
									Add your content, tweak tone, preview output
								</p>
							</div>
							<div className="text-center">
								<div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mx-auto text-base font-bold sm:h-14 sm:w-14 sm:text-lg lg:h-16 lg:w-16 lg:text-xl">
									3
								</div>
								<h3 className="mt-4 text-base font-semibold text-gray-900 sm:mt-6 sm:text-lg lg:mt-8 lg:text-xl">
									Export or Embed
								</h3>
								<p className="mt-2 text-sm text-gray-500 leading-relaxed sm:mt-3 sm:text-base lg:mt-4 lg:text-lg">
									Use it, share it, or automate it via API
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			{/* Featured Templates Section */}
			<div className="py-12 sm:py-16 lg:py-24">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-8 sm:mb-12 lg:mb-16">
						<h2 className="text-2xl font-extrabold text-gray-900 mb-3 sm:text-3xl sm:mb-4 lg:text-4xl lg:mb-6">
							Featured Templates
						</h2>
						<p className="text-base text-gray-600 max-w-2xl mx-auto sm:text-lg lg:text-xl sm:max-w-3xl">
							Get started with these popular workflows designed for real-world use
							cases
						</p>
					</div>
					<div className="mt-8 sm:mt-12 lg:mt-16 grid gap-4 grid-cols-1 sm:gap-6 lg:gap-8 md:grid-cols-2 lg:grid-cols-3">
						{featuredTemplates.map((template) => (
							<div
								key={template.id}
								className="relative rounded-lg border border-gray-200 bg-white px-4 py-4 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-gray-300 sm:px-6 sm:py-6 lg:px-8 lg:py-8 sm:rounded-xl"
							>
								<Link
									to={`/build?template=${template.id}`}
									className="focus:outline-none"
								>
									<div className="flex-1 min-w-0">
										<p className="text-base font-semibold text-gray-900 mb-2 sm:text-lg sm:mb-3 lg:text-xl lg:mb-4">
											{template.name}
										</p>
										<p className="text-sm text-gray-600 mb-3 leading-relaxed sm:text-base sm:mb-4 lg:mb-6">
											{template.description}
										</p>
										<CategoryPill category={template.category} />
									</div>
								</Link>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* User Personas Section */}
			<div className="py-12 sm:py-16 lg:py-24 bg-gray-50">
				<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
					<div className="text-center mb-8 sm:mb-12 lg:mb-16">
						<h2 className="text-2xl font-extrabold text-gray-900 mb-3 sm:text-3xl sm:mb-4 lg:text-4xl lg:mb-6">
							Built for Everyone
						</h2>
						<p className="text-base text-gray-600 max-w-2xl mx-auto sm:text-lg lg:text-xl sm:max-w-3xl">
							Whether you're creating content, building a business, or advancing your
							career
						</p>
					</div>
					<div className="grid grid-cols-1 gap-6 sm:gap-8 lg:gap-12 md:grid-cols-3">
						{personas.map((persona) => (
							<div key={persona.title} className="text-center">
								<div className="flex justify-center mb-3 text-indigo-600 sm:mb-4 lg:mb-6">
									<div className="h-10 w-10 sm:h-12 sm:w-12 lg:h-14 lg:w-14">
										{persona.icon}
									</div>
								</div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2 sm:text-xl sm:mb-3 lg:text-2xl lg:mb-4">
									{persona.title}
								</h3>
								<p className="text-sm text-gray-600 leading-relaxed sm:text-base lg:text-lg">
									{persona.description}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Final CTA */}
			<div className="bg-white py-16 sm:py-20 lg:py-24">
				<div className="max-w-7xl mx-auto py-8 px-4 sm:py-12 sm:px-6 lg:py-20 lg:px-8">
					<div className="text-center">
						<h2 className="text-2xl font-extrabold tracking-tight text-gray-900 mb-4 sm:text-3xl sm:mb-6 lg:text-4xl lg:mb-8">
							Turn ideas into action with PromptFlow
						</h2>
						<p className="text-base text-gray-600 max-w-3xl mx-auto mb-6 sm:text-lg sm:mb-8 lg:text-xl lg:mb-12">
							Join thousands of creators, freelancers, and professionals building
							smarter AI workflows
						</p>
						<div className="mt-6 flex flex-col space-y-3 sm:mt-8 sm:space-y-0 sm:flex-row sm:justify-center sm:space-x-4 lg:mt-12">
							<div className="inline-flex">
								<Link
									to="/build"
									className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 sm:px-6 md:py-4 md:text-lg md:px-8"
								>
									Start Building
								</Link>
							</div>
							<div className="inline-flex">
								<Link
									to="/templates"
									className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 sm:px-6 md:py-4 md:text-lg md:px-8"
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
