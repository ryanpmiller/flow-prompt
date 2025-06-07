import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import ReactFlow, {
	Background,
	Controls,
	EdgeTypes,
	Node as FlowNode,
	NodeTypes,
	OnSelectionChangeParams,
	Panel,
	ReactFlowInstance,
	ReactFlowProvider,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { ArrowRightIcon, SparklesIcon } from '@heroicons/react/24/outline';

import CustomEdge from '../components/CustomEdge';
import FlowToolbar from '../components/FlowToolbar';
import PromptNodeComponent from '../components/PromptNode';
import { DEFAULT_MODEL } from '../config/models';
import { useFlowStore } from '../store/flowStore';
import { useTemplateStore } from '../store/templateStore';

const nodeTypes: NodeTypes = {
	promptNode: PromptNodeComponent,
};

const edgeTypes: EdgeTypes = {
	default: CustomEdge,
};

const PROMPT_TEMPLATES = [
	{
		name: 'Input',
		type: 'input',
		template: '',
		category: 'Generic',
	},
	{
		name: 'Transform',
		type: 'transform',
		template: '',
		category: 'Generic',
	},
	{
		name: 'Content Summarizer',
		type: 'transform',
		template: 'Summarize the following text in bullet points',
		category: 'Basic',
	},
	{
		name: 'Tone Changer',
		type: 'transform',
		template: 'Rewrite the following text in a {{tone}} tone',
		category: 'Basic',
	},
	{
		name: 'Tweet Generator',
		type: 'transform',
		template: 'Convert this content into 3 engaging tweets',
		category: 'Social Media',
	},
	{
		name: 'LinkedIn Post',
		type: 'transform',
		template: 'Transform this content into a professional LinkedIn post',
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
			'Analyze this research paper and provide key findings, methodology, and conclusions',
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

// Get template visual configuration
const getTemplateConfig = (template: (typeof PROMPT_TEMPLATES)[0]) => {
	if (template.type === 'input') {
		return {
			icon: SparklesIcon,
			bgColor: 'bg-emerald-50',
			borderColor: 'border-emerald-200',
			hoverBorderColor: 'hover:border-emerald-500',
			hoverBgColor: 'hover:bg-emerald-100',
			iconColor: 'text-emerald-600',
			tagColor: 'bg-emerald-500 text-white',
		};
	} else {
		return {
			icon: ArrowRightIcon,
			bgColor: 'bg-violet-50',
			borderColor: 'border-violet-200',
			hoverBorderColor: 'hover:border-violet-500',
			hoverBgColor: 'hover:bg-violet-100',
			iconColor: 'text-violet-600',
			tagColor: 'bg-violet-500 text-white',
		};
	}
};

function Flow() {
	const [searchParams] = useSearchParams();
	const {
		nodes,
		edges,
		onNodesChange,
		onEdgesChange,
		onConnect,
		onSelectionChange,
		addNode,
		setEdges,
		resetFlow,
	} = useFlowStore();
	const { loadTemplate } = useTemplateStore();

	const reactFlowWrapper = useRef<HTMLDivElement>(null);
	const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);

	// Load template from URL parameter
	useEffect(() => {
		const templateId = searchParams.get('template');
		if (templateId) {
			const template = loadTemplate(templateId);
			if (template) {
				resetFlow();
				template.nodes.forEach((node) => {
					addNode(
						{
							...node,
							position: node.position,
						},
						{ skipCollisionDetection: true }
					);
				});
				// Load template edges
				if (template.edges && template.edges.length > 0) {
					setEdges(template.edges);
				}
			}
		}
	}, [searchParams, loadTemplate, addNode, setEdges, resetFlow]);

	const handleSelectionChange = useCallback(
		({ nodes: selectedNodes }: OnSelectionChangeParams) => {
			onSelectionChange(selectedNodes?.map((n: FlowNode) => n.id) || []);
		},
		[onSelectionChange]
	);

	const onInit = useCallback((instance: ReactFlowInstance) => {
		setReactFlowInstance(instance);
	}, []);

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

			const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
			if (!reactFlowBounds || !reactFlowInstance) return;

			const template = JSON.parse(event.dataTransfer.getData('application/promptnode'));

			// Calculate position relative to the viewport
			const dropPosition = reactFlowInstance.project({
				x: event.clientX - reactFlowBounds.left,
				y: event.clientY - reactFlowBounds.top,
			});

			// The addNode function will handle collision detection automatically
			addNode({
				position: dropPosition,
				data: {
					type: template.type,
					content: template.template,
					settings: {
						temperature: 0.7,
						model: DEFAULT_MODEL,
						tone: 'Professional',
					},
				},
			});
		},
		[addNode, reactFlowInstance]
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
								{templates.map((template) => {
									const config = getTemplateConfig(template);
									const IconComponent = config.icon;

									return (
										<div
											key={template.name}
											className={`
												w-full p-3 text-left rounded-lg border cursor-move transition-all duration-200
												${config.bgColor} ${config.borderColor}
												${config.hoverBorderColor} ${config.hoverBgColor}
												hover:shadow-sm
											`}
											draggable
											onDragStart={(e) => onDragStart(e, template)}
										>
											<div className="flex items-center gap-3">
												<div
													className={`p-2 rounded-lg ${config.tagColor} shadow-sm`}
												>
													<IconComponent className="w-4 h-4" />
												</div>
												<div className="flex-1">
													<div className="font-medium text-gray-900">
														{template.name}
													</div>
													<div className="text-sm text-gray-500 mt-1">
														{template.type === 'input'
															? 'Creates new content'
															: 'Transforms input'}
													</div>
												</div>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					))}
				</div>

				{/* Main flow builder area */}
				<div className="flex-1 bg-white rounded-lg shadow">
					<div
						ref={reactFlowWrapper}
						className="react-flow-wrapper"
						style={{ width: '100%', height: '100%' }}
						onDrop={onDrop}
						onDragOver={onDragOver}
					>
						<ReactFlow
							nodes={nodes}
							edges={edges}
							onNodesChange={onNodesChange}
							onEdgesChange={onEdgesChange}
							onConnect={onConnect}
							onSelectionChange={handleSelectionChange}
							onInit={onInit}
							nodeTypes={nodeTypes}
							edgeTypes={edgeTypes}
							fitView
							selectNodesOnDrag
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
