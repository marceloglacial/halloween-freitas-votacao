'use client';
import { FC, useRef, useState } from 'react';
import { Alert, LoadingState, Modal, Photo } from '@/components';
import { getUserInfo } from '@/lib/login';
import { handleVote } from '@/lib/vote';
import { playClick, playVote } from '@/lib/audio';

interface PollOptionsProps {
  id: string;
  options: GuestType[];
}

export const PollOptions: FC<PollOptionsProps> = (props): JSX.Element => {
  const [selectedOption, setSelectedOption] = useState<GuestType>();
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const modal = useRef<HTMLDialogElement>(null);

  const openModal = () => {
    if (modal.current) {
      modal.current.show();
    }
  };

  const handleClick = (option: GuestType) => {
    setSelectedOption(option);
    playClick();
  };

  const handleSubmit = async () => {
    try {
      playClick();
      setIsLoading(true);
      const guestData = await getUserInfo();
      const user = guestData.data;

      if (!selectedOption?.id) return;

      const response = await handleVote(props.id, selectedOption, user);

      if (response.status === 'success') {
        openModal();
        playVote();
      }
    } catch (e) {
      console.error(e);
      setIsError(true);
    }
  };

  if (isError) {
    return (
      <div className='grid grid-cols-1 gap-8'>
        <Alert title='Erro ao votar! Tente novamente' />
        <a className='btn btn-primary' href={'/votacao'} onClick={playClick}>
          Voltar para a votação
        </a>
      </div>
    );
  }

  return (
    <>
      <div className='fixed top-8 right-8 inline-flex z-50'>
        <a className='btn btn-secondary' href={'/votacao'} onClick={playClick}>
          Voltar para a votação
        </a>
      </div>

      {isLoading && (
        <div className='fixed top-0 left-0 h-full w-full flex items-center justify-center z-50 bg-black bg-opacity-70'>
          <LoadingState />
        </div>
      )}
      <div
        className={`poll-options grid grid-cols-4 gap-8 ${
          isLoading ? 'opacity-30' : ''
        }`}
      >
        {props.options.map((option) => {
          if (!option.photo) return;
          const selectedClassName =
            selectedOption?.id === option.id
              ? 'outline outline-7 outline-primary overflow-hidden rounded-2xl'
              : '';

          return (
            <button
              key={option.id}
              id={option.id}
              onClick={() => handleClick(option)}
              className={selectedClassName}
              disabled={isLoading}
            >
              <Photo image={option.photo} alt={option.name} />
            </button>
          );
        })}
        {selectedOption && (
          <div className='fixed bottom-0 left-0 w-full z-40'>
            <button
              onClick={handleSubmit}
              className='btn btn-lg h-32 btn-primary w-full rounded-none'
              disabled={isLoading}
            >
              Votar em {selectedOption.name}
            </button>
          </div>
        )}
      </div>
      <Modal modalId={modal} />
    </>
  );
};
