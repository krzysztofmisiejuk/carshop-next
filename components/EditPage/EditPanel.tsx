'use client'
import { useState } from 'react'
import { InfoPanel, EditForm } from '.'
import { User } from '@/app/types/types'

export default function EditPanel({ user }: { user: User }) {
	const [isEditMode, setIsEditMode] = useState(false)
	return (
		<li className='flex my-2 py-0.5 items-center border-b border-custom-medium-gray'>
			{isEditMode ? (
				<EditForm
					user={user}
					setIsEditMode={setIsEditMode}
				/>
			) : (
				<InfoPanel
					user={user}
					setIsEditMode={setIsEditMode}
				/>
			)}
		</li>
	)
}
