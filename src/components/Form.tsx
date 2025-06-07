import { ReactNode, forwardRef } from 'react';

// Reusable form components for consistent styling across the application
export function FormField({
	label,
	children,
	required = false,
	error,
	helpText,
}: {
	label: string;
	children: ReactNode;
	required?: boolean;
	error?: string;
	helpText?: string;
}) {
	return (
		<div className="space-y-1">
			<label className="block text-sm font-medium text-gray-800 text-left">
				{label}
				{required && <span className="text-red-500 ml-1">*</span>}
			</label>
			{children}
			{error && <p className="text-sm text-red-600 text-left">{error}</p>}
			{helpText && !error && <p className="text-sm text-gray-500 text-left">{helpText}</p>}
		</div>
	);
}

export const FormInput = forwardRef<
	HTMLInputElement,
	{
		type?: string;
		placeholder?: string;
		value: string;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		required?: boolean;
		minLength?: number;
		error?: boolean;
	} & Omit<
		React.InputHTMLAttributes<HTMLInputElement>,
		'type' | 'placeholder' | 'value' | 'onChange' | 'required' | 'minLength'
	>
>(
	(
		{
			type = 'text',
			placeholder,
			value,
			onChange,
			required = false,
			minLength,
			error,
			className,
			...props
		},
		ref
	) => {
		const baseClasses = `block w-full px-3 py-2.5 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none transition-colors sm:text-sm ${
			error
				? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
				: 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
		}`;

		const mergedClasses = className ? `${baseClasses} ${className}` : baseClasses;

		return (
			<input
				ref={ref}
				type={type}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				required={required}
				minLength={minLength}
				className={mergedClasses}
				{...props}
			/>
		);
	}
);

export const FormTextarea = forwardRef<
	HTMLTextAreaElement,
	{
		placeholder?: string;
		value: string;
		onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
		required?: boolean;
		rows?: number;
		error?: boolean;
	} & Omit<
		React.TextareaHTMLAttributes<HTMLTextAreaElement>,
		'placeholder' | 'value' | 'onChange' | 'required' | 'rows'
	>
>(
	(
		{ placeholder, value, onChange, required = false, rows = 3, error, className, ...props },
		ref
	) => {
		const baseClasses = `block w-full px-3 py-2.5 border rounded-lg shadow-sm placeholder-gray-400 focus:outline-none transition-colors resize-none sm:text-sm ${
			error
				? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
				: 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20'
		}`;

		const mergedClasses = className ? `${baseClasses} ${className}` : baseClasses;

		return (
			<textarea
				ref={ref}
				placeholder={placeholder}
				value={value}
				onChange={onChange}
				required={required}
				rows={rows}
				className={mergedClasses}
				{...props}
			/>
		);
	}
);

export function FormSelect({
	value,
	onChange,
	children,
	error,
	...props
}: {
	value: string;
	onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
	children: ReactNode;
	error?: boolean;
} & Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange' | 'children'>) {
	return (
		<div className="relative">
			<select
				value={value}
				onChange={onChange}
				className={`block w-full px-3 py-2.5 pr-10 border rounded-lg shadow-sm focus:outline-none transition-all duration-200 sm:text-sm bg-white appearance-none cursor-pointer hover:border-gray-300 ${
					error
						? 'border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
						: 'border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 focus:shadow-sm'
				}`}
				{...props}
			>
				{children}
			</select>
			{/* Custom dropdown arrow */}
			<div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
				<svg
					className={`w-4 h-4 transition-colors ${
						error ? 'text-red-400' : 'text-gray-400'
					}`}
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M19 9l-7 7-7-7"
					/>
				</svg>
			</div>
		</div>
	);
}

export function FormSlider({
	value,
	onChange,
	min = 0,
	max = 1,
	step = 0.1,
	...props
}: {
	value: number;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	min?: number;
	max?: number;
	step?: number;
} & Omit<
	React.InputHTMLAttributes<HTMLInputElement>,
	'type' | 'value' | 'onChange' | 'min' | 'max' | 'step'
>) {
	return (
		<input
			type="range"
			value={value}
			onChange={onChange}
			min={min}
			max={max}
			step={step}
			className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
			{...props}
		/>
	);
}

export function FormCheckbox({
	checked,
	onChange,
	label,
	error,
	...props
}: {
	checked: boolean;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	label: string;
	error?: boolean;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'checked' | 'onChange'>) {
	return (
		<div className="flex items-center">
			<input
				type="checkbox"
				checked={checked}
				onChange={onChange}
				className={`h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 ${
					error ? 'border-red-300' : ''
				}`}
				{...props}
			/>
			<label className="ml-2 block text-sm text-gray-900">{label}</label>
		</div>
	);
}

export function FormActions({
	children,
	className = '',
}: {
	children: ReactNode;
	className?: string;
}) {
	return (
		<div className={`flex justify-end gap-3 pt-4 border-t border-gray-100 ${className}`}>
			{children}
		</div>
	);
}

// Button components for consistent styling
export function PrimaryButton({
	onClick,
	disabled = false,
	children,
	type = 'button',
	icon,
	loading = false,
	...props
}: {
	onClick?: () => void;
	disabled?: boolean;
	children: ReactNode;
	type?: 'button' | 'submit';
	icon?: ReactNode;
	loading?: boolean;
} & Omit<
	React.ButtonHTMLAttributes<HTMLButtonElement>,
	'onClick' | 'disabled' | 'children' | 'type'
>) {
	return (
		<button
			type={type}
			onClick={onClick}
			disabled={disabled || loading}
			className="inline-flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-colors"
			{...props}
		>
			{loading ? (
				<svg
					className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					viewBox="0 0 24 24"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="currentColor"
						strokeWidth="4"
					></circle>
					<path
						className="opacity-75"
						fill="currentColor"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					></path>
				</svg>
			) : (
				icon && <span className="w-4 h-4 mr-2">{icon}</span>
			)}
			{children}
		</button>
	);
}

export function SecondaryButton({
	onClick,
	children,
	type = 'button',
	icon,
	...props
}: {
	onClick?: () => void;
	children: ReactNode;
	type?: 'button' | 'submit';
	icon?: ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'children' | 'type'>) {
	return (
		<button
			type={type}
			onClick={onClick}
			className="inline-flex justify-center items-center px-4 py-2.5 border border-gray-200 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-colors"
			{...props}
		>
			{icon && <span className="w-4 h-4 mr-2">{icon}</span>}
			{children}
		</button>
	);
}

export function DangerButton({
	onClick,
	children,
	type = 'button',
	icon,
	...props
}: {
	onClick?: () => void;
	children: ReactNode;
	type?: 'button' | 'submit';
	icon?: ReactNode;
} & Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick' | 'children' | 'type'>) {
	return (
		<button
			type={type}
			onClick={onClick}
			className="inline-flex justify-center items-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:ring-offset-2 shadow-sm transition-colors"
			{...props}
		>
			{icon && <span className="w-4 h-4 mr-2">{icon}</span>}
			{children}
		</button>
	);
}
