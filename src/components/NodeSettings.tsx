import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { PromptNode } from '../store/flowStore';

interface NodeSettingsProps {
	node: PromptNode;
	isOpen: boolean;
	onClose: () => void;
	onUpdate: (nodeId: string, settings: Record<string, any>) => void;
}

export default function NodeSettings({ node, isOpen, onClose, onUpdate }: NodeSettingsProps) {
	const handleSave = (settings: Record<string, any>) => {
		onUpdate(node.id, settings);
		onClose();
	};

	return (
		<Transition.Root show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-10" onClose={onClose}>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<Dialog.Panel className="relative transform rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
								<div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
									<button
										type="button"
										className="rounded-md bg-white text-gray-400 hover:text-gray-500"
										onClick={onClose}
									>
										<span className="sr-only">Close</span>
										<XMarkIcon className="h-6 w-6" aria-hidden="true" />
									</button>
								</div>
								<div className="sm:flex sm:items-start">
									<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
										<Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
											Node Settings
										</Dialog.Title>
										<div className="mt-4">
											{node.data.type === 'transform' && (
												<div className="space-y-4">
													<div>
														<label className="block text-sm font-medium text-gray-700">
															Temperature
														</label>
														<input
															type="range"
															min="0"
															max="1"
															step="0.1"
															defaultValue={node.data.settings?.temperature ?? 0.7}
															onChange={(e) =>
																handleSave({
																	...node.data.settings,
																	temperature: parseFloat(e.target.value),
																})
															}
															className="w-full"
														/>
													</div>
													<div>
														<label className="block text-sm font-medium text-gray-700">
															Model
														</label>
														<select
															defaultValue={node.data.settings?.model ?? 'gpt-3.5-turbo'}
															onChange={(e) =>
																handleSave({
																	...node.data.settings,
																	model: e.target.value,
																})
															}
															className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
														>
															<option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
															<option value="gpt-4">GPT-4</option>
														</select>
													</div>
												</div>
											)}
										</div>
									</div>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
}
