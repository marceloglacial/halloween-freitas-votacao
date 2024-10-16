'use client';

import { playClick } from '@/lib/audio';

export const Modal = ({
  modalId,
}: {
  modalId: React.RefObject<HTMLDialogElement>;
}) => {
  return (
    <dialog id='voted' ref={modalId} className='modal'>
      <div className='modal-box bg-neutral'>
        <h3 className='font-bold text-lg'>Obrigado!</h3>
        <p className='py-4'>Voto computado com sucesso!</p>
        <div className='modal-action'>
          <form method='dialog'>
            <a
              href={'/votacao/'}
              className='btn btn-primary'
              onClick={playClick}
            >
              Voltar para o início
            </a>
          </form>
        </div>
      </div>
    </dialog>
  );
};
