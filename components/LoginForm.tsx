'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { loginAction } from '@/lib/login';

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const result = await loginAction(formData);

    setIsLoading(false);

    if (result?.status === 'error') {
      alert('Usuário não encontrado!');
    } else {
      router.push('/votacao');
    }
  };

  return (
    <div data-id='hero' className='hero bg-base-200 min-h-screen'>
      <div className='hero-content text-center'>
        <form onSubmit={handleSubmit} className='max-w-md'>
          <h1 className='text-5xl font-bold'>Halloween Votação</h1>
          <p className='py-6'>
            Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
            excepturi exercitationem quasi. In deleniti eaque aut repudiandae et
            a id nisi.
          </p>
          <div className='flex flex-col gap-4'>
            <label className='input input-bordered flex items-center gap-2'>
              Email
              <input
                type='email'
                name='email'
                className='grow'
                defaultValue={'glacial@gmail.com'}
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
