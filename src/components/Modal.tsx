import { Fragment, ReactNode } from 'react';

import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';

// Re-export form components for backward compatibility
export {
	FormField,
	FormInput,
	FormTextarea,
	FormSelect,
	FormSlider,
	FormActions,
	PrimaryButton,
	SecondaryButton,
} from './Form';

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	description?: string;
	icon?: ReactNode;
	children: ReactNode;
}

export function Modal({ isOpen, onClose, title, description, icon, children }: ModalProps) {
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
					<div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
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
							<DialogPanel className="relative transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all sm:my-8 sm:w-full sm:max-w-lg border border-gray-100">
								{/* Header */}
								<div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-5 border-b border-gray-100">
									<DialogTitle
										as="h3"
										className="text-xl font-semibold text-gray-900 flex items-center gap-3"
									>
										{icon && (
											<div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center shadow-sm">
												{icon}
											</div>
										)}
										{title}
									</DialogTitle>
									{description && (
										<p className="mt-2 text-sm text-gray-600">{description}</p>
									)}
								</div>

								{/* Content */}
								<div className="p-6">{children}</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}

// Modal-specific actions component (different from FormActions)
export function ModalActions({ children }: { children: ReactNode }) {
	return <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">{children}</div>;
}
