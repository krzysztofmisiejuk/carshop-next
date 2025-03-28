import { User } from '@/types/types';
import Button from '../Button/Button';
import SingleProperty from '../SingleProperty/SingleProperty';

export default function InfoPanel({
	user,
	setIsEditMode,
}: {
	user: User;
	setIsEditMode: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	return (
		<div className='flex items-center'>
			<Button
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
	);
}
