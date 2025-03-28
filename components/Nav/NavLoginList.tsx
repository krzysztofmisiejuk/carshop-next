'use client';
import { useContext } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MessageContext } from '@/contexts/MessageContext';
import { LoginContext } from '@/contexts/LoginContext';

export default function NavLoginList({ isAdmin }: { isAdmin: boolean }) {
  const [, setMessage] = useContext(MessageContext);
  const { setLoggedUser,  } = useContext(LoginContext);
  const router = useRouter();

  async function handleLogout() {
    const response = await fetch('/api/logout', {
      method: 'GET',
      credentials: 'include',
    });
    if (response.ok) {
      setLoggedUser(null);
      // setIsLoggedIn(false);
      setMessage({ text: 'Wylogowano pomyślnie', type: 'success' });
      router.push('/login');
      router.refresh();
    } else {
      setMessage({ text: 'Błąd podczas wylogowania', type: 'error' });
    }
  }

  return (
    <div className="flex gap-4 w-full">
      <Link href="/">
        <li>Home</li>
      </Link>
      <Link href="/profile">
        <li>Profil</li>
      </Link>
      <Link href="/cars">
        <li>Samochody</li>
      </Link>
      <Link href="/buy">
        <li>Kup samochód</li>
      </Link>
      <li
        onClick={async () => {
          try {
            await handleLogout();
          } catch (error) {
            console.error('Logout error:', error);
            setMessage({ text: 'Wystąpił błąd', type: 'error' });
          }
        }}
        className="cursor-pointer"
      >
        Wyloguj
      </li>
      {isAdmin && (
        <Link href="/edit" className="ml-auto">
          Lista użytkowników
        </Link>
      )}
    </div>
  );
}