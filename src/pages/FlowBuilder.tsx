import { useCallback } from 'react';
import ReactFlow, { Background, Controls, NodeTypes, Panel, ReactFlowProvider } from 'reactflow';
import 'reactflow/dist/style.css';

import FlowToolbar from '../components/FlowToolbar';
import PromptNodeComponent from '../components/PromptNode';
import { useFlowStore } from '../store/flowStore';

const nodeTypes: NodeTypes = {
	promptNode: PromptNodeComponent,
};

const PROMPT_TEMPLATES = [
	{
		name: 'Content Summarizer',
		type: 'transform',
		template: 'Summarize the following text in bullet points:\n\n{{input}}',
		category: 'Basic',
	},
	{
		name: 'Tone Changer',
		type: 'transform',
		template: 'Rewrite the following text in a {{tone}} tone:\n\n{{input}}',
		category: 'Basic',
	},
	{
		name: 'Tweet Generator',
		type: 'transform',
		template: 'Convert this content into 3 engaging tweets:\n\n{{input}}',
		category: 'Social Media',
	},
	{
		name: 'LinkedIn Post',
		type: 'transform',
		template: 'Transform this content into a professional LinkedIn post:\n\n{{input}}',
		category: 'Social Media',
	},
	{
		name: 'Cold Email',
		type: 'input',
		template:
			'Write a persuasive cold email for {{industry}} industry:\n\nProduct: {{product}}\nTarget: {{target}}\nValue Prop: {{value}}\n\nMake it concise and engaging.',
		category: 'Sales',
	},
	{
		name: 'ATS Resume Matcher',
		type: 'transform',
		template:
			'Analyze this resume against the job description and suggest improvements:\n\nJob Description:\n{{jobDescription}}\n\nResume:\n{{resume}}',
		category: 'Career',
	},
	{
		name: 'Cover Letter',
		type: 'transform',
		template:
			'Write a tailored cover letter based on this job description and resume:\n\nJob Description:\n{{jobDescription}}\n\nResume:\n{{resume}}',
		category: 'Career',
	},
	{
		name: 'Research Summary',
		type: 'transform',
		template:
			'Analyze this research paper and provide key findings, methodology, and conclusions:\n\n{{input}}',
		category: 'Research',
	},
	{
		name: 'Brand Name Generator',
		type: 'input',
		template:
			'Generate 5 creative brand name ideas for:\n\nIndustry: {{industry}}\nKey Values: {{values}}\nTarget Audience: {{audience}}',
		category: 'Branding',
	},
	{
		name: 'Mission Statement',
		type: 'transform',
		template:
			'Create a compelling mission statement based on:\n\nCompany: {{company}}\nPurpose: {{purpose}}\nValues: {{values}}',
		category: 'Branding',
	},
];

// Group templates by category
const groupedTemplates = PROMPT_TEMPLATES.reduce(
	(acc, template) => {
		if (!acc[template.category]) {
			acc[template.category] = [];
		}
		acc[template.category].push(template);
		return acc;
	},
	{} as Record<string, typeof PROMPT_TEMPLATES>
);

function Flow() {
	const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } = useFlowStore();

	const onDragStart = useCallback(
		(event: React.DragEvent, nodeTemplate: (typeof PROMPT_TEMPLATES)[0]) => {
			event.dataTransfer.setData('application/promptnode', JSON.stringify(nodeTemplate));
			event.dataTransfer.effectAllowed = 'move';
		},
		[]
	);

	const onDrop = useCallback(
		(event: React.DragEvent) => {
			event.preventDefault();

			const reactFlowBounds = (event.target as Element)
				.closest('.react-flow-wrapper')
				?.getBoundingClientRect();

			if (!reactFlowBounds) return;

			const template = JSON.parse(event.dataTransfer.getData('application/promptnode'));

			const position = {
				x: event.clientX - reactFlowBounds.left,
				y: event.clientY - reactFlowBounds.top,
			};

			addNode({
				position,
				data: {
					type: template.type,
					content: template.template,
				},
			});
		},
		[addNode]
	);

	const onDragOver = useCallback((event: React.DragEvent) => {
		event.preventDefault();
		event.dataTransfer.dropEffect = 'move';
	}, []);

	return (
		<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
			<div className="flex gap-4 h-[800px]">
				{/* Sidebar with prompt blocks */}
				<div className="w-72 bg-white p-4 rounded-lg shadow overflow-y-auto">
					<h2 className="text-lg font-medium text-gray-900 mb-4">Prompt Blocks</h2>
					{Object.entries(groupedTemplates).map(([category, templates]) => (
						<div key={category} className="mb-6">
							<h3 className="text-sm font-medium text-gray-500 mb-2">{category}</h3>
							<div className="space-y-2">
								{templates.map((template) => (
									<div
										key={template.name}
										className="w-full p-3 text-left rounded border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 cursor-move transition-colors"
										draggable
										onDragStart={(e) => onDragStart(e, template)}
									>
										<div className="font-medium text-gray-900">
											{template.name}
										</div>
										<div className="text-sm text-gray-500 mt-1">
											{template.type === 'input'
												? 'Creates new content'
												: 'Transforms input'}
										</div>
									</div>
								))}
							</div>
						</div>
					))}
				</div>

				{/* Main flow builder area */}
				<div className="flex-1 bg-white rounded-lg shadow">
					<div className="react-flow-wrapper" style={{ width: '100%', height: '100%' }}>
						<ReactFlow
							nodes={nodes}
							edges={edges}
							onNodesChange={onNodesChange}
							onEdgesChange={onEdgesChange}
							onConnect={onConnect}
							onDrop={onDrop}
							onDragOver={onDragOver}
							nodeTypes={nodeTypes}
							fitView
						>
							<Background />
							<Controls />
							<Panel position="top-right">
								<FlowToolbar />
							</Panel>
						</ReactFlow>
					</div>
				</div>
			</div>
		</div>
	);
}

export default function FlowBuilder() {
	return (
		<ReactFlowProvider>
			<Flow />
		</ReactFlowProvider>
	);
}
