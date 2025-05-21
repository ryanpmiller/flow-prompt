import { useState } from 'react';
import { useFlowStore } from '../store/flowStore';

export default function FlowToolbar() {
	const [isLoading, setIsLoading] = useState(false);
	const { nodes, edges } = useFlowStore();

	const handleSave = async () => {
		setIsLoading(true);
		try {
			// TODO: Implement save functionality
			const flow = {
				nodes,
				edges,
				updatedAt: new Date().toISOString(),
			};
			console.log('Saving flow:', flow);
		} catch (error) {
			console.error('Error saving flow:', error);
		} finally {
			setIsLoading(false);
		}
	};

	const handleExecute = async () => {
		setIsLoading(true);
		try {
			// TODO: Implement flow execution
			console.log('Executing flow with nodes:', nodes);
		} catch (error) {
			console.error('Error executing flow:', error);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex gap-2">
			<button
				onClick={handleSave}
				disabled={isLoading}
				className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
			>
				{isLoading ? 'Saving...' : 'Save Flow'}
			</button>
			<button
				onClick={handleExecute}
				disabled={isLoading}
				className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
			>
				{isLoading ? 'Running...' : 'Execute Flow'}
			</button>
		</div>
	);
}
