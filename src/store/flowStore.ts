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
		formData?: Record<string, string>; // For input nodes form field values
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
	addNode: (node: Partial<PromptNode>, options?: { skipCollisionDetection?: boolean }) => void;
	setEdges: (edges: Edge[]) => void;
	updateNodeContent: (nodeId: string, content: string) => void;
	updateNodeFormData: (nodeId: string, formData: Record<string, string>) => void;
	getPopulatedContent: (nodeId: string) => string;
	updateGlobalSettings: (settings: NodeSettings) => void;
	deleteNode: (nodeId: string) => void;
	disconnectNode: (nodeId: string) => void;
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
	addNode: (node: Partial<PromptNode>, options?: { skipCollisionDetection?: boolean }) => {
		const nodes = get().nodes;

		// Find a non-overlapping position if none provided
		const findAvailablePosition = (preferredPosition?: { x: number; y: number }) => {
			const defaultX = preferredPosition?.x ?? 250;
			const defaultY = preferredPosition?.y ?? 100;
			const nodeWidth = 350; // Approximate node width
			const nodeHeight = 200; // Approximate node height
			const spacing = 50; // Space between nodes

			// If no nodes exist, use default position
			if (nodes.length === 0) {
				return { x: defaultX, y: defaultY };
			}

			// Check if position is available
			const isPositionAvailable = (x: number, y: number) => {
				return !nodes.some((existingNode) => {
					const dx = Math.abs(existingNode.position.x - x);
					const dy = Math.abs(existingNode.position.y - y);
					return dx < nodeWidth + spacing && dy < nodeHeight + spacing;
				});
			};

			// If preferred position is available, use it
			if (isPositionAvailable(defaultX, defaultY)) {
				return { x: defaultX, y: defaultY };
			}

			// Find next available position
			let attempts = 0;
			const maxAttempts = 50;

			while (attempts < maxAttempts) {
				// Try positions in a grid pattern around the default position
				const gridSize = Math.ceil(Math.sqrt(attempts + 1));
				const gridX = (attempts % gridSize) - Math.floor(gridSize / 2);
				const gridY = Math.floor(attempts / gridSize) - Math.floor(gridSize / 2);

				const x = defaultX + gridX * (nodeWidth + spacing);
				const y = defaultY + gridY * (nodeHeight + spacing);

				if (isPositionAvailable(x, y)) {
					return { x, y };
				}

				attempts++;
			}

			// Fallback: place to the right of the rightmost node
			const rightmostNode = nodes.reduce((rightmost, node) =>
				node.position.x > rightmost.position.x ? node : rightmost
			);
			return {
				x: rightmostNode.position.x + nodeWidth + spacing,
				y: rightmostNode.position.y,
			};
		};

		// Use provided position if skipCollisionDetection is true, otherwise find an available position
		const position = options?.skipCollisionDetection
			? (node.position ?? { x: 250, y: 100 })
			: findAvailablePosition(node.position);

		const newNode: PromptNode = {
			id: node.id ?? crypto.randomUUID(),
			type: 'promptNode',
			position,
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
	setEdges: (edges: Edge[]) => {
		set({ edges });
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
	updateNodeFormData: (nodeId: string, formData: Record<string, string>) => {
		set({
			nodes: get().nodes.map((node) =>
				node.id === nodeId ? { ...node, data: { ...node.data, formData } } : node
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
	getPopulatedContent: (nodeId: string) => {
		const node = get().nodes.find((n) => n.id === nodeId);
		if (!node || node.data.type !== 'input' || !node.data.formData) {
			return node?.data.content || '';
		}

		// Replace variables in content with form data values
		let populatedContent = node.data.content;
		Object.entries(node.data.formData).forEach(([key, value]) => {
			const regex = new RegExp(`\\{\\{${key}\\}\\}`, 'g');
			populatedContent = populatedContent.replace(regex, value);
		});

		return populatedContent;
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
	disconnectNode: (nodeId: string) => {
		set({
			edges: get().edges.filter((edge) => edge.target !== nodeId),
		});
	},
	resetFlow: () => {
		set({ nodes: [], edges: [] });
	},
	onSelectionChange: (nodeIds: string[]) => {
		set({ selectedNodes: nodeIds });
	},
}));
