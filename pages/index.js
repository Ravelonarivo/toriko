import LocationTypeList from '../components/LocationType/LocationTypeList';
import TownList from '../components/Town/TownList';
import { getLocationTypes } from '../lib/location';
import { getTowns } from '../lib/town';
import Head from 'next/head';
import { Component } from 'react';

class Home extends Component {
  constructor() {
    super();
    this.state = {
      townName: ''
    }
  }

  componentDidMount() {
    const townName = localStorage.getItem('townName');
    if (townName) this.setState({ townName })
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.townName !== this.state.townName) {
      localStorage.setItem('townName', this.state.townName);
    }
  }
  
  selectTownName = event => {
    this.setState({ townName: event.target.innerText });
  }

  resetTownName = () => {
    this.setState({ townName: '' });
    localStorage.removeItem('townName');
  }

  render() {
    const { locationTypesProp, townsProp } = this.props;
    const { townName, townSelected } = this.state;
    const { selectTownName, resetTownName } = this;

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
        { 
          townName
            ? <LocationTypeList 
                locationTypes={ locationTypesProp } 
                townName={ townName.toLowerCase() } 
                resetTownName={ resetTownName }
              /> 
            : <TownList 
                towns={ townsProp } 
                selectTownName={ selectTownName } 
              />
        }    
      </div>
    );
  }
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