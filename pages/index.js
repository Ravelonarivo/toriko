import Choises from '../components/Choises/Choises';
import { getTypes } from '../lib/type';
import Head from 'next/head';

const Home = ({ types }) => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Choises locationTypes={ types }/>     
    </div>
  );
};

export const getStaticProps = async () => {
  return getLocationTypes()
    .then(types => ({ props: { types } }))
    .catch(error => console.log(error));
};

export default Home;