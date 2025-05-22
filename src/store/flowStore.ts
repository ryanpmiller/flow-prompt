import {
	Connection,
	Edge,
	EdgeChange,
	Node,
	NodeChange,
	OnConnect,
	OnEdgesChange,
	OnNodesChange,
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
} from 'reactflow';

import { create } from 'zustand';

import { DEFAULT_MODEL, SupportedModel } from '../config/models';

export interface NodeSettings {
	temperature?: number;
	model?: SupportedModel;
	tone?: string;
}

export interface PromptNode extends Node {
	data: {
		type: 'input' | 'output' | 'transform';
		content: string;
		settings?: NodeSettings;
	};
}

interface FlowState {
	nodes: PromptNode[];
	edges: Edge[];
	onNodesChange: OnNodesChange;
	onEdgesChange: OnEdgesChange;
	onConnect: OnConnect;
	addNode: (node: Partial<PromptNode>) => void;
	updateNodeContent: (nodeId: string, content: string) => void;
	updateNodeSettings: (nodeId: string, settings: NodeSettings) => void;
	resetFlow: () => void;
}

// Load saved flow from localStorage
const loadSavedFlow = () => {
	try {
		const savedFlow = localStorage.getItem('savedFlow');
		if (savedFlow) {
			const { nodes, edges } = JSON.parse(savedFlow);
			return { nodes, edges };
		}
	} catch (error) {
		console.error('Error loading saved flow:', error);
	}
	return { nodes: [], edges: [] };
};

const { nodes: savedNodes, edges: savedEdges } = loadSavedFlow();

export const useFlowStore = create<FlowState>((set, get) => ({
	nodes: savedNodes,
	edges: savedEdges,
	onNodesChange: (changes: NodeChange[]) => {
		set({
			nodes: applyNodeChanges(changes, get().nodes as Node[]) as PromptNode[],
		});
	},
	onEdgesChange: (changes: EdgeChange[]) => {
		set({
			edges: applyEdgeChanges(changes, get().edges),
		});
	},
	onConnect: (connection: Connection) => {
		set({
			edges: addEdge(connection, get().edges),
		});
	},
	addNode: (node: Partial<PromptNode>) => {
		const newNode: PromptNode = {
			id: crypto.randomUUID(),
			type: 'promptNode',
			position: { x: 0, y: 0 },
			data: {
				type: 'transform',
				content: '',
				settings: {
					temperature: 0.7,
					model: DEFAULT_MODEL,
				},
				...node.data,
			},
			...node,
		};
		set({ nodes: [...get().nodes, newNode] });
	},
	updateNodeContent: (nodeId: string, content: string) => {
		set({
			nodes: get().nodes.map((node) =>
				node.id === nodeId ? { ...node, data: { ...node.data, content } } : node
			),
		});
	},
	updateNodeSettings: (nodeId: string, settings: NodeSettings) => {
		set({
			nodes: get().nodes.map((node) =>
				node.id === nodeId ? { ...node, data: { ...node.data, settings } } : node
			),
		});
	},
	resetFlow: () => {
		set({ nodes: [], edges: [] });
	},
}));
