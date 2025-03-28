'use client';
import { LoginContext } from '@/contexts';
import { NavInfo, NavLoginList, NavLogoutList } from './';
import { useContext } from 'react';

export default function Nav() {
	const { loggedUser } = useContext(LoginContext);
  
	const isAdmin = loggedUser?.role === 'admin';
	const isLoggedIn = loggedUser !== null;

	return (
		<>
			<ul className='my-[10px] flex gap-x-5 list-none'>
				{isLoggedIn ? <NavLoginList isAdmin={isAdmin} /> : <NavLogoutList />}
			</ul>
			<NavInfo
				currentUser={loggedUser}
				isLoggedIn={isLoggedIn}
			/>
		</>
	);
}
