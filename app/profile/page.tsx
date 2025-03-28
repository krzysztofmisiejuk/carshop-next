'use client';
import { Button, Form, Input, PageHeader, PageSubHeader } from '@/components';
import { LoginContext } from '@/contexts/LoginContext';
import { MessageContext } from '@/contexts/MessageContext';
import { useContext, useState } from 'react';
import type { Profile } from '@/types/types';

export default function Profile() {
  const [, setMessage] = useContext(MessageContext);
  const { loggedUser, setLoggedUser } = useContext(LoginContext);
  const [newUsername, setNewUsername] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/users/edit', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: newUsername,
          password: newPassword,
        }),
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        const updatedUser: Profile = {
          username: newUsername || loggedUser!.username, 
          role: loggedUser!.role,
          balance: loggedUser!.balance,
        };
        setLoggedUser(updatedUser); 
        setMessage({ text: data.message, type: 'success' });
      } else {
        setMessage({ text: data.error, type: 'error' });
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage({ text: 'Wystąpił błąd', type: 'error' });
    }
  }



  return (
    <>
      <PageHeader headerContent="Profil" />
      <section>
        <p>Username: {loggedUser?.username}</p>
        <p>Saldo: {loggedUser?.balance}</p>
      </section>
      <section>
        <PageSubHeader headerContent="Edytuj swój profil" />
        <Form onSubmit={handleSubmit}>
          <Input
            id="new_username"
            placeholder="Nowy Username"
            onChange={setNewUsername}
          />
          <Input
            id="new_password"
            placeholder="Nowy Password"
            onChange={setNewPassword}
          />
          <Button text="Aktualizuj profil" />
        </Form>
      </section>
    </>
  );
}