import { Link } from 'react-router-dom';

import { CheckIcon } from '@heroicons/react/24/outline';

const plans = [
	{
		name: 'Free',
		price: '0',
		features: [
			'Build and run 3 flows/month',
			'Access to basic templates',
			'Preview outputs in real-time',
			'Export as JSON',
		],
		cta: 'Get Started',
	},
	{
		name: 'Pro',
		price: '12',
		features: [
			'Unlimited flows',
			'Export API endpoints',
			'Access advanced templates',
			'Priority support',
			'Custom branding',
		],
		cta: 'Start Pro Trial',
		popular: true,
	},
	{
		name: 'Team',
		price: '39',
		features: [
			'Everything in Pro',
			'Shared templates',
			'Team collaboration',
			'Usage analytics',
			'Advanced security',
		],
		cta: 'Contact Sales',
	},
];

export default function Pricing() {
	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
			<div className="text-center">
				<h1 className="text-3xl font-bold text-gray-900">Simple, Transparent Pricing</h1>
				<p className="mt-4 text-xl text-gray-600">
					Start for free, upgrade when you need to
				</p>
			</div>

			<div className="mt-12 grid gap-8 lg:grid-cols-3">
				{plans.map((plan) => (
					<div
						key={plan.name}
						className={`bg-white rounded-lg shadow-sm border ${
							plan.popular ? 'border-indigo-500' : 'border-gray-200'
						} p-8 relative`}
					>
						{plan.popular && (
							<div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2">
								<span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
									Popular
								</span>
							</div>
						)}
						<div>
							<h3 className="text-lg font-medium text-gray-900">{plan.name}</h3>
							<p className="mt-4">
								<span className="text-4xl font-extrabold text-gray-900">
									${plan.price}
								</span>
								<span className="text-base font-medium text-gray-500">/month</span>
							</p>
							<ul className="mt-6 space-y-4">
								{plan.features.map((feature) => (
									<li key={feature} className="flex">
										<CheckIcon className="h-6 w-6 text-green-500" />
										<span className="ml-3 text-base text-gray-500">
											{feature}
										</span>
									</li>
								))}
							</ul>
							<div className="mt-8">
								<Link
									to="/build"
									className={`w-full inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium ${
										plan.popular
											? 'text-white bg-indigo-600 hover:bg-indigo-700'
											: 'text-indigo-600 bg-white border-indigo-600 hover:bg-gray-50'
									}`}
								>
									{plan.cta}
								</Link>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
