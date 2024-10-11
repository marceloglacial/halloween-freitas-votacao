import { FC } from 'react';

export const Card: FC<CardProps> = (props): JSX.Element => {
  return (
    <div className='card card-side bg-secondary shadow-xl overflow-hidden'>
      {props.icon && (
        <div className='flex justify-center items-center p-4'>
          <span className=' text-[100px]'>{props.icon}</span>
        </div>
      )}
      {props.title && (
        <div className='card-body justify-center'>
          <h2 className='card-title text-4xl'>{props.title}</h2>
        </div>
      )}
    </div>
  );
};
