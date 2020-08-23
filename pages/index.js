import Choises from '../components/Choises/Choises';
import { getLocationTypes } from '../lib/locationType';
import Head from 'next/head';

const Home = ({ locationTypes }) => {
  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>
      <Choises locationTypes={ locationTypes }/>     
    </div>
  );
};

export const getStaticProps = async () => {
  return getLocationTypes()
    .then(locationTypes => ({ props: { locationTypes }}))
    .catch(error => console.log(error));
};

export default Home;