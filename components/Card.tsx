'use client';
import { playClick } from '@/lib/audio';
import { secondaryFont } from '@/util/fonts';
import { FC } from 'react';

export const Card: FC<CardProps> = (props): JSX.Element => {
  const handleClick = () => {
    playClick();
    if (!props.disabled) return;
    alert('Você já votou nessa categoria!');
  };
  return (
    <a
      href={props.disabled ? '#' : props.link}
      className={`${props.disabled ? ' opacity-20' : ''}`}
      onClick={handleClick}
    >
      <div className='card card-side bg-secondary shadow-xl overflow-hidden'>
        {props.icon && (
          <div className='flex justify-center items-center p-4'>
            <span className=' text-[100px]'>{props.icon}</span>
          </div>
        )}
        {props.title && (
          <div className='card-body justify-center'>
            <h2 className={`card-title text-4xl ${secondaryFont.className}`}>
              {props.title}
            </h2>
          </div>
        )}
      </div>
    </a>
  );
};
