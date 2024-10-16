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
      <h1 className={`text-4xl text-center ${secondaryFont.className}`}>
        Bem vindo {guest.name}
      </h1>
      <div className='grid grid-cols-2 gap-8'>
        {polls.map((poll) => {
          const hasVote = getGuestVote(poll.id);
          return (
            <Card
              key={poll.id}
              title={poll.title}
              id={poll.id}
              icon={poll.icon}
              disabled={!!hasVote}
            />
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
