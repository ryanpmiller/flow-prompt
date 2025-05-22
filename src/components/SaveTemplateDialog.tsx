import { Fragment, useState } from 'react';

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';

import { useFlowStore } from '../store/flowStore';
import { useTemplateStore } from '../store/templateStore';

interface SaveTemplateFormData {
	name: string;
	description: string;
	category: string;
}

const DEFAULT_CATEGORIES = [
	'Basic',
	'Social Media',
	'Sales',
	'Career',
	'Research',
	'Branding',
	'Custom',
];

export function SaveTemplateDialog({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
	const [formData, setFormData] = useState<SaveTemplateFormData>({
		name: '',
		description: '',
		category: DEFAULT_CATEGORIES[0],
	});
	const [customCategory, setCustomCategory] = useState('');
	const [showCustomCategory, setShowCustomCategory] = useState(false);
	const { nodes, edges } = useFlowStore();
	const { saveTemplate } = useTemplateStore();

	const handleCategoryChange = (value: string) => {
		if (value === 'Custom') {
			setShowCustomCategory(true);
			setFormData((prev) => ({ ...prev, category: customCategory }));
		} else {
			setShowCustomCategory(false);
			setFormData((prev) => ({ ...prev, category: value }));
		}
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!nodes.length) {
			return; // Can't save an empty flow
		}

		const category = showCustomCategory ? customCategory : formData.category;

		saveTemplate({
			...formData,
			category,
			nodes,
			edges,
		});

		onClose();
		setFormData({ name: '', description: '', category: DEFAULT_CATEGORIES[0] });
		setCustomCategory('');
		setShowCustomCategory(false);
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
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75" />
				</TransitionChild>

				<div className="fixed inset-0 overflow-y-auto">
					<div className="flex min-h-full items-center justify-center p-4 text-center">
						<TransitionChild
							as="div"
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="fixed inset-0 z-10 overflow-y-auto">
								<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
									<DialogPanel className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
										<DialogTitle
											as="h3"
											className="text-lg font-medium leading-6 text-gray-900 p-4"
										>
											Save as Template
										</DialogTitle>
										<form onSubmit={handleSubmit}>
											<div className="mt-4">
												<label
													htmlFor="name"
													className="block text-sm font-medium text-gray-700"
												>
													Name
												</label>
												<input
													type="text"
													name="name"
													id="name"
													required
													minLength={3}
													className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
													value={formData.name}
													onChange={(e) =>
														setFormData((prev) => ({
															...prev,
															name: e.target.value,
														}))
													}
												/>
											</div>

											<div className="mt-4">
												<label
													htmlFor="description"
													className="block text-sm font-medium text-gray-700"
												>
													Description
												</label>
												<textarea
													id="description"
													name="description"
													rows={3}
													required
													className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
													value={formData.description}
													onChange={(e) =>
														setFormData((prev) => ({
															...prev,
															description: e.target.value,
														}))
													}
												/>
											</div>

											<div className="mt-4">
												<label
													htmlFor="category"
													className="block text-sm font-medium text-gray-700"
												>
													Category
												</label>
												<select
													id="category"
													name="category"
													className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
													value={
														showCustomCategory
															? 'Custom'
															: formData.category
													}
													onChange={(e) =>
														handleCategoryChange(e.target.value)
													}
												>
													{DEFAULT_CATEGORIES.map((cat) => (
														<option key={cat} value={cat}>
															{cat}
														</option>
													))}
												</select>

												{showCustomCategory && (
													<input
														type="text"
														placeholder="Enter custom category"
														className="mt-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
														value={customCategory}
														onChange={(e) => {
															setCustomCategory(e.target.value);
															setFormData((prev) => ({
																...prev,
																category: e.target.value,
															}));
														}}
														required
													/>
												)}
											</div>

											<div className="mt-6 flex justify-end gap-3">
												<button
													type="button"
													className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
													onClick={onClose}
												>
													Cancel
												</button>
												<button
													type="submit"
													disabled={!nodes.length}
													className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
												>
													Save Template
												</button>
											</div>
										</form>
									</DialogPanel>
								</div>
							</div>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
