import { useState } from 'react';

import { BookmarkIcon } from '@heroicons/react/24/outline';

import { useFlowStore } from '../store/flowStore';
import { useTemplateStore } from '../store/templateStore';
import {
	FormField,
	FormInput,
	FormSelect,
	FormTextarea,
	PrimaryButton,
	SecondaryButton,
} from './Form';
import { Modal, ModalActions } from './Modal';

interface SaveTemplateFormData {
	name: string;
	description: string;
	category: string;
}

const DEFAULT_CATEGORIES = [
	'Career',
	'Business',
	'Finance',
	'Sales',
	'Marketing',
	'Branding',
	'Content',
	'Writing',
	'Analysis',
	'Research',
	'Development',
	'Support',
	'Communication',
	'Education',
	'Creative',
	'Design',
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
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Save as Template"
			description="Create a reusable template from your current flow"
			icon={<BookmarkIcon className="w-4 h-4 text-white" />}
		>
			<form onSubmit={handleSubmit} className="space-y-5">
				<FormField label="Template Name" required>
					<FormInput
						name="name"
						required
						minLength={3}
						placeholder="Enter a descriptive name for your template"
						value={formData.name}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								name: e.target.value,
							}))
						}
					/>
				</FormField>

				<FormField label="Description" required>
					<FormTextarea
						name="description"
						required
						placeholder="Describe what this template is for and how to use it"
						value={formData.description}
						onChange={(e) =>
							setFormData((prev) => ({
								...prev,
								description: e.target.value,
							}))
						}
					/>
				</FormField>

				<FormField label="Category">
					<FormSelect
						name="category"
						value={showCustomCategory ? 'Custom' : formData.category}
						onChange={(e) => handleCategoryChange(e.target.value)}
					>
						{DEFAULT_CATEGORIES.map((cat) => (
							<option key={cat} value={cat}>
								{cat}
							</option>
						))}
					</FormSelect>

					{showCustomCategory && (
						<div className="mt-2">
							<FormInput
								placeholder="Enter custom category name"
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
						</div>
					)}
				</FormField>

				<ModalActions>
					<SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
					<PrimaryButton
						type="submit"
						disabled={!nodes.length}
						icon={<BookmarkIcon className="w-4 h-4" />}
					>
						Save Template
					</PrimaryButton>
				</ModalActions>
			</form>
		</Modal>
	);
}
