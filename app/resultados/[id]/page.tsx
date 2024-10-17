import { getDocById } from '@/lib/firebase';
import { COLLECTIONS } from '@/constants';
import { Results } from '@/components';

const SingleResultPage = async ({ params }: { params: { id: string } }) => {
  const pageData = await getDocById(COLLECTIONS.POLLS, params.id);
  const page = pageData.data as PollType;
  page.options.sort((a, b) => (b.votes || 0) - (a.votes || 0));

  const firstPlace = page.options[0];

  return <Results page={page} firstPlace={firstPlace} />;
};
export default SingleResultPage;
