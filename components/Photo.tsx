import Image from 'next/image';
import { LoadingState } from './LoadingState';

export const Photo = (props: PhotoType) => {
  return (
    <div className='card bg-accent relative overflow-hidden'>
      <figure className='z-10'>
        <Image
          alt={`Fantasia de ${props.alt}`}
          src={`https://firebasestorage.googleapis.com/v0/b/halloween-freitas.appspot.com/o/${props.image}?alt=media`}
          className='w-full h-full object-cover object-top aspect-square'
          width={192}
          height={192}
        />
      </figure>
      <div className=' absolute w-full h-full flex items-center justify-center z-0'>
        <LoadingState />
      </div>
    </div>
  );
};
