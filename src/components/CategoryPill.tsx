import { getCategoryColors } from '../utils/categoryColors';

interface CategoryPillProps {
	category: string;
	className?: string;
}

function CategoryPill({ category, className = '' }: CategoryPillProps) {
	const { bg, text } = getCategoryColors(category);
	return (
		<span
			className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bg} ${text} ${className}`}
		>
			{category}
		</span>
	);
}

export default CategoryPill;
