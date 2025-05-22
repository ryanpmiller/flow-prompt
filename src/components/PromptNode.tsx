import { memo, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

import { PromptNode, useFlowStore } from '../store/flowStore';
import NodeSettings from './NodeSettings';

const PromptNodeComponent = ({ data, id, isConnectable }: NodeProps<PromptNode['data']>) => {
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const { updateNodeContent, updateNodeSettings } = useFlowStore();

	return (
		<>
			<div className="bg-white rounded-lg shadow-lg border-2 border-gray-200 p-4 min-w-[200px]">
				<Handle type="target" position={Position.Top} isConnectable={isConnectable} />

				<div className="mb-2">
					<span className="inline-block px-2 py-1 text-xs font-medium rounded-full bg-indigo-100 text-indigo-800">
						{data.type}
					</span>
				</div>

				<textarea
					className="w-full p-2 border rounded focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
					value={data.content}
					onChange={(evt) => updateNodeContent(id, evt.target.value)}
					placeholder="Enter your prompt..."
					rows={3}
				/>

				<div className="mt-2">
					<button
						onClick={() => setIsSettingsOpen(true)}
						className="text-sm text-indigo-600 hover:text-indigo-900"
					>
						Configure
					</button>
				</div>

				<Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
			</div>

			<NodeSettings
				node={{ id, data } as PromptNode}
				isOpen={isSettingsOpen}
				onClose={() => setIsSettingsOpen(false)}
				onUpdate={updateNodeSettings}
			/>
		</>
	);
};

export default memo(PromptNodeComponent);
