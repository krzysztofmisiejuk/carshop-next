'use client';
export default function Form({
	onSubmit,
	children,
}: {
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
	children: React.ReactNode;
}) {
	return (
		<form
			className='flex gap-x-3 items-center'
			onSubmit={onSubmit}
		>
			{children}
		</form>
	);
}
