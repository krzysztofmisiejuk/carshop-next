'use client';
import { MessageContextType, MessageObject } from '@/types/types';
import { createContext, useState } from 'react';

export const MessageContext = createContext<MessageContextType>([
  { text: '', type: 'info' },
  () => {},
]);

export function MessageProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState<MessageObject>({
    text: '',
    type: 'info',
  });

  return (
    <MessageContext.Provider value={[message, setMessage]}>
      {children}
    </MessageContext.Provider>
  );
}