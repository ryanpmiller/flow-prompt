import { memo } from 'react';
import { EdgeProps, getBezierPath } from 'reactflow';

import { XMarkIcon } from '@heroicons/react/24/outline';

import { useFlowStore } from '../store/flowStore';

const CustomEdge = ({
	id,
	sourceX,
	sourceY,
	targetX,
	targetY,
	sourcePosition,
	targetPosition,
	style = {},
	markerEnd,
}: EdgeProps) => {
	const { disconnectNode } = useFlowStore();

	const [edgePath, labelX, labelY] = getBezierPath({
		sourceX,
		sourceY,
		sourcePosition,
		targetX,
		targetY,
		targetPosition,
	});

	const handleDisconnect = (e: React.MouseEvent) => {
		e.stopPropagation();
		// Extract target node ID from edge ID or use a different approach
		// For now, we'll need to modify the store to accept edge ID
		const edge = useFlowStore.getState().edges.find((edge) => edge.id === id);
		if (edge) {
			disconnectNode(edge.target);
		}
	};

	return (
		<>
			<path
				id={id}
				style={style}
				className="react-flow__edge-path"
				d={edgePath}
				markerEnd={markerEnd}
			/>
			{/* Disconnect button in the middle of the edge */}
			<foreignObject
				width={24}
				height={24}
				x={labelX - 12}
				y={labelY - 12}
				className="overflow-visible"
				requiredExtensions="http://www.w3.org/1999/xhtml"
			>
				<div className="flex items-center justify-center">
					<button
						onClick={handleDisconnect}
						className="w-6 h-6 bg-white border-2 border-gray-300 rounded-full flex items-center justify-center hover:border-red-400 hover:bg-red-50 transition-all duration-200 shadow-sm group"
						title="Disconnect"
					>
						<XMarkIcon className="w-3 h-3 text-gray-500 group-hover:text-red-600" />
					</button>
				</div>
			</foreignObject>
		</>
	);
};

export default memo(CustomEdge);
