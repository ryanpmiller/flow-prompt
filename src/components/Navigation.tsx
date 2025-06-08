import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import {
	ArrowRightIcon,
	Bars3Icon,
	BoltIcon,
	CurrencyDollarIcon,
	DocumentTextIcon,
	FlagIcon,
	RocketLaunchIcon,
	SparklesIcon,
	WrenchScrewdriverIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';

export default function Navigation() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
	const [isMenuAnimating, setIsMenuAnimating] = useState(false);

	// Enhanced menu toggle with animation state
	const toggleMenu = () => {
		if (mobileMenuOpen) {
			setIsMenuAnimating(true);
			setTimeout(() => {
				setMobileMenuOpen(false);
				setIsMenuAnimating(false);
			}, 200);
		} else {
			setMobileMenuOpen(true);
		}
	};

	// Close menu when clicking outside
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === 'Escape' && mobileMenuOpen) {
				if (mobileMenuOpen) {
					setIsMenuAnimating(true);
					setTimeout(() => {
						setMobileMenuOpen(false);
						setIsMenuAnimating(false);
					}, 200);
				}
			}
		};

		if (mobileMenuOpen) {
			document.addEventListener('keydown', handleEscape);
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.removeEventListener('keydown', handleEscape);
			document.body.style.overflow = 'unset';
		};
	}, [mobileMenuOpen]);

	const menuItems = [
		{ name: 'Templates', href: '/templates', icon: DocumentTextIcon },
		{ name: 'Build', href: '/build', icon: WrenchScrewdriverIcon },
		{ name: 'Pricing', href: '/pricing', icon: CurrencyDollarIcon },
	];

	return (
		<nav className="bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50 border-b border-gray-100/50">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between h-14 sm:h-16">
					<div className="flex">
						<div className="flex-shrink-0 flex items-center">
							<Link
								to="/"
								className="text-lg sm:text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent hover:from-indigo-700 hover:to-purple-700 transition-all duration-300"
							>
								PromptFlow
							</Link>
						</div>
						<div className="hidden sm:ml-6 sm:flex sm:space-x-8">
							{menuItems.map((item) => (
								<Link
									key={item.name}
									to={item.href}
									className="inline-flex items-center px-1 pt-1 text-sm font-medium text-gray-900 hover:text-indigo-600 transition-all duration-200 hover:scale-105 relative group"
								>
									{item.name}
									<span className="absolute inset-x-0 -bottom-px h-0.5 bg-gradient-to-r from-indigo-600 to-purple-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
								</Link>
							))}
						</div>
					</div>
					<div className="hidden sm:ml-6 sm:flex sm:items-center">
						<button className="relative inline-flex items-center px-6 py-2.5 border border-transparent text-sm font-semibold rounded-xl shadow-sm text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-300 hover:shadow-lg hover:scale-105 active:scale-95 overflow-hidden group">
							<span className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out"></span>
							<span className="relative">Get Started Free</span>
							<ArrowRightIcon className="relative ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
						</button>
					</div>

					{/* Enhanced Mobile menu button */}
					<div className="sm:hidden flex items-center">
						<button
							onClick={toggleMenu}
							className="relative inline-flex items-center justify-center p-2.5 rounded-xl text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all duration-300 hover:scale-110 active:scale-95 group"
							aria-expanded={mobileMenuOpen}
							aria-label={mobileMenuOpen ? 'Close main menu' : 'Open main menu'}
						>
							<div className="relative w-6 h-6">
								<span
									className={`absolute inset-0 transition-all duration-300 ${mobileMenuOpen ? 'rotate-180 opacity-0' : 'rotate-0 opacity-100'}`}
								>
									<Bars3Icon className="w-6 h-6" />
								</span>
								<span
									className={`absolute inset-0 transition-all duration-300 ${mobileMenuOpen ? 'rotate-0 opacity-100' : 'rotate-180 opacity-0'}`}
								>
									<XMarkIcon className="w-6 h-6" />
								</span>
							</div>
							<span className="absolute inset-0 rounded-xl bg-indigo-100 scale-0 group-hover:scale-100 transition-transform duration-300 ease-out -z-10"></span>
						</button>
					</div>
				</div>
			</div>

			{/* Enhanced Mobile menu overlay */}
			{mobileMenuOpen && (
				<div
					className="fixed inset-0 sm:hidden"
					style={{
						position: 'fixed',
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						zIndex: 99999,
						width: '100vw',
						height: '100vh',
					}}
				>
					{/* Enhanced Backdrop */}
					<div
						className="absolute inset-0 cursor-pointer"
						onClick={toggleMenu}
						aria-hidden="true"
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							width: '100%',
							height: '100%',
						}}
					/>

					{/* Enhanced Menu panel */}
					<div
						className={`absolute flex flex-col bg-white shadow-2xl transition-all duration-500 ease-out ${isMenuAnimating ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100'}`}
						style={{
							position: 'absolute',
							top: '3.5rem',
							left: 0,
							right: 0,
							bottom: 0,
							width: '100%',
							height: 'calc(100vh - 3.5rem)',
							backgroundColor: 'white',
							overflow: 'hidden',
						}}
					>
						{/* Decorative top border */}
						<div className="h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600"></div>

						{/* Menu content */}
						<div className="flex-1 px-6 py-8 space-y-8 overflow-y-auto">
							{/* Enhanced Navigation links */}
							<div className="space-y-2">
								<h3 className="text-xs font-bold text-gray-700 uppercase tracking-wider mb-4 px-4">
									Navigation
								</h3>
								{menuItems.map((item, index) => (
									<Link
										key={item.name}
										to={item.href}
										className="group block transform transition-all duration-300 hover:scale-[1.02]"
										onClick={toggleMenu}
										style={{ animationDelay: `${index * 100}ms` }}
									>
										<div className="flex items-center px-4 py-4 rounded-2xl text-gray-900 hover:text-indigo-600 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 transition-all duration-300 ease-out group-active:scale-95 relative overflow-hidden border border-transparent hover:border-indigo-100">
											{/* Background animation */}
											<div className="absolute inset-0 bg-gradient-to-r from-indigo-600/10 to-purple-600/10 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out origin-left rounded-2xl"></div>

											{/* Icon */}
											<span className="mr-4 transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
												<item.icon className="w-6 h-6 text-gray-600 group-hover:text-indigo-600" />
											</span>

											{/* Content */}
											<div className="flex-1 relative">
												<span className="text-lg font-bold text-gray-900">
													{item.name}
												</span>
												<div className="text-sm text-gray-600 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-medium">
													{item.name === 'Templates' &&
														'Browse our collection'}
													{item.name === 'Build' && 'Create your own'}
													{item.name === 'Pricing' &&
														'Simple & affordable'}
												</div>
											</div>

											{/* Chevron */}
											<ArrowRightIcon className="h-5 w-5 text-gray-600 group-hover:text-indigo-600 transition-all duration-300 group-hover:translate-x-1" />
										</div>
									</Link>
								))}
							</div>

							{/* Enhanced Divider */}
							<div className="relative">
								<div
									className="absolute inset-0 flex items-center"
									aria-hidden="true"
								>
									<div className="w-full border-t border-gray-300"></div>
								</div>
								<div className="relative flex justify-center">
									<span className="px-4 bg-white text-lg">
										<SparklesIcon className="h-6 w-6 text-gray-600" />
									</span>
								</div>
							</div>

							{/* Enhanced Call to action */}
							<div className="space-y-6">
								<button
									className="group relative w-full flex items-center justify-center px-8 py-5 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 text-white text-lg font-bold rounded-3xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 ease-out overflow-hidden"
									onClick={toggleMenu}
								>
									{/* Animated background */}
									<div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700 ease-out"></div>

									{/* Pulse effect */}
									<div className="absolute inset-0 rounded-3xl animate-pulse bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

									<span className="relative flex items-center">
										<RocketLaunchIcon className="mr-3 h-5 w-5" />
										Get Started Free
										<ArrowRightIcon className="ml-3 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:scale-110" />
									</span>
								</button>

								{/* Enhanced feature highlights */}
								<div className="grid grid-cols-2 gap-4 text-center">
									<div className="p-3 rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100">
										<div className="flex justify-center mb-1">
											<BoltIcon className="h-6 w-6 text-green-600" />
										</div>
										<div className="text-xs font-semibold text-green-700">
											Instant Setup
										</div>
									</div>
									<div className="p-3 rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-100">
										<div className="flex justify-center mb-1">
											<FlagIcon className="h-6 w-6 text-blue-600" />
										</div>
										<div className="text-xs font-semibold text-blue-700">
											No Credit Card
										</div>
									</div>
								</div>
							</div>
						</div>

						{/* Enhanced Close hint */}
						<div className="px-6 py-4 border-t border-gray-300 bg-gray-50">
							<div className="flex items-center justify-center space-x-2">
								<div className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"></div>
								<p className="text-sm text-gray-700 font-semibold">
									Tap outside or press ESC to close
								</p>
								<div
									className="w-2 h-2 rounded-full bg-gray-400 animate-pulse"
									style={{ animationDelay: '1s' }}
								></div>
							</div>
						</div>
					</div>
				</div>
			)}
		</nav>
	);
}
