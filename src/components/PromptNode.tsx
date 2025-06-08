import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Handle, NodeProps, Position } from 'reactflow';

import {
	ArrowRightIcon,
	ArrowsPointingInIcon,
	ArrowsPointingOutIcon,
	LightBulbIcon,
	SparklesIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';

import { PromptNode, useFlowStore } from '../store/flowStore';
import { FormField, FormInput, FormTextarea } from './Form';

const PromptNodeComponent = ({ data, id, isConnectable }: NodeProps<PromptNode['data']>) => {
	const [isMaximized, setIsMaximized] = useState(false);
	const [isFocused, setIsFocused] = useState(false);
	const [showHelp, setShowHelp] = useState(false);
	const [formData, setFormData] = useState<Record<string, string>>({});
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const cursorPositionRef = useRef<{ start: number; end: number } | null>(null);
	const { updateNodeContent, updateNodeFormData, deleteNode, edges } = useFlowStore();

	// Check if this node has input connections
	const hasInputConnections = useCallback(() => {
		return edges.some((edge) => edge.target === id);
	}, [edges, id]);

	const isConnected = hasInputConnections();

	// Extract variables from content, filtering out {{input}} for all transform nodes
	const extractVariables = useCallback(
		(content: string) => {
			const matches = content.match(/\{\{([^}]+)\}\}/g);
			if (!matches) return [];

			let variables = [...new Set(matches.map((match) => match.slice(2, -2).trim()))];

			// Filter out 'input' variable for all transform nodes since it's automatically handled
			if (data.type === 'transform') {
				variables = variables.filter((variable) => variable !== 'input');
			}

			return variables;
		},
		[data.type]
	);

	// Utility to remove {{input}} references from all transform nodes
	const cleanInputReferences = useCallback(
		(content: string) => {
			if (data.type === 'transform') {
				// Only remove {{input}} references, preserve all user formatting and spaces
				return content.replace(/\{\{input\}\}/g, '');
			}
			return content;
		},
		[data.type]
	);

	// Get character and word count
	const getContentStats = useCallback((content: string) => {
		const chars = content.length;
		const words = content.trim() ? content.trim().split(/\s+/).length : 0;
		return { chars, words };
	}, []);

	const stats = getContentStats(data.content);

	// Auto-resize textarea based on content
	const adjustTextareaHeight = useCallback(() => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = 'auto';
			textarea.style.height = `${Math.max(textarea.scrollHeight, 80)}px`;
		}
	}, []);

	// Restore cursor position after content update
	useEffect(() => {
		if (cursorPositionRef.current && textareaRef.current) {
			const { start, end } = cursorPositionRef.current;
			textareaRef.current.setSelectionRange(start, end);
			cursorPositionRef.current = null;
		}
	}, [data.content]);

	// Get the content to display in the textarea
	const getDisplayContent = () => {
		// For all transform nodes, show cleaned content (without {{input}})
		if (data.type === 'transform') {
			return cleanInputReferences(data.content);
		}
		return data.content;
	};

	// Handle content changes while preserving cursor position
	const handleContentChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
		const textarea = evt.target;
		cursorPositionRef.current = {
			start: textarea.selectionStart,
			end: textarea.selectionEnd,
		};

		let newContent = textarea.value;

		// For all transform nodes, prevent user from adding {{input}} back
		if (data.type === 'transform' && newContent.includes('{{input}}')) {
			newContent = cleanInputReferences(newContent);
		}

		updateNodeContent(id, newContent);
		adjustTextareaHeight();
	};

	// Adjust height on content change
	useEffect(() => {
		adjustTextareaHeight();
	}, [data.content, adjustTextareaHeight]);

	// Handle body scroll lock when maximized
	useEffect(() => {
		if (isMaximized) {
			document.body.style.overflow = 'hidden';

			// Handle global escape key
			const handleEscape = (e: KeyboardEvent) => {
				if (e.key === 'Escape') {
					handleMinimize();
				}
			};

			document.addEventListener('keydown', handleEscape);

			return () => {
				document.body.style.overflow = 'unset';
				document.removeEventListener('keydown', handleEscape);
			};
		}
	}, [isMaximized]);

	// Handle keyboard shortcuts
	const handleKeyDown = (evt: React.KeyboardEvent) => {
		// Cmd/Ctrl + Enter to toggle maximize
		if ((evt.metaKey || evt.ctrlKey) && evt.key === 'Enter') {
			evt.preventDefault();
			setIsMaximized(!isMaximized);
			if (!isMaximized) {
				// Focus textarea when expanding
				setTimeout(() => textareaRef.current?.focus(), 100);
			}
		}
		// Escape to exit maximize mode
		if (evt.key === 'Escape' && isMaximized) {
			evt.preventDefault();
			handleMinimize();
		}
		// Tab to indent (prevent focus moving)
		if (evt.key === 'Tab') {
			evt.preventDefault();
			const textarea = evt.target as HTMLTextAreaElement;
			const start = textarea.selectionStart;
			const end = textarea.selectionEnd;
			const newValue = data.content.substring(0, start) + '  ' + data.content.substring(end);
			updateNodeContent(id, newValue);
			// Restore cursor position after update
			requestAnimationFrame(() => {
				textarea.selectionStart = textarea.selectionEnd = start + 2;
			});
		}
	};

	const getNodeConfig = () => {
		if (data.type === 'input') {
			return {
				title: data.title || 'Input',
				subtitle: 'Creates new content',
				icon: SparklesIcon,
				borderColor: 'border-emerald-300',
				bgColor: 'bg-emerald-50',
				headerBg: 'bg-gradient-to-r from-emerald-50 to-emerald-100',
				tagColor: 'bg-emerald-500 text-white',
				placeholder:
					'Enter your prompt template here...\n\nThis is where you write the content that will be generated.\n\nExample:\n"Write a personalized email about our new product launch"',
			};
		} else {
			// Transform node - adjust placeholder and help based on connection status
			const baseText = 'Enter your transformation prompt here...';
			const connectedTip = isConnected
				? '\n\nTip: This node will automatically receive input from connected nodes for processing.'
				: '\n\nTip: Connect this node to an input source to automatically receive content.';
			const exampleText = isConnected
				? '\n\nExample\n"Rewrite the content to be more professional and concise"'
				: '\n\nExample\n"Rewrite the content to be more professional and concise"';

			return {
				title: data.title || 'Transform',
				subtitle: isConnected ? 'Processing connected input' : 'Processes incoming content',
				icon: ArrowRightIcon,
				borderColor: 'border-violet-300',
				bgColor: 'bg-violet-50',
				headerBg: 'bg-gradient-to-r from-violet-50 to-violet-100',
				tagColor: 'bg-violet-500 text-white',
				placeholder: baseText + connectedTip + exampleText,
			};
		}
	};

	const handleMaximize = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (!isMaximized) {
			setIsMaximized(true);
			// Focus textarea after maximizing with a slight delay
			setTimeout(() => {
				if (textareaRef.current) {
					textareaRef.current.focus();
				}
			}, 150);
		}
	};

	const handleMinimize = () => {
		setIsMaximized(false);
		setShowHelp(false); // Also hide help when minimizing
	};

	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		deleteNode(id);
	};

	// Parse template content to extract form fields for input nodes
	const parseTemplateForForm = useCallback(
		(content: string) => {
			if (data.type !== 'input') return null;

			const variables = extractVariables(content);
			const fields = variables.map((variable) => {
				// Determine if this should be a textarea based on common patterns
				const isTextarea = [
					'description',
					'content',
					'message',
					'value',
					'summary',
					'details',
				].some((keyword) => variable.toLowerCase().includes(keyword));

				return {
					name: variable,
					label:
						variable.charAt(0).toUpperCase() +
						variable.slice(1).replace(/([A-Z])/g, ' $1'),
					type: isTextarea ? 'textarea' : 'input',
					value: formData[variable] || '',
				};
			});

			return fields;
		},
		[data.type, extractVariables, formData]
	);

	// Initialize form data from variables - separate initialization logic to avoid dependency issues
	useEffect(() => {
		if (data.type === 'input') {
			const variables = extractVariables(data.content);
			const initialData: Record<string, string> = {};

			// Initialize form data based on current variables and stored data
			variables.forEach((variable) => {
				initialData[variable] = data.formData?.[variable] || '';
			});

			setFormData(initialData);
		}
	}, [data.content, data.type, data.formData, extractVariables]);

	// Sync form data when node's form data changes from store
	useEffect(() => {
		if (data.type === 'input' && data.formData) {
			setFormData(data.formData);
		}
	}, [data.formData, data.type]);

	// Handle form field changes
	const handleFormFieldChange = (fieldName: string, value: string) => {
		const newFormData = { ...formData, [fieldName]: value };
		setFormData(newFormData);

		// Update the store with the new form data
		updateNodeFormData(id, newFormData);
	};

	const config = getNodeConfig();
	const IconComponent = config.icon;

	return (
		<>
			{/* Fullscreen overlay using Portal */}
			{isMaximized &&
				createPortal(
					<div
						className="fixed bg-black/20 backdrop-blur-sm flex items-center justify-center"
						style={{
							zIndex: 9999,
							position: 'fixed',
							top: 0,
							left: 0,
							right: 0,
							bottom: 0,
							width: '100vw',
							height: '100vh',
							margin: 0,
							padding: '1rem',
							boxSizing: 'border-box',
							transform: 'none',
							overflow: 'auto',
						}}
						onClick={handleMinimize}
					>
						<div
							className="w-full max-w-4xl overflow-auto"
							style={{
								maxHeight: 'calc(100vh - 2rem)',
								margin: '1rem',
							}}
							onClick={(e) => e.stopPropagation()}
						>
							{/* Fullscreen node content */}
							<div
								className={`
								relative bg-white rounded-xl border-2 shadow-2xl
								${config.borderColor}
							`}
							>
								{/* Header */}
								<div
									className={`px-6 py-4 ${config.headerBg} rounded-t-xl border-b border-gray-200`}
								>
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<div
												className={`p-2 rounded-lg ${config.tagColor} shadow-sm`}
											>
												<IconComponent className="w-5 h-5" />
											</div>
											<div>
												<h3 className="font-semibold text-gray-900 text-base">
													{config.title}
												</h3>
												<p className="text-sm text-gray-600">
													{config.subtitle} • Fullscreen Mode
												</p>
												{data.type === 'transform' && isConnected && (
													<div className="flex items-center gap-1 mt-1">
														<div className="w-2 h-2 bg-green-500 rounded-full"></div>
														<span className="text-xs text-green-600 font-medium">
															Input Connected
														</span>
													</div>
												)}
											</div>
										</div>

										<div className="flex items-center gap-2">
											<span className="text-sm text-gray-500">
												{stats.words} words • {stats.chars} chars
											</span>
											<button
												onClick={handleMinimize}
												className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white/70 rounded-lg transition-all duration-200"
												title="Minimize (Esc)"
											>
												<ArrowsPointingInIcon className="w-5 h-5" />
											</button>
											<button
												onClick={handleDelete}
												className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
												title="Delete node"
											>
												<TrashIcon className="w-5 h-5" />
											</button>
										</div>
									</div>
								</div>

								{/* Content Area */}
								<div className="p-6">
									<div className="space-y-4">
										{data.type === 'input' ? (
											/* Form-based interface for input nodes in fullscreen */
											<div className="space-y-6">
												{parseTemplateForForm(data.content)?.map(
													(field) => (
														<FormField
															key={field.name}
															label={field.label}
														>
															{field.type === 'textarea' ? (
																<FormTextarea
																	value={field.value}
																	onChange={(e) =>
																		handleFormFieldChange(
																			field.name,
																			e.target.value
																		)
																	}
																	placeholder={`Enter ${field.label.toLowerCase()}...`}
																	rows={6}
																/>
															) : (
																<FormInput
																	value={field.value}
																	onChange={(e) =>
																		handleFormFieldChange(
																			field.name,
																			e.target.value
																		)
																	}
																	placeholder={`Enter ${field.label.toLowerCase()}...`}
																/>
															)}
														</FormField>
													)
												)}

												{/* Fallback textarea for input nodes without template variables in fullscreen */}
												{(!parseTemplateForForm(data.content) ||
													parseTemplateForForm(data.content)?.length ===
														0) && (
													<div className="relative">
														<FormTextarea
															ref={textareaRef}
															value={data.content}
															onChange={handleContentChange}
															onKeyDown={handleKeyDown}
															placeholder={config.placeholder}
															rows={20}
															className="font-mono placeholder:text-gray-400 placeholder:font-sans"
															spellCheck={false}
															autoFocus
														/>
													</div>
												)}

												{/* Show template preview in fullscreen only if there are template variables */}
												{(() => {
													const templateFields = parseTemplateForForm(
														data.content
													);
													return (
														templateFields && templateFields.length > 0
													);
												})() && (
													<div className="border-t pt-6 mt-6">
														<div className="flex items-center gap-2 mb-3">
															<span className="text-base font-medium text-gray-700">
																Template Preview
															</span>
														</div>
														<div className="text-sm text-gray-600 bg-gray-50 rounded-lg p-4 border border-gray-200 font-mono whitespace-pre-wrap">
															{data.content}
														</div>
													</div>
												)}
											</div>
										) : (
											/* Traditional textarea for transform nodes in fullscreen */
											<>
												<FormTextarea
													ref={textareaRef}
													value={getDisplayContent()}
													onChange={handleContentChange}
													onKeyDown={handleKeyDown}
													placeholder={config.placeholder}
													rows={20}
													className="font-mono placeholder:text-gray-400 placeholder:font-sans"
													spellCheck={false}
													autoFocus
												/>
											</>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>,
					document.body
				)}

			{/* Regular node */}
			{!isMaximized && (
				<div
					className={`
						relative bg-white rounded-xl border-2 transition-all duration-200
						${isFocused ? `${config.borderColor} shadow-lg ring-4 ring-blue-50` : 'border-gray-200 hover:border-gray-300 shadow-sm hover:shadow-md'}
						min-w-[320px] max-w-[400px]
					`}
					style={{
						boxShadow: isFocused
							? `0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)`
							: `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)`,
					}}
				>
					<Handle
						type="target"
						position={Position.Top}
						isConnectable={isConnectable}
						className="!w-6 !h-6 !bg-gray-500 !border-4 !border-white hover:!bg-blue-500 hover:!border-blue-100 transition-all duration-200 !shadow-lg !z-10"
					/>

					{/* Header */}
					<div
						className={`px-4 py-3 ${config.headerBg} rounded-t-xl border-b border-gray-200 cursor-grab active:cursor-grabbing`}
					>
						<div className="flex items-center justify-between">
							<div className="flex items-center gap-3">
								<div className={`p-2 rounded-lg ${config.tagColor} shadow-sm`}>
									<IconComponent className="w-4 h-4" />
								</div>
								<div>
									<h3 className="font-semibold text-gray-900 text-sm">
										{config.title}
									</h3>
									<p className="text-xs text-gray-600">{config.subtitle}</p>
									{data.type === 'transform' && isConnected && (
										<div className="flex items-center gap-1 mt-0.5">
											<div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
											<span className="text-xs text-green-600 font-medium">
												Connected
											</span>
										</div>
									)}
								</div>
							</div>

							<div className="flex items-center gap-1">
								<button
									onClick={handleMaximize}
									className="p-2 text-gray-500 hover:text-gray-700 hover:bg-white/70 rounded-lg transition-all duration-200 nodrag"
									title="Expand (⌘/Ctrl + Enter)"
								>
									<ArrowsPointingOutIcon className="w-4 h-4" />
								</button>
								<button
									onClick={handleDelete}
									className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200 nodrag"
									title="Delete node"
								>
									<TrashIcon className="w-4 h-4" />
								</button>
							</div>
						</div>
					</div>

					{/* Content Area */}
					<div className="p-4 nodrag">
						<div className="space-y-3">
							<div className="flex items-center justify-between">
								<label className="block text-sm font-medium text-gray-700">
									Prompt Content
								</label>
								<div className="flex items-center gap-2">
									{/* Content stats */}
									<span className="text-xs text-gray-500">
										{stats.words} words • {stats.chars} chars
									</span>
									{/* Help toggle */}
									<button
										onClick={() => setShowHelp(!showHelp)}
										className="text-gray-400 hover:text-gray-600 transition-colors nodrag"
										title="Toggle help"
									>
										<LightBulbIcon className="w-4 h-4" />
									</button>
								</div>
							</div>

							{/* Content Input Area */}
							{data.type === 'input' ? (
								/* Form-based interface for input nodes */
								<div className="space-y-4">
									{parseTemplateForForm(data.content)?.map((field) => (
										<FormField key={field.name} label={field.label}>
											{field.type === 'textarea' ? (
												<FormTextarea
													value={field.value}
													onChange={(e) =>
														handleFormFieldChange(
															field.name,
															e.target.value
														)
													}
													placeholder={`Enter ${field.label.toLowerCase()}...`}
													rows={3}
												/>
											) : (
												<FormInput
													value={field.value}
													onChange={(e) =>
														handleFormFieldChange(
															field.name,
															e.target.value
														)
													}
													placeholder={`Enter ${field.label.toLowerCase()}...`}
												/>
											)}
										</FormField>
									))}

									{/* Fallback textarea for input nodes without template variables */}
									{(() => {
										const templateFields = parseTemplateForForm(data.content);
										return !templateFields || templateFields.length === 0;
									})() && (
										<FormTextarea
											ref={textareaRef}
											value={data.content}
											onChange={handleContentChange}
											onKeyDown={handleKeyDown}
											onFocus={() => setIsFocused(true)}
											onBlur={() => setIsFocused(false)}
											placeholder={config.placeholder}
											rows={4}
											className="font-mono placeholder:text-gray-400 placeholder:font-sans"
											spellCheck={false}
										/>
									)}
								</div>
							) : (
								/* Traditional textarea for transform nodes */
								<FormTextarea
									ref={textareaRef}
									value={getDisplayContent()}
									onChange={handleContentChange}
									onKeyDown={handleKeyDown}
									onFocus={() => setIsFocused(true)}
									onBlur={() => setIsFocused(false)}
									placeholder={config.placeholder}
									rows={isMaximized ? 12 : 4}
									className="font-mono placeholder:text-gray-400 placeholder:font-sans"
									spellCheck={false}
								/>
							)}

							{/* Input connection status for transform nodes */}
							{data.type === 'transform' && isConnected && (
								<div className="border-t pt-3">
									<div className="flex items-center gap-2 mb-2">
										<div className="w-2 h-2 bg-green-500 rounded-full"></div>
										<span className="text-xs font-medium text-green-600">
											Input Source Connected
										</span>
									</div>
									<div className="text-xs text-gray-600 bg-green-50 rounded-lg p-2 border border-green-200">
										<p>
											✓ This node will automatically receive input from
											connected nodes during execution.
										</p>
									</div>
								</div>
							)}

							{/* Help section */}
							{showHelp && (
								<div className="border-t pt-3 space-y-2">
									<div className="text-xs text-gray-600 space-y-1">
										<p className="font-medium mb-2">💡 Tips & Shortcuts</p>
										<div className="grid grid-cols-1 gap-1 text-xs">
											<p>• Write your prompt content using plain text</p>
											{data.type === 'transform' && (
												<p>
													• Input content automatically included from
													connected nodes
												</p>
											)}
											<p>
												•{' '}
												<kbd className="px-1 py-0.5 bg-gray-100 rounded text-gray-600">
													⌘/Ctrl + Enter
												</kbd>{' '}
												- Expand/collapse
											</p>
											<p>
												•{' '}
												<kbd className="px-1 py-0.5 bg-gray-100 rounded text-gray-600">
													Tab
												</kbd>{' '}
												- Add indentation
											</p>
											<p>
												•{' '}
												<kbd className="px-1 py-0.5 bg-gray-100 rounded text-gray-600">
													Esc
												</kbd>{' '}
												- Exit fullscreen
											</p>
										</div>
									</div>
								</div>
							)}

							{/* Quick help when not expanded */}
							{!showHelp && (
								<div className="text-xs text-gray-500">
									<p>
										💡 Write your prompt content • Press{' '}
										<kbd className="px-1 py-0.5 bg-gray-100 rounded text-gray-600">
											⌘/Ctrl + Enter
										</kbd>{' '}
										to expand
									</p>
								</div>
							)}
						</div>
					</div>

					<Handle
						type="source"
						position={Position.Bottom}
						isConnectable={isConnectable}
						className="!w-6 !h-6 !bg-gray-500 !border-4 !border-white hover:!bg-blue-500 hover:!border-blue-100 transition-all duration-200 !shadow-lg !z-10"
					/>
				</div>
			)}
		</>
	);
};

export default memo(PromptNodeComponent);
