import { useEffect, useRef } from 'react';

interface Node {
	x: number;
	y: number;
	vx: number;
	vy: number;
	radius: number;
	opacity: number;
}

interface AnimatedBackgroundProps {
	className?: string;
}

export default function AnimatedBackground({ className = '' }: AnimatedBackgroundProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const animationRef = useRef<number | undefined>(undefined);
	const nodesRef = useRef<Node[]>([]);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		// Set canvas size
		const updateCanvasSize = () => {
			const rect = canvas.getBoundingClientRect();
			canvas.width = rect.width;
			canvas.height = rect.height;
		};

		updateCanvasSize();
		window.addEventListener('resize', updateCanvasSize);

		// Initialize nodes
		const initNodes = () => {
			const nodeCount = 20; // Fixed number for better performance
			const nodes: Node[] = [];

			for (let i = 0; i < nodeCount; i++) {
				nodes.push({
					x: Math.random() * canvas.width,
					y: Math.random() * canvas.height,
					vx: (Math.random() - 0.5) * 0.5,
					vy: (Math.random() - 0.5) * 0.5,
					radius: Math.random() * 2 + 1,
					opacity: Math.random() * 0.5 + 0.3,
				});
			}

			nodesRef.current = nodes;
		};

		initNodes();

		// Animation loop
		const animate = () => {
			if (!canvas || !ctx) return;

			// Clear canvas
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			const nodes = nodesRef.current;

			// Update node positions
			nodes.forEach((node) => {
				node.x += node.vx;
				node.y += node.vy;

				// Bounce off edges
				if (node.x <= 0 || node.x >= canvas.width) {
					node.vx *= -1;
					node.x = Math.max(0, Math.min(canvas.width, node.x));
				}
				if (node.y <= 0 || node.y >= canvas.height) {
					node.vy *= -1;
					node.y = Math.max(0, Math.min(canvas.height, node.y));
				}
			});

			// Draw connections
			nodes.forEach((node, i) => {
				nodes.slice(i + 1).forEach((otherNode) => {
					const distance = Math.sqrt(
						Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
					);

					if (distance < 100) {
						const opacity = ((100 - distance) / 100) * 0.3;
						ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
						ctx.lineWidth = 1;
						ctx.beginPath();
						ctx.moveTo(node.x, node.y);
						ctx.lineTo(otherNode.x, otherNode.y);
						ctx.stroke();
					}
				});
			});

			// Draw nodes
			nodes.forEach((node) => {
				// Core node
				ctx.fillStyle = `rgba(139, 92, 246, ${node.opacity})`;
				ctx.beginPath();
				ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
				ctx.fill();

				// Glow effect
				ctx.fillStyle = `rgba(99, 102, 241, ${node.opacity * 0.3})`;
				ctx.beginPath();
				ctx.arc(node.x, node.y, node.radius * 2, 0, Math.PI * 2);
				ctx.fill();
			});

			animationRef.current = requestAnimationFrame(animate);
		};

		animate();

		// Cleanup
		return () => {
			if (animationRef.current) {
				cancelAnimationFrame(animationRef.current);
			}
			window.removeEventListener('resize', updateCanvasSize);
		};
	}, []);

	return (
		<canvas
			ref={canvasRef}
			className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
		/>
	);
}
