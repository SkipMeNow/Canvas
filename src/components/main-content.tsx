interface MainContentProps {
	children: React.ReactNode;
}

export function MainContent({ children }: MainContentProps) {
	return (
		<>
			<h1>MainContent</h1>
			{children}
		</>
	);
}
