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
	selectedNodes: string[];
	globalSettings: NodeSettings;
	onNodesChange: OnNodesChange;
	onEdgesChange: OnEdgesChange;
	onConnect: OnConnect;
	onSelectionChange: (nodeIds: string[]) => void;
	addNode: (node: Partial<PromptNode>) => void;
	updateNodeContent: (nodeId: string, content: string) => void;
	updateGlobalSettings: (settings: NodeSettings) => void;
	deleteNode: (nodeId: string) => void;
	resetFlow: () => void;
}

// Load saved flow from localStorage
const loadSavedFlow = () => {
	try {
		const savedFlow = localStorage.getItem('savedFlow');
		if (savedFlow) {
			const { nodes, edges, globalSettings } = JSON.parse(savedFlow);
			return {
				nodes,
				edges,
				globalSettings: globalSettings ?? {
					temperature: 0.7,
					model: DEFAULT_MODEL,
					tone: 'Professional',
				},
			};
		}
	} catch (error) {
		console.error('Error loading saved flow:', error);
	}
	return {
		nodes: [],
		edges: [],
		globalSettings: {
			temperature: 0.7,
			model: DEFAULT_MODEL,
			tone: 'Professional',
		},
	};
};

const {
	nodes: savedNodes,
	edges: savedEdges,
	globalSettings: savedGlobalSettings,
} = loadSavedFlow();

export const useFlowStore = create<FlowState>((set, get) => ({
	nodes: savedNodes,
	edges: savedEdges,
	selectedNodes: [],
	globalSettings: savedGlobalSettings,
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
				...node.data,
				settings: {
					...get().globalSettings,
					...node.data?.settings,
				},
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

		// Save to localStorage
		const flow = {
			nodes: get().nodes,
			edges: get().edges,
			globalSettings: get().globalSettings,
			updatedAt: new Date().toISOString(),
		};
		localStorage.setItem('savedFlow', JSON.stringify(flow));
	},
	updateGlobalSettings: (settings: NodeSettings) => {
		set({ globalSettings: settings });
		set({
			nodes: get().nodes.map((node) => ({
				...node,
				data: {
					...node.data,
					settings,
				},
			})),
		});

		// Save to localStorage
		const flow = {
			nodes: get().nodes,
			edges: get().edges,
			globalSettings: settings,
			updatedAt: new Date().toISOString(),
		};
		localStorage.setItem('savedFlow', JSON.stringify(flow));
	},
	deleteNode: (nodeId: string) => {
		set({
			nodes: get().nodes.filter((node) => node.id !== nodeId),
			edges: get().edges.filter((edge) => edge.source !== nodeId && edge.target !== nodeId),
		});
	},
	resetFlow: () => {
		set({ nodes: [], edges: [] });
	},
	onSelectionChange: (nodeIds: string[]) => {
		set({ selectedNodes: nodeIds });
	},
}));
