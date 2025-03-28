// app/api/logout/route.ts
'use server';
import { cookies } from 'next/headers';

export async function GET() {
  const cookieStore = await cookies();
  cookieStore.delete('token');
  return Response.json({ message: 'Logged out' }, { status: 200 });
}