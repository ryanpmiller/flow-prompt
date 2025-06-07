import { DEFAULT_MODEL } from './models';

export const featuredTemplates = [
	{
		id: 'resume-builder',
		name: 'Resume Builder',
		description: 'Create ATS-optimized resumes and cover letters',
		nodes: [
			{
				id: 'node1',
				type: 'promptNode' as const,
				position: { x: 250, y: 100 },
				data: {
					type: 'input' as const,
					content: 'Job Description:\n{{jobDescription}}\n\nResume:\n{{resume}}',
					settings: {
						temperature: 0.7,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node2',
				type: 'promptNode' as const,
				position: { x: 650, y: 550 },
				data: {
					type: 'transform' as const,
					content:
						'Analyze this resume against the job description and suggest improvements:\n\n{{input}}',
					settings: {
						temperature: 0.7,
						model: DEFAULT_MODEL,
					},
				},
			},
		],
		edges: [
			{
				id: 'e1-2',
				source: 'node1',
				target: 'node2',
				type: 'default',
			},
		],
		category: 'Career',
	},
	{
		id: 'cold-email',
		name: 'Cold Email Generator',
		description: 'Generate personalized outreach emails',
		nodes: [
			{
				id: 'node1',
				type: 'promptNode' as const,
				position: { x: 250, y: 100 },
				data: {
					type: 'input' as const,
					content:
						'Product: {{product}}\nTarget: {{target}}\nValue Prop: {{value}}\nIndustry: {{industry}}',
					settings: {
						temperature: 0.7,
						model: DEFAULT_MODEL,
					},
				},
			},
			{
				id: 'node2',
				type: 'promptNode' as const,
				position: { x: 550, y: 750 },
				data: {
					type: 'transform' as const,
					content:
						'Write a persuasive cold email using the product and target information:\n\n{{input}}',
					settings: {
						temperature: 0.7,
						model: DEFAULT_MODEL,
					},
				},
			},
		],
		edges: [
			{
				id: 'e1-2',
				source: 'node1',
				target: 'node2',
				type: 'default',
			},
		],
		category: 'Sales',
	},
	{
		id: 'brand-name',
		name: 'Brand Name Creator',
		description: 'Generate creative brand names and messaging',
		nodes: [
			{
				id: 'node1',
				type: 'promptNode' as const,
				position: { x: 250, y: 100 },
				data: {
					type: 'input' as const,
					content:
						'Industry: {{industry}}\nKey Values: {{values}}\nTarget Audience: {{audience}}',
					settings: {
						temperature: 0.7,
						model: DEFAULT_MODEL,
					},
				},
			},
		],
		edges: [],
		category: 'Branding',
	},
];
