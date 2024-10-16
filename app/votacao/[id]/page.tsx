import { getAllDocsFromCollection, getDocById } from '@/lib/firebase';
import { COLLECTIONS } from '@/constants';
import { PollOptions } from '@/components';
import { secondaryFont } from '@/util/fonts';

const PollPage = async ({ params }: { params: { id: string } }) => {
  const pageData = await getDocById(COLLECTIONS.POLLS, params.id);
  const guestsData = await getAllDocsFromCollection(COLLECTIONS.GUESTS, 'name');
  const page = pageData.data as PollType;
  const guests = guestsData.data as GuestType[];

  return (
    <div className='flex flex-col gap-16 p-16'>
      <h1 className={`text-8xl text-center mt-8 ${secondaryFont.className}`}>
        {page.icon} {page.title}
      </h1>
      <PollOptions id={params.id} options={guests} />
    </div>
  );
};
export default PollPage;
