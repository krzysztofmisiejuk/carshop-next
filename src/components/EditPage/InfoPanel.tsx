'use client'
import SingleProperty from '../SingleProperty/SingleProperty'
import CustomButton from '../CustomButton/CustomButton'
import { User } from '@prisma/client'

export default function InfoPanel({
	user,
	setIsEditMode,
}: {
	user: User
	setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>
}) {
	return (
		<div className='flex items-center'>
			<CustomButton
				type='button'
				text='Edytuj'
				onClickFn={() => setIsEditMode(true)}
			/>
			<SingleProperty
				property='Id'
				value={`${user.id}`}
			/>
			<SingleProperty
				property='Username'
				value={`${user.username}`}
			/>
			<SingleProperty
				property='Pasword'
				value={`${user.password}`}
			/>
			<SingleProperty
				property='Role'
				value={`${user.role}`}
			/>
			<SingleProperty
				property='Balance'
				value={`${user.balance}`}
			/>
		</div>
	)
}
