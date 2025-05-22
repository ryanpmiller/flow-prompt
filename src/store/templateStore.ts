import { Edge } from 'reactflow';

import { create } from 'zustand';

import { featuredTemplates } from '../config/templates';
import { PromptNode } from './flowStore';

interface Template {
	id: string;
	name: string;
	description: string;
	category: string;
	nodes: PromptNode[];
	edges: Edge[];
	isFeatured?: boolean;
}

interface TemplateStore {
	templates: Template[];
	saveTemplate: (template: Omit<Template, 'id' | 'isFeatured'>) => void;
	deleteTemplate: (id: string) => void;
	loadTemplate: (id: string) => Template | undefined;
	filterTemplates: (category?: string, query?: string) => Template[];
}

// Function to generate a unique ID
const generateId = () => `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;

// Load templates from localStorage
const loadSavedTemplates = (): Template[] => {
	try {
		const saved = localStorage.getItem('userTemplates');
		return saved ? JSON.parse(saved) : [];
	} catch (e) {
		console.error('Error loading saved templates:', e);
		return [];
	}
};

// Initialize with both featured and saved templates
const initialTemplates = [
	...featuredTemplates.map((t) => ({ ...t, isFeatured: true })),
	...loadSavedTemplates(),
];

export const useTemplateStore = create<TemplateStore>((set, get) => ({
	templates: initialTemplates,

	saveTemplate: (template) => {
		set((state) => {
			const newTemplate = {
				...template,
				id: generateId(),
				isFeatured: false,
			};
			const newTemplates = [...state.templates, newTemplate];

			// Save user templates to localStorage
			const userTemplates = newTemplates.filter((t) => !t.isFeatured);
			localStorage.setItem('userTemplates', JSON.stringify(userTemplates));

			return { templates: newTemplates };
		});
	},

	deleteTemplate: (id) => {
		set((state) => {
			const newTemplates = state.templates.filter((t) => !t.isFeatured && t.id !== id);

			// Update localStorage after deletion
			const userTemplates = newTemplates.filter((t) => !t.isFeatured);
			localStorage.setItem('userTemplates', JSON.stringify(userTemplates));

			return { templates: newTemplates };
		});
	},

	loadTemplate: (id) => {
		return get().templates.find((t) => t.id === id);
	},

	filterTemplates: (category?: string, query?: string) => {
		const templates = get().templates;
		return templates.filter((template) => {
			const matchesCategory = !category || template.category === category;
			const matchesQuery =
				!query ||
				template.name.toLowerCase().includes(query.toLowerCase()) ||
				template.description.toLowerCase().includes(query.toLowerCase());
			return matchesCategory && matchesQuery;
		});
	},
}));
