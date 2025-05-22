import { Fragment, useCallback, useState } from 'react';

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import {
	AdjustmentsHorizontalIcon,
	ArrowPathIcon,
	CheckCircleIcon,
	ExclamationCircleIcon,
	FolderIcon,
	PlayIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';

import { useFlowStore } from '../store/flowStore';
import { NodeResult, executeFlow } from '../utils/executePrompt';
import { formatTokenCount } from '../utils/tokenCounter';
import NodeSettings from './NodeSettings';
import { SaveTemplateDialog } from './SaveTemplateDialog';

interface TokenUsageDisplayProps {
	usage: {
		promptTokens?: number | null;
		completionTokens?: number | null;
		totalTokens?: number | null;
	} | null;
	model: string;
}

const TokenUsageDisplay = ({ usage }: TokenUsageDisplayProps) => {
	if (!usage) return null;

	// Convert null/undefined to 0
	const promptTokens = usage.promptTokens ?? 0;
	const completionTokens = usage.completionTokens ?? 0;
	// If totalTokens is provided use it, otherwise calculate from prompt + completion
	const totalTokens = usage.totalTokens ?? promptTokens + completionTokens;

	return (
		<div className="mt-4 p-4 bg-gray-50 rounded-md">
			<h4 className="text-sm font-medium text-gray-900 mb-2">Token Usage</h4>
			<div className="space-y-1 text-sm text-gray-600">
				<div className="flex justify-between">
					<span>Prompt Tokens:</span>
					<span className="font-mono">{formatTokenCount(promptTokens)}</span>
				</div>
				<div className="flex justify-between">
					<span>Completion Tokens:</span>
					<span className="font-mono">{formatTokenCount(completionTokens)}</span>
				</div>
				<div className="flex justify-between font-medium border-t border-gray-200 pt-1 mt-1">
					<span>Total Tokens:</span>
					<span className="font-mono">{formatTokenCount(totalTokens)}</span>
				</div>
			</div>
		</div>
	);
};

export default function FlowToolbar() {
	const [isLoading, setIsLoading] = useState(false);
	const [isSaved, setIsSaved] = useState(false);
	const [isResultsOpen, setIsResultsOpen] = useState(false);
	const [isSettingsOpen, setIsSettingsOpen] = useState(false);
	const [isSaveTemplateOpen, setIsSaveTemplateOpen] = useState(false);
	const [executionResults, setExecutionResults] = useState<Map<string, NodeResult>>(new Map());
	const [error, setError] = useState<string | null>(null);
	const [totalUsage, setTotalUsage] = useState<TokenUsageDisplayProps['usage'] | null>(null);
	const { nodes, edges } = useFlowStore();

	const handleSave = useCallback(async () => {
		setIsLoading(true);
		try {
			const flow = {
				nodes,
				edges,
				updatedAt: new Date().toISOString(),
			};

			// Save to localStorage
			localStorage.setItem('savedFlow', JSON.stringify(flow));
			setIsSaved(true);

			// Reset saved indicator after 2 seconds
			setTimeout(() => setIsSaved(false), 2000);
		} catch (error) {
			console.error('Error saving flow:', error);
			setError('Failed to save flow configuration');
		} finally {
			setIsLoading(false);
		}
	}, [nodes, edges]);

	const handleExecute = useCallback(async () => {
		setIsLoading(true);
		setError(null);
		setTotalUsage(null);
		try {
			if (!import.meta.env.VITE_OPENAI_API_KEY && !import.meta.env.VITE_ANTHROPIC_API_KEY) {
				throw new Error(
					'No API key found. Please set VITE_OPENAI_API_KEY or VITE_ANTHROPIC_API_KEY in your environment.'
				);
			}
			const { results, totalUsage: usage } = await executeFlow(nodes, edges);
			setExecutionResults(results);
			setTotalUsage(usage);
			setIsResultsOpen(true);
		} catch (error) {
			console.error('Error executing flow:', error);
			setError(error instanceof Error ? error.message : 'Failed to execute flow');
		} finally {
			setIsLoading(false);
		}
	}, [nodes, edges]);

	const closeError = useCallback(() => setError(null), []);

	return (
		<>
			<div className="flex gap-2">
				<button
					onClick={() => setIsSaveTemplateOpen(true)}
					className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
				>
					<FolderIcon className="w-4 h-4 mr-1.5" />
					Save as Template
				</button>

				<button
					onClick={() => setIsSettingsOpen(true)}
					className="flex items-center px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
					title="Configure global prompt block settings"
				>
					<AdjustmentsHorizontalIcon className="w-4 h-4 mr-1.5" />
					Block Settings
				</button>

				<button
					onClick={handleSave}
					disabled={isLoading}
					className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50 transition-colors"
				>
					{isLoading ? (
						<>
							<ArrowPathIcon className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
							Saving...
						</>
					) : isSaved ? (
						<>
							<CheckCircleIcon className="w-4 h-4 mr-1.5" />
							Saved!
						</>
					) : (
						'Save Flow'
					)}
				</button>
				<button
					onClick={handleExecute}
					disabled={isLoading || nodes.length === 0}
					className="flex items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 transition-colors"
				>
					{isLoading ? (
						<>
							<ArrowPathIcon className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" />
							Running...
						</>
					) : (
						<>
							<PlayIcon className="w-4 h-4 mr-1.5" />
							Execute Flow
						</>
					)}
				</button>
			</div>

			{/* Error Alert */}
			<Transition appear show={!!error} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeError}>
					<TransitionChild
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/25" aria-hidden="true" />
					</TransitionChild>

					<div className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start">
						<TransitionChild
							as={Fragment}
							enter="ease-out transform duration-300"
							enterFrom="opacity-0 translate-y-4"
							enterTo="opacity-100 translate-y-0"
							leave="ease-in transform duration-200"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-4"
						>
							<DialogPanel className="w-full max-w-sm bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black/5 overflow-hidden">
								<div className="p-4">
									<div className="flex items-start">
										<div className="flex-shrink-0">
											<ExclamationCircleIcon
												className="h-6 w-6 text-red-400"
												aria-hidden="true"
											/>
										</div>
										<div className="ml-3 w-0 flex-1 pt-0.5">
											<DialogTitle
												as="p"
												className="text-sm font-medium text-gray-900"
											>
												Error
											</DialogTitle>
											<p className="mt-1 text-sm text-gray-500">{error}</p>
										</div>
										<div className="ml-4 flex-shrink-0 flex">
											<button
												type="button"
												className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
												onClick={closeError}
											>
												<span className="sr-only">Close</span>
												<XMarkIcon className="h-5 w-5" aria-hidden="true" />
											</button>
										</div>
									</div>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</Dialog>
			</Transition>

			{/* Results Modal */}
			<Transition appear show={isResultsOpen} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={setIsResultsOpen}>
					<TransitionChild
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div
							className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
							aria-hidden="true"
						/>
					</TransitionChild>

					<div className="fixed inset-0 z-10 overflow-y-auto">
						<div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
							<TransitionChild
								as={Fragment}
								enter="ease-out duration-300"
								enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
								enterTo="opacity-100 translate-y-0 sm:scale-100"
								leave="ease-in duration-200"
								leaveFrom="opacity-100 translate-y-0 sm:scale-100"
								leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							>
								{' '}
								<DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-lg bg-white p-6 text-left align-middle shadow-xl transition-all">
									<DialogTitle
										as="h3"
										className="text-lg font-medium leading-6 text-gray-900 mb-4"
									>
										Flow Results
									</DialogTitle>
									<div className="mt-2 max-h-[60vh] overflow-y-auto">
										{nodes.map((node) => {
											const result = executionResults.get(node.id);
											const hasError =
												result?.error || result?.text?.startsWith('Error:');

											return (
												<div key={node.id} className="mb-4">
													<div className="font-medium text-sm text-gray-500 flex justify-between items-center">
														<span>Node: {node.data.type}</span>
														{hasError && (
															<span className="text-red-500">
																Failed
															</span>
														)}
													</div>

													<div
														className={`mt-1 p-3 rounded-md ${
															hasError
																? 'bg-red-50 text-red-700'
																: 'bg-gray-50 text-gray-900'
														}`}
													>
														<pre className="text-sm whitespace-pre-wrap">
															{result?.text || 'No result'}
														</pre>
													</div>

													{result?.usage && !hasError && (
														<div className="mt-2 text-xs text-gray-500">
															<span className="font-medium">
																Node Tokens:{' '}
															</span>
															{formatTokenCount(
																result.usage.totalTokens
															)}
														</div>
													)}
												</div>
											);
										})}

										{/* Overall Usage Stats */}
										{totalUsage && (
											<TokenUsageDisplay usage={totalUsage} model="" />
										)}
									</div>
									<div className="mt-5 sm:mt-6">
										<button
											type="button"
											className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
											onClick={() => setIsResultsOpen(false)}
										>
											Close
										</button>
									</div>{' '}
								</DialogPanel>
							</TransitionChild>
						</div>
					</div>
				</Dialog>
			</Transition>

			{/* Template Save Dialog */}
			<SaveTemplateDialog
				isOpen={isSaveTemplateOpen}
				onClose={() => setIsSaveTemplateOpen(false)}
			/>

			{/* Settings Modal */}
			<NodeSettings isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

			{/* Error Modal */}
			<Transition appear show={!!error} as={Fragment}>
				<Dialog as="div" className="relative z-10" onClose={closeError}>
					<TransitionChild
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-black/25" aria-hidden="true" />
					</TransitionChild>

					<div className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start">
						<TransitionChild
							as={Fragment}
							enter="ease-out transform duration-300"
							enterFrom="opacity-0 translate-y-4"
							enterTo="opacity-100 translate-y-0"
							leave="ease-in transform duration-200"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-4"
						>
							<DialogPanel className="w-full max-w-sm bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black/5 overflow-hidden">
								<div className="p-4">
									<div className="flex items-start">
										<div className="flex-shrink-0">
											<ExclamationCircleIcon
												className="h-6 w-6 text-red-400"
												aria-hidden="true"
											/>
										</div>
										<div className="ml-3 w-0 flex-1 pt-0.5">
											<DialogTitle
												as="p"
												className="text-sm font-medium text-gray-900"
											>
												Error
											</DialogTitle>
											<p className="mt-1 text-sm text-gray-500">{error}</p>
										</div>
										<div className="ml-4 flex-shrink-0 flex">
											<button
												type="button"
												className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
												onClick={closeError}
											>
												<span className="sr-only">Close</span>
												<XMarkIcon className="h-5 w-5" aria-hidden="true" />
											</button>
										</div>
									</div>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
