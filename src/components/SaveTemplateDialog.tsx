import { useState } from 'react';

import { useFlowStore } from '../store/flowStore';
import { useTemplateStore } from '../store/templateStore';
import { Modal, ModalActions } from './Modal';
import {
	FormField,
	FormInput,
	FormTextarea,
	FormSelect,
	PrimaryButton,
	SecondaryButton
} from './Form';

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
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Save as Template"
			description="Create a reusable template from your current flow"
			icon={
				<svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
				</svg>
			}
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
					<SecondaryButton onClick={onClose}>
						Cancel
					</SecondaryButton>
					<PrimaryButton
						type="submit"
						disabled={!nodes.length}
						icon={
							<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
							</svg>
						}
					>
						Save Template
					</PrimaryButton>
				</ModalActions>
			</form>
		</Modal>
	);
}
