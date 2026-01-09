import { Link } from 'react-router';

export const Home = () => {
  return (
    <>
      <div>Home page</div>
      <div><Link to='/material-ui/table'>Material UI</Link></div>
      <div><Link to='/ant-design'>Ant design</Link></div>
      <div><Link to='/chakra-ui'>Chakra UI</Link></div>
    </>
  );
};

