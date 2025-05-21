import { useCallback } from 'react';
import ReactFlow, {
	Background,
	Controls,
	NodeTypes,
	Panel,
	ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';

import PromptNodeComponent from '../components/PromptNode';
import FlowToolbar from '../components/FlowToolbar';
import { useFlowStore } from '../store/flowStore';

const nodeTypes: NodeTypes = {
	promptNode: PromptNodeComponent,
};

const PROMPT_TEMPLATES = [
	{
		name: 'Text Summarizer',
		type: 'transform',
		template: 'Summarize the following text:\n\n{{input}}',
	},
	{
		name: 'Tone Changer',
		type: 'transform',
		template: 'Rewrite the following text in a {{tone}} tone:\n\n{{input}}',
	},
	{
		name: 'Content Generator',
		type: 'input',
		template: 'Generate {{type}} content about {{topic}}',
	},
];

function Flow() {
	const { nodes, edges, onNodesChange, onEdgesChange, onConnect, addNode } = useFlowStore();

	const onDragStart = useCallback((event: React.DragEvent, nodeTemplate: typeof PROMPT_TEMPLATES[0]) => {
		event.dataTransfer.setData('application/promptnode', JSON.stringify(nodeTemplate));
		event.dataTransfer.effectAllowed = 'move';
	}, []);

	const onDrop = useCallback(
		(event: React.DragEvent) => {
			event.preventDefault();

			const reactFlowBounds = (event.target as Element)
				.closest('.react-flow-wrapper')
				?.getBoundingClientRect();

			if (!reactFlowBounds) return;

			const template = JSON.parse(
				event.dataTransfer.getData('application/promptnode')
			);

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
				<div className="w-64 bg-white p-4 rounded-lg shadow overflow-y-auto">
					<h2 className="text-lg font-medium text-gray-900 mb-4">Prompt Blocks</h2>
					<div className="space-y-2">
						{PROMPT_TEMPLATES.map((template) => (
							<div
								key={template.name}
								className="w-full p-2 text-left rounded border border-gray-200 hover:border-indigo-500 hover:bg-indigo-50 cursor-move"
								draggable
								onDragStart={(e) => onDragStart(e, template)}
							>
								{template.name}
							</div>
						))}
					</div>
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