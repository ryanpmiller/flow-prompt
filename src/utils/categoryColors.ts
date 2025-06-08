// Category color mapping utility
export const getCategoryColors = (category: string) => {
	const colorMap: { [key: string]: { bg: string; text: string } } = {
		// Business & Career
		Career: { bg: 'bg-blue-100', text: 'text-blue-800' },
		Business: { bg: 'bg-slate-100', text: 'text-slate-800' },
		Finance: { bg: 'bg-emerald-100', text: 'text-emerald-800' },

		// Sales & Marketing
		Sales: { bg: 'bg-green-100', text: 'text-green-800' },
		Marketing: { bg: 'bg-pink-100', text: 'text-pink-800' },
		Branding: { bg: 'bg-purple-100', text: 'text-purple-800' },

		// Content & Writing
		Content: { bg: 'bg-orange-100', text: 'text-orange-800' },
		Writing: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
		Copywriting: { bg: 'bg-amber-100', text: 'text-amber-800' },

		// Technical & Analysis
		Analysis: { bg: 'bg-indigo-100', text: 'text-indigo-800' },
		Research: { bg: 'bg-violet-100', text: 'text-violet-800' },
		Development: { bg: 'bg-sky-100', text: 'text-sky-800' },

		// Support & Communication
		Support: { bg: 'bg-cyan-100', text: 'text-cyan-800' },
		Communication: { bg: 'bg-teal-100', text: 'text-teal-800' },
		Education: { bg: 'bg-lime-100', text: 'text-lime-800' },

		// Creative
		Creative: { bg: 'bg-fuchsia-100', text: 'text-fuchsia-800' },
		Design: { bg: 'bg-rose-100', text: 'text-rose-800' },

		// Legacy/Common categories (for backward compatibility)
		'Social Media': { bg: 'bg-pink-100', text: 'text-pink-800' },
		Basic: { bg: 'bg-gray-100', text: 'text-gray-800' },
	};

	return colorMap[category] || { bg: 'bg-gray-100', text: 'text-gray-800' };
};
