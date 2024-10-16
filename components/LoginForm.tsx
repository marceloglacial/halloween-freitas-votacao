'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/login';
import { Alert, LoadingState } from '@/components';
import { secondaryFont } from '@/util/fonts';

export const LoginForm = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsError(false);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await login(formData);

    if (result?.status === 'error') {
      setIsLoading(false);
      setIsError(true);
    } else {
      router.push('/votacao');
    }
  };

  if (isLoading) return <LoadingState />;

  return (
    <div data-id='hero' className='hero bg-base-200 min-h-screen'>
      <div className='hero-content text-center'>
        <form onSubmit={handleSubmit} className='max-w-md'>
          <h1 className={`text-5xl font-bold ${secondaryFont.className}`}>
            Halloween dos Freitas
          </h1>
          <p className='py-6'>
            Entre com seu email. <br />
            Caso não tenha acesso, favor se cadastrar no site.
          </p>
          <div className='flex flex-col gap-4'>
            {isError && <Alert title='Usuário não cadastrado!' />}
            <label className='input input-bordered flex items-center gap-2'>
              Email
              <input
                type='email'
                name='email'
                className='grow'
                required
                disabled={isLoading}
              />
            </label>
            <button
              type='submit'
              className='btn btn-primary'
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : 'Iniciar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
