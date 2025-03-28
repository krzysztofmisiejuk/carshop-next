'use client';
import { useContext, useState } from 'react';
import { Button, Form, Input, PageHeader } from '@/components';
import { MessageContext } from '@/contexts/MessageContext';
import { LoginContext } from '@/contexts';
import type { Profile } from '@/types/types';

export default function BuyCarPanel() {
  const [carId, setCarId] = useState('');
  const [, setMessage] = useContext(MessageContext);
  const { setLoggedUser } = useContext(LoginContext);

  async function getCurrentUser() {
    try {
      const response = await fetch('http://localhost:3000/api/login', {
        credentials: 'include',
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.log(errorData);
        return;
      }
      const data = await response.json();
      console.log('data from loaded profile', data);
      const userData: Profile = {
        username: data.data.username,
        role: data.data.role || 'user',
        balance: data.data.balance,
      };
      setLoggedUser(userData); 
    } catch (error) {
      console.error(error);
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/cars/${carId}/buy`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carId: carId }),
        credentials: 'include',
      });
      const data = await response.json();
      if (response.ok) {
        setMessage({
          text: data.message,
          type: 'success',
        });
        await getCurrentUser(); 
      } else {
        setMessage({
          text: data.error,
          type: 'error',
        });
      }
    } catch (error) {
      console.error('Error when trying to buy car:', error);
      setMessage({
        text: `${error}`,
        type: 'error',
      });
    }
  }

  return (
    <section>
      <PageHeader headerContent="Kup samochód" />
      <Form onSubmit={handleSubmit}>
        <Input
          id="bought_car"
          placeholder="ID samochodu"
          onChange={setCarId}
        />
        <Button text="Kup samochód" />
      </Form>
    </section>
  );
}