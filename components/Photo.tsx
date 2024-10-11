import Image from 'next/image';
import { LoadingState } from './LoadingState';

export const Photo = (props: PhotoType) => {
  return (
    <div className='card bg-secondary relative w-48 h-48 overflow-hidden'>
      <figure className='z-10'>
        <Image
          alt={`Fantasia de ${props.alt}`}
          src={`https://firebasestorage.googleapis.com/v0/b/halloween-freitas.appspot.com/o/${props.image}?alt=media`}
          fill
          className='w-full h-full object-cover object-top '
          sizes='192px'
        />
      </figure>
      <div className=' absolute w-full h-full flex items-center justify-center z-0'>
        <LoadingState />
      </div>
    </div>
  );
};
