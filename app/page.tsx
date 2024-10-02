export default function Home() {
  return (
    <div className='flex items-center justify-center w-screen h-screen'>
      <div className='hero bg-base-200 min-h-screen'>
        <div className='hero-content text-center'>
          <div className='max-w-md'>
            <h1 className='text-5xl font-bold'>Halloween Votação</h1>
            <p className='py-6'>
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
            <div className='flex flex-col gap-4'>
              <label className='input input-bordered flex items-center gap-2'>
                Seu Nome
                <input type='text' className='grow' />
              </label>
              <button className='btn btn-primary'>Iniciar</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
