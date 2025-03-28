import { Footer, Header, Message, Notification } from '@/components';
import { LoginProvider, MessageProvider } from '@/contexts/';
import { cookies } from 'next/headers';
import { Profile } from '@/types/types';

async function getInitialUser(): Promise<{ isLoggedIn: boolean; user: Profile | null }> {
  const cookieStore = await cookies();
  const token = cookieStore.get('token')?.value;

  if (!token) return { isLoggedIn: false, user: null };

  try {
    const response = await fetch('http://localhost:3000/api/login', {
      credentials: 'include',
      headers: { Cookie: `token=${token}` },
    });
    if (!response.ok) return { isLoggedIn: false, user: null };

    const data = await response.json();
    const user: Profile = {
      username: data.data.username,
      role: data.data.role,
      balance: data.data.balance,
    };
    return { isLoggedIn: true, user };
  } catch (error) {
    console.error('Error fetching data:', error);
    return { isLoggedIn: false, user: null };
  }
}

// use effect

export default async function RootTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoggedIn, user } = await getInitialUser();
  console.log('Initial state in Template', { isLoggedIn, user });

  return (
    <LoginProvider initialUser={user} initialIsLoggedIn={isLoggedIn}>
      <MessageProvider>
        <div className="flex flex-col min-h-svh">
          <Header />
          <Notification />
          <Message />
          <main className="flex flex-col flex-1 p-5 mt-5 w-full rounded bg-white">
            {children}
          </main>
          <Footer />
        </div>
      </MessageProvider>
    </LoginProvider>
  );
}