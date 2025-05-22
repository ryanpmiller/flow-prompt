import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { Handle, NodeProps, Position } from 'reactflow';

import { TrashIcon } from '@heroicons/react/24/outline';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/solid';

import { PromptNode, useFlowStore } from '../store/flowStore';

const PromptNodeComponent = ({ data, id, isConnectable }: NodeProps<PromptNode['data']>) => {
	const [isMaximized, setIsMaximized] = useState(false);
	const textareaRef = useRef<HTMLTextAreaElement>(null);
	const cursorPositionRef = useRef<{ start: number; end: number } | null>(null);
	const { updateNodeContent, deleteNode } = useFlowStore();

	// Auto-resize textarea based on content
	const adjustTextareaHeight = useCallback(() => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = 'auto';
			textarea.style.height = `${textarea.scrollHeight}px`;
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

	// Handle content changes while preserving cursor position
	const handleContentChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
		const textarea = evt.target;
		cursorPositionRef.current = {
			start: textarea.selectionStart,
			end: textarea.selectionEnd,
		};
		updateNodeContent(id, textarea.value);
		adjustTextareaHeight();
	};

	// Adjust height on content change
	useEffect(() => {
		adjustTextareaHeight();
	}, [data.content, adjustTextareaHeight]);

	// Handle keyboard shortcuts
	const handleKeyDown = (evt: React.KeyboardEvent) => {
		// Cmd/Ctrl + Enter to toggle maximize
		if ((evt.metaKey || evt.ctrlKey) && evt.key === 'Enter') {
			evt.preventDefault();
			setIsMaximized(!isMaximized);
		}
		// Escape to exit maximize mode
		if (evt.key === 'Escape' && isMaximized) {
			setIsMaximized(false);
		}
		// Tab to indent (prevent focus moving)
		if (evt.key === 'Tab') {
			evt.preventDefault();
			const textarea = evt.target as HTMLTextAreaElement;
			const start = textarea.selectionStart;
			const end = textarea.selectionEnd;
			const newValue = data.content.substring(0, start) + '\t' + data.content.substring(end);
			updateNodeContent(id, newValue);
			// Restore cursor position after update
			requestAnimationFrame(() => {
				textarea.selectionStart = textarea.selectionEnd = start + 1;
			});
		}
	};

	const getPlaceholder = () => {
		return data.type === 'input'
			? 'Enter your prompt template here...\nUse {{variables}} for dynamic content'
			: 'Enter your transformation prompt here...\nUse {{input}} to reference incoming content';
	};

	const handleMaximize = (e: React.MouseEvent) => {
		e.stopPropagation(); // Prevent event from bubbling to ReactFlow
		setIsMaximized(true);
	};

	const handleMinimize = (e: React.MouseEvent) => {
		e.stopPropagation();
		setIsMaximized(false);
	};

	const handleDelete = (e: React.MouseEvent) => {
		e.stopPropagation();
		deleteNode(id);
	};

	const getTypeStyles = () => {
		return data.type === 'input'
			? 'bg-emerald-100 text-emerald-800'
			: 'bg-violet-100 text-violet-800';
	};

	return (
		<>
			{/* Regular Node View */}
			<div
				className={`relative bg-white rounded-lg shadow-lg border-2 border-gray-200 p-4 ${isMaximized ? 'min-w-[500px]' : 'min-w-[200px]'}`}
			>
				<Handle type="target" position={Position.Top} isConnectable={isConnectable} />

				<div className="mb-2 flex justify-between items-center">
					<span
						className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${getTypeStyles()}`}
					>
						{data.type}
					</span>
					<div className="flex gap-2">
						{isMaximized ? (
							<button
								onClick={handleMinimize}
								className="text-gray-500 hover:text-gray-700"
								title="Exit fullscreen (Esc)"
							>
								<MinusIcon className="size-4" />
							</button>
						) : (
							<button
								onClick={handleMaximize}
								className="text-sm text-gray-500 hover:text-gray-700"
								title="Edit in fullscreen (⌘/Ctrl + Enter)"
							>
								<PlusIcon className="size-4" />
							</button>
						)}
						<button
							onClick={handleDelete}
							className="text-sm text-gray-500 hover:text-gray-700"
							title="Delete node"
						>
							<TrashIcon className="size-4" />
						</button>
					</div>
				</div>

				<div>
					<textarea
						ref={textareaRef}
						className="w-full p-2 border rounded font-mono text-sm
							focus:ring-2 focus:ring-indigo-500 focus:border-transparent
							resize-none bg-gray-50 hover:bg-white transition-colors"
						value={data.content}
						onChange={handleContentChange}
						onKeyDown={handleKeyDown}
						placeholder={getPlaceholder()}
						rows={3}
						spellCheck={false}
					/>
				</div>

				<Handle type="source" position={Position.Bottom} isConnectable={isConnectable} />
			</div>
		</>
	);
};

export default memo(PromptNodeComponent);
