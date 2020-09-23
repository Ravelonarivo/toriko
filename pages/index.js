import LocationTypeList from '../components/LocationType/LocationTypeList';
import TownList from '../components/Town/TownList';
import { getLocationTypes } from '../lib/location';
import { getTowns } from '../lib/town';
import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

const Home = ({ locationTypesProp, townsProp }) => {
  const router = useRouter();
  const [townName, setTownName] = useState('Quelle est votre ville ?'); 

  useEffect(() => {
    const townName = localStorage.getItem('townName');
    if (townName) setTownName(townName);
  }, []);

  useEffect(() => {
    if (townName) {
      localStorage.setItem('townName', townName);
    }
  }, [townName]);
  
  const selectTownName = event => {
    setTownName(event.target.value);
  }

  const selectLocationType = event => {
    router.push('/result/[...param]', `/result/${ townName }/${ event.target.value }`);
  }

  /*const t = [
    { name: 'dakar' },
    { name: 'thies' },
    { name: 'saly' },
    { name: 'goré' },
    { name: 'pikine' },
    { name: 'mbaou' }
  ];*/

  return (
    <div>
      <Head>
        <title>Home</title>
      </Head>

      <TownList
        towns={ townsProp }
        selectTownName={ selectTownName }
        townName={ townName }
      />
    
      {
        townName != 'Quelle est votre ville ?'
          ? <LocationTypeList
              locationTypes={ locationTypesProp }
              townName={ townName }
              locationTypeName={ `Que cherchez vous à ${ townName } ?` }
              selectLocationType={ selectLocationType }
            />
          : ''     
      }    
    </div>
  );
  
};

export const getStaticProps = async () => {
  try {
    const locationTypes = await getLocationTypes();
    const towns = await getTowns();

    return {
      props: {
        locationTypesProp: locationTypes,
        townsProp: towns
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export default Home;