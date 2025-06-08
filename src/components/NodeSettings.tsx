import { useEffect, useState } from 'react';

import { CogIcon } from '@heroicons/react/24/outline';

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
			icon={<CogIcon className="w-4 h-4 text-white" />}
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
						icon={<CogIcon className="w-4 h-4" />}
					>
						Save Settings
					</PrimaryButton>
				</ModalActions>
			</div>
		</Modal>
	);
}
