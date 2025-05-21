import { create } from 'zustand';
import {
	Connection,
	Edge,
	EdgeChange,
	Node,
	NodeChange,
	addEdge,
	OnNodesChange,
	OnEdgesChange,
	OnConnect,
	applyNodeChanges,
	applyEdgeChanges,
} from 'reactflow';

export interface PromptNode extends Node {
	data: {
		type: 'input' | 'output' | 'transform';
		content: string;
		settings?: Record<string, any>;
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
	updateNodeSettings: (nodeId: string, settings: Record<string, any>) => void;
}

export const useFlowStore = create<FlowState>((set, get) => ({
	nodes: [],
	edges: [],
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
	updateNodeSettings: (nodeId: string, settings: Record<string, any>) => {
		set({
			nodes: get().nodes.map((node) =>
				node.id === nodeId ? { ...node, data: { ...node.data, settings } } : node
			),
		});
	},
}));
