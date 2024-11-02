import { Card, LogoutButton } from '@/components';
import { COLLECTIONS } from '@/constants';
import { getAllDocsFromCollection } from '@/lib/firebase';
import { getUserInfo } from '@/lib/login';
import { secondaryFont } from '@/util/fonts';

const DashboardPage = async () => {
  const guestData = await getUserInfo();
  const pollsData = (await getAllDocsFromCollection(
    COLLECTIONS.POLLS
  )) as PollApiResponse;

  const polls = pollsData.data;
  const guest = guestData.data;

  const getGuestVote = (pollId: string) =>
    guest.polls?.find((poll) => poll.pollId === pollId);

  return (
    <div className='flex flex-col gap-8 p-16'>
      <h1 className={`text-6xl text-center ${secondaryFont.className}`}>
        Bem vindo {guest.name}
      </h1>
      <p className=' text-2xl text-center text-primary'>
        ATENÇÃO: Você pode votar na mesma pessoa em mais de uma categoria.
      </p>
      <div className='grid grid-cols-2 gap-8'>
        {polls.map((poll, index) => {
          const hasVote = getGuestVote(poll.id);
          return (
            <div
              key={poll.id}
              className={
                index === 0 ? 'col-span-2 justify-center px-[300px]' : ''
              }
            >
              <Card
                title={poll.title}
                id={poll.id}
                icon={poll.icon}
                disabled={!!hasVote}
                link={`/votacao/${poll.id}`}
              />
            </div>
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
