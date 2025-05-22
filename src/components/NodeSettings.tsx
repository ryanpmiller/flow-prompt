import { Fragment, useEffect, useState } from 'react';

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

import { DEFAULT_MODEL, MODEL_CONFIGS, SupportedModel } from '../config/models';
import { useFlowStore } from '../store/flowStore';
import { NodeSettings as NodeSettingsType } from '../store/flowStore';

interface RequiredNodeSettings extends Omit<NodeSettingsType, 'model'> {
	model: SupportedModel;
	temperature: number;
	tone: string;
}

interface NodeSettingsProps {
	isOpen: boolean;
	onClose: () => void;
}

const TONE_OPTIONS = [
	'Professional',
	'Casual',
	'Friendly',
	'Enthusiastic',
	'Formal',
	'Academic',
	'Creative',
	'Persuasive',
];

export default function NodeSettings({ isOpen, onClose }: NodeSettingsProps) {
	const { globalSettings, updateGlobalSettings } = useFlowStore();

	const [settings, setSettings] = useState<RequiredNodeSettings>({
		temperature: 0.7,
		model: DEFAULT_MODEL,
		tone: 'Professional',
	});

	useEffect(() => {
		// Initialize from global settings
		setSettings({
			temperature: globalSettings.temperature ?? 0.7,
			model: globalSettings.model ?? DEFAULT_MODEL,
			tone: globalSettings.tone ?? 'Professional',
		});
	}, [globalSettings]);

	const handleModelChange = (model: SupportedModel) => {
		setSettings((prev) => ({
			...prev,
			model,
		}));
	};

	const handleSubmit = () => {
		updateGlobalSettings(settings);
		onClose();
	};

	return (
		<Transition appear show={isOpen} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={onClose}>
				<TransitionChild
					as="div"
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
							as="div"
							enter="ease-out duration-300"
							enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
							enterTo="opacity-100 translate-y-0 sm:scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 translate-y-0 sm:scale-100"
							leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						>
							<DialogPanel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
								<div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
									<button
										type="button"
										className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
										onClick={onClose}
									>
										<span className="sr-only">Close</span>
										<XMarkIcon className="h-6 w-6" aria-hidden="true" />
									</button>
								</div>

								<div className="mt-3">
									<DialogTitle
										as="h3"
										className="text-lg font-semibold leading-6 text-gray-900"
									>
										Global Prompt Block Settings
									</DialogTitle>
									<p className="mt-2 text-sm text-gray-500">
										These settings will apply to all prompt blocks, including
										new ones.
									</p>
									<div className="mt-6">
										<div className="space-y-4">
											<div>
												<label
													htmlFor="model"
													className="block text-sm font-medium text-gray-700"
												>
													Model
												</label>
												<select
													id="model"
													name="model"
													className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
													value={settings.model}
													onChange={(e) =>
														handleModelChange(
															e.target.value as SupportedModel
														)
													}
												>
													{Object.entries(MODEL_CONFIGS).map(
														([id, config]) => (
															<option key={id} value={id}>
																{config.name}
															</option>
														)
													)}
												</select>
											</div>

											<div>
												<label
													htmlFor="temperature"
													className="block text-sm font-medium text-gray-700"
												>
													Temperature ({settings.temperature})
												</label>
												<input
													type="range"
													id="temperature"
													name="temperature"
													min="0"
													max="1"
													step="0.1"
													value={settings.temperature}
													onChange={(e) =>
														setSettings((prev) => ({
															...prev,
															temperature: Number(e.target.value),
														}))
													}
													className="mt-1 w-full"
												/>
											</div>

											<div>
												<label
													htmlFor="tone"
													className="block text-sm font-medium text-gray-700"
												>
													Tone
												</label>
												<select
													id="tone"
													name="tone"
													className="mt-1 block w-full rounded-md border border-gray-300 py-2 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
													value={settings.tone}
													onChange={(e) =>
														setSettings((prev) => ({
															...prev,
															tone: e.target.value,
														}))
													}
												>
													{TONE_OPTIONS.map((tone) => (
														<option key={tone} value={tone}>
															{tone}
														</option>
													))}
												</select>
											</div>
										</div>
									</div>
								</div>

								<div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
									<button
										type="button"
										className="inline-flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 sm:ml-3 sm:w-auto"
										onClick={handleSubmit}
									>
										Save
									</button>
									<button
										type="button"
										className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
										onClick={onClose}
									>
										Cancel
									</button>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
