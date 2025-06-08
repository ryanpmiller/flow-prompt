import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import {
	PlusIcon,
	MagnifyingGlassIcon as SearchIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';

import CategoryPill from '../components/CategoryPill';
import { useTemplateStore } from '../store/templateStore';

interface Template {
	id: string;
	name: string;
	description: string;
	category: string;
	isFeatured?: boolean;
}

interface TemplateGridProps {
	templates: Template[];
	showDelete: boolean;
}

export default function Templates() {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedCategory, setSelectedCategory] = useState<string>('');
	const { templates, deleteTemplate, filterTemplates } = useTemplateStore();
	const navigate = useNavigate();

	// Get unique categories from templates
	const categories = useMemo(() => {
		const categorySet = new Set(templates.map((t) => t.category));
		return ['All Categories', ...Array.from(categorySet)];
	}, [templates]);

	// Filter templates based on search and category
	const filteredTemplates = useMemo(() => {
		return filterTemplates(
			selectedCategory === 'All Categories' ? undefined : selectedCategory,
			searchQuery
		);
	}, [filterTemplates, selectedCategory, searchQuery]);

	// Separate featured templates from user templates
	const { featuredTemplates, userTemplates } = useMemo(() => {
		const featured = filteredTemplates.filter((t) => t.isFeatured);
		const user = filteredTemplates.filter((t) => !t.isFeatured);
		return { featuredTemplates: featured, userTemplates: user };
	}, [filteredTemplates]);

	const handleDelete = (id: string, e: React.MouseEvent) => {
		e.preventDefault();
		e.stopPropagation();
		if (window.confirm('Are you sure you want to delete this template?')) {
			deleteTemplate(id);
		}
	};

	const handleUseTemplate = (id: string) => {
		navigate(`/build?template=${id}`);
	};

	const TemplateGrid = ({ templates, showDelete }: TemplateGridProps) => (
		<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
			{templates.map((template) => (
				<div
					key={template.id}
					className="group relative bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-lg transition-shadow cursor-pointer"
					onClick={() => handleUseTemplate(template.id)}
				>
					<div className="flex justify-between items-start">
						<div>
							<h3 className="text-lg font-medium text-gray-900">{template.name}</h3>
							<p className="mt-2 text-sm text-gray-600">{template.description}</p>
						</div>
						{showDelete && (
							<button
								onClick={(e) => handleDelete(template.id, e)}
								className="opacity-0 group-hover:opacity-100 transition-opacity p-2 text-gray-400 hover:text-gray-500"
								title="Delete template"
							>
								<TrashIcon className="h-5 w-5" />
							</button>
						)}
					</div>
					<div className="mt-4">
						<CategoryPill category={template.category} />
					</div>
				</div>
			))}
		</div>
	);

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="text-center">
				<h1 className="text-3xl font-bold text-gray-900">Template Gallery</h1>
				<p className="mt-4 text-xl text-gray-600">
					Start with a pre-built flow or create your own from scratch
				</p>
			</div>

			{/* Search and Filter */}
			<div className="mt-8 flex flex-col sm:flex-row gap-4 items-center justify-between">
				<div className="flex-1 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
					<div className="relative flex-1">
						<div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
							<SearchIcon className="h-5 w-5 text-gray-400" />
						</div>
						<input
							type="search"
							placeholder="Search templates..."
							className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
						/>
					</div>
					<select
						className="block w-full sm:w-48 pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
						value={selectedCategory}
						onChange={(e) => setSelectedCategory(e.target.value)}
					>
						{categories.map((category) => (
							<option key={category} value={category}>
								{category}
							</option>
						))}
					</select>
				</div>
				<Link
					to="/build"
					className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
				>
					<PlusIcon className="h-5 w-5 mr-2" />
					Create Template
				</Link>
			</div>

			{/* Featured Templates */}
			<div className="mt-12">
				<h2 className="text-2xl font-bold text-gray-900 mb-8">Featured Templates</h2>
				{featuredTemplates.length === 0 ? (
					<div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
						<p className="text-gray-500 text-lg">
							{searchQuery || selectedCategory
								? 'No featured templates match your search criteria.'
								: 'No featured templates available.'}
						</p>
					</div>
				) : (
					<TemplateGrid templates={featuredTemplates} showDelete={false} />
				)}
			</div>

			{/* User Templates */}
			<div className="mt-16 border-t border-gray-200 pt-16">
				<h2 className="text-2xl font-bold text-gray-900 mb-8">Your Templates</h2>
				{userTemplates.length === 0 ? (
					<div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
						<p className="text-gray-500 text-lg mb-4">
							{searchQuery || selectedCategory
								? 'No personal templates match your search criteria.'
								: "You haven't created any templates yet."}
						</p>
						{!searchQuery && !selectedCategory && (
							<Link
								to="/build"
								className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
							>
								<PlusIcon className="h-5 w-5 mr-2" />
								Create Your First Template
							</Link>
						)}
					</div>
				) : (
					<TemplateGrid templates={userTemplates} showDelete={true} />
				)}
			</div>
		</div>
	);
}
