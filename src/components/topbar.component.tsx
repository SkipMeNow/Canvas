interface TopbarProps {
	children: React.ReactNode;
}

export function Topbar({ children }: TopbarProps) {
	return (
		<>
			<h1>Topbar</h1>
			{children}
		</>
	);
}
