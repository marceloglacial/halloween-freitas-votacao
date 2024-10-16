'use client';
import { playClick } from '@/lib/audio';
import { logout } from '@/lib/login';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const LogoutButton = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    playClick();
    try {
      setIsLoading(true);
      await logout();
      router.push('/');
    } catch (e: unknown) {
      console.error(e);
      throw new Error('Erro ao sair, tente novamente!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      className='btn btn-primary btn-lg w-full'
      onClick={(e) => handleClick(e)}
      disabled={isLoading}
    >
      Sair
    </button>
  );
};
