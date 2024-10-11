import { Photo } from '@/components';
import { COLLECTIONS } from '@/constants';
import { getAllDocsFromCollection, getDocById } from '@/lib/firebase';
import Link from 'next/link';

const PollPage = async ({ params }: { params: { id: string } }) => {
  const pageData = await getDocById(COLLECTIONS.POLLS, params.id);
  const guestsData = await getAllDocsFromCollection(COLLECTIONS.GUESTS);
  const page = pageData.data as PollType;
  const guests = guestsData.data as GuestType[];

  console.log(guests);

  return (
    <div className='flex flex-col gap-8 p-16'>
      <h1 className='text-8xl text-center'>
        {page.icon} {page.title}
      </h1>
      <div className='grid grid-cols-4 gap-8'>
        {guests.map((guest) => {
          if (!guest.photo) return;
          return <Photo key={guest.id} image={guest.photo} alt={guest.name} />;
        })}
      </div>
      <div className=' text-center'>
        <Link className='btn btn-primary btn-outline' href={'/votacao'}>
          Voltar para a votação
        </Link>
      </div>
    </div>
  );
};
export default PollPage;
