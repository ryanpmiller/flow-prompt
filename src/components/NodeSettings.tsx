import { useEffect, useState } from 'react';

import { DEFAULT_MODEL, MODEL_CONFIGS, SupportedModel } from '../config/models';
import { useFlowStore } from '../store/flowStore';
import { NodeSettings as NodeSettingsType } from '../store/flowStore';
import { FormField, FormSelect, FormSlider, PrimaryButton, SecondaryButton } from './Form';
import { Modal, ModalActions } from './Modal';

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
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			title="Global Prompt Block Settings"
			description="These settings will apply to all prompt blocks, including new ones."
			icon={
				<svg
					className="w-4 h-4 text-white"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
					/>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
					/>
				</svg>
			}
		>
			<div className="space-y-5">
				<FormField label="Model">
					<FormSelect
						value={settings.model}
						onChange={(e) => handleModelChange(e.target.value as SupportedModel)}
					>
						{Object.entries(MODEL_CONFIGS).map(([id, config]) => (
							<option key={id} value={id}>
								{config.name}
							</option>
						))}
					</FormSelect>
				</FormField>

				<FormField label={`Temperature (${settings.temperature})`}>
					<FormSlider
						value={settings.temperature}
						onChange={(e) =>
							setSettings((prev) => ({
								...prev,
								temperature: Number(e.target.value),
							}))
						}
						min={0}
						max={1}
						step={0.1}
					/>
				</FormField>

				<FormField label="Tone">
					<FormSelect
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
					</FormSelect>
				</FormField>

				<ModalActions>
					<SecondaryButton onClick={onClose}>Cancel</SecondaryButton>
					<PrimaryButton
						onClick={handleSubmit}
						icon={
							<svg
								className="w-4 h-4"
								fill="none"
								stroke="currentColor"
								viewBox="0 0 24 24"
							>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth={2}
									d="M5 13l4 4L19 7"
								/>
							</svg>
						}
					>
						Save Settings
					</PrimaryButton>
				</ModalActions>
			</div>
		</Modal>
	);
}
