'use client'
import { InputTypes } from '@/types/types';

export default function Input({
	id,
	type = 'text',
	placeholder,
	onChange,
}: InputTypes) {
	return (
		<input
			className='my-1 p-1.5 text-sm border rounded'
			id={id}
			type={type}
			placeholder={placeholder}
			minLength={type === 'text' || type === 'password' ? 3 : 1}
			required
			onChange={(e) => onChange(e.currentTarget.value)}
		/>
	);
}
