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
  return fetch('http://localhost:3004/types')
    .then(response => response.json())
    .then(types => ({ props: { types } }))
    .catch(error => console.log(error));
};

export default Home;