'use client';
import { getSingleGuest } from '@/lib';
import { useRouter } from 'next/navigation';

export const LoginForm = () => {
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const email = form.email.value;

    try {
      const data = await getSingleGuest(email);
      if (data.status === 'error') return alert(data.error?.message);
      return router.push('/dashboard');
    } catch (e) {
      console.error(e);
      throw Error;
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
              />
            </label>
            <button type='submit' className='btn btn-primary'>
              Iniciar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
