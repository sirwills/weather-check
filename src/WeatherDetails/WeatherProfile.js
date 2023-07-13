import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const WeatherProfile = () => {
  const [weatherProfile, setWeatherProfile] = useState(null);
  const [search, setSearch] = useState('');
  
  const searchHandler = (e) => {
    

    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=ecea87cbccb9d3b686ab4e636c026b28`)
      .then((res) => {
        setWeatherProfile(res.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const getWeatherByLocation = (latitude, longitude) => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=ecea87cbccb9d3b686ab4e636c026b28`)
      .then((res) => {
        setWeatherProfile(res.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleKeyPress = (e) =>{
    if(e.key === `Enter`){
        searchHandler()
    }

  }

  useEffect(() => {
    // Check if the Geolocation API is available
    if ('geolocation' in navigator) {
      // Get the user's current position
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          getWeatherByLocation(latitude, longitude);
        },
        (error) => {
          console.error('Error:', error);
        }
      );
    } else {
      console.log('Geolocation is not available');
    }
  }, []);

  return (
    <div className='overal-container'>
    <div className='row container main-enviroment'>
        <div className='col-lg-12 col-md-12 col-sm-12 content-container'>
            <h2>Welcome to Weather-Check</h2>
            <p>Stay ahead of the weather with Weather-Check, your ultimate forecasting companion and weather guide </p>
        </div>

        <div className='col-lg-12 col-md-12 col-sm-12 search-enviroment'>
            
            <div className='search-box'>
                <input className='search-input'
                    type='text'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder='Search Country/City'
                />
                <button onClick={searchHandler} className='button'>
                <FaSearch />
                </button>
            </div>
        </div>
    </div>  
    
    <div className='row col-lg-12 col-md-12 col-sm-12  container'>
        <div className='enviroment'>
            {weatherProfile && (
            <div className='wearther-card'>
                <h2>{weatherProfile.name}</h2>
                <div className='details'>
                    <p>Weather condition: {weatherProfile.weather[0].main}</p>
                    <p>Weather description: {weatherProfile.weather[0].description}</p>
                    <p>Temperature: {weatherProfile.main.temp}F</p>
                </div>
                </div>
            )}
        </div>
    </div>
</div>
        
    
    
  );
};

export default WeatherProfile;
