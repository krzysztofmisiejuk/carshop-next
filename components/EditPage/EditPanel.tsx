'use client';
import { User } from '@/types/types';
import { useState } from 'react';
import { InfoPanel, EditForm } from './';

export default function EditPanel({
	user,
	refreshUser
}: {
	user: User;
	refreshUser: () => void;
}) {
	const [isEditMode, setIsEditMode] = useState(false);
	return (
		<li className='flex my-2 py-0.5 items-center border-b border-custom-medium-gray'>
			{isEditMode ? (
				<EditForm
					user={user}
					setIsEditMode={setIsEditMode}
					refreshUser={refreshUser}
				/>
			) : (
				<InfoPanel
					user={user}
					setIsEditMode={setIsEditMode}
				/>
			)}
		</li>
	);
}