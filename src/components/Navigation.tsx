import { Link } from 'react-router-dom';

export default function Navigation() {
	return (
		<nav className="bg-white shadow-lg">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-16">
					<div className="flex">
						<div className="flex-shrink-0 flex items-center">
							<Link to="/" className="text-xl font-bold text-indigo-600">
								PromptFlow
							</Link>
						</div>
						<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
							<Link
								to="/templates"
								className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
							>
								Templates
							</Link>
							<Link
								to="/build"
								className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
							>
								Build
							</Link>
							<Link
								to="/pricing"
								className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900"
							>
								Pricing
							</Link>
						</div>
					</div>
					<div className="hidden sm:ml-6 sm:flex sm:items-center">
						<button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
							Get Started Free
						</button>
					</div>
				</div>
			</div>
		</nav>
	);
}
