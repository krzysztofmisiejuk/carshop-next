import { Profile } from '@/types/types';

export default function NavInfo({
  isLoggedIn,
  currentUser,
}: {
  isLoggedIn: boolean | string | null;
  currentUser: Profile | null;
}) {
  return (
    <p className="text-sm mt-1">
      {isLoggedIn
        ? `Zalogowany jako: ${currentUser?.username} | Rola: ${currentUser?.role} | Saldo: ${currentUser?.balance}`
        : 'Nie jesteś zalogowany'}
    </p>
  );
}