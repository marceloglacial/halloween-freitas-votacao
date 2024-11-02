import { Card } from '@/components';
import { COLLECTIONS } from '@/constants';
import { getAllDocsFromCollection } from '@/lib/firebase';
import { secondaryFont } from '@/util/fonts';

const ResultsPage = async () => {
  const pollsData = (await getAllDocsFromCollection(
    COLLECTIONS.POLLS
  )) as PollApiResponse;

  const polls = pollsData.data;

  return (
    <div className='flex flex-col gap-8 p-16'>
      <h1 className={`text-8xl text-center ${secondaryFont.className}`}>
        Resultados
      </h1>
      <div className='grid grid-cols-2 gap-8'>
        {polls.map((poll, index) => {
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
                link={`/resultados/${poll.id}`}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ResultsPage;
