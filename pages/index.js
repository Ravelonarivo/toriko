import Choises from '../components/Choises/Choises';
import { getTypes } from '../lib/type';
import Head from 'next/head';

const Home = ({ types }) => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Choises types={ types }/>     
    </div>
  );
};

export const getStaticProps = async () => {
  return getTypes()
    .then(types => ({ props: { types } }))
    .catch(error => console.log(error));
};

export default Home;