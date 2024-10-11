import { LogoutButton } from '@/components';

const DashboardPage = () => {
  return (
    <div className='flex flex-col gap-8'>
      <h1>Bem vindo</h1>
      <LogoutButton />
    </div>
  );
};

export default DashboardPage;
