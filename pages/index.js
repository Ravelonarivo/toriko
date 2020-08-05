import Choises from '../components/Choises/Choises';
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
  const res = await fetch('http://localhost:3004/type');
  // Location types (restaurant, fast-foold, ...)
  const types = await res.json();
  console.log(types);
  return {
    props: { types }
  };
};

export default Home;