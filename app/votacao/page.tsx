import { Card, LogoutButton } from '@/components';
import { COLLECTIONS } from '@/constants';
import {
  getAllDocsFromCollection,
  getSingleDocFromCollectionByParam,
} from '@/lib/firebase';
import { getSession } from '@/lib/login';
import Link from 'next/link';

const DashboardPage = async () => {
  const user = await getSession();
  const guest = (await getSingleDocFromCollectionByParam(
    COLLECTIONS.GUESTS,
    'email',
    user.user.email
  )) as GetSingleGuestResponse;

  const data = (await getAllDocsFromCollection(
    COLLECTIONS.POLLS
  )) as PollApiResponse;

  const polls = data.data;

  return (
    <div className='flex flex-col gap-8 p-16'>
      <h1 className='text-4xl text-center'>Bem vindo {guest.data?.name}</h1>
      <div className='grid grid-cols-2 gap-8'>
        {polls.map((poll) => {
          return (
            <Link key={poll.id} href={`/votacao/${poll.id}`}>
              <Card title={poll.title} id={poll.id} icon={poll.icon} />
            </Link>
          );
        })}
      </div>
      <div className='flex justify-center'>
        <LogoutButton />
      </div>
    </div>
  );
};

export default DashboardPage;
