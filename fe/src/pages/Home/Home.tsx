import { Link } from 'react-router';

export const Home = () => {
  return (
    <>
      <div>Home page</div>
      <div><Link to='/mui-tables'>Test Page 1</Link></div>
      <div><Link to='/test-page-2'>Test Page 1</Link></div>
    </>
  );
};

