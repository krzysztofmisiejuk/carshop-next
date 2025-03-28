"use client"
import { ButtonProps } from '@/types/types';

export default function Button(props: ButtonProps) {
	return (
		<button
			type={props.type ? props.type : 'submit'}
            onClick={props.type === "submit" ? undefined : props.onClickFn }
			className='my-1 px-4 py-1.5 border text-sm rounded transition bg-gray-200  hover:bg-gray-300 cursor-pointer'

			data-user-id={props['data-user-id']}
		>
			{props.text}
		</button>
	);
}
