import Choises from '../components/Choises/Choises';
import Head from 'next/head';

const Home = () => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Choises />     
    </>
  );
};

export default Home;