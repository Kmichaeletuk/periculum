
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from './weatherSlice';


export default function WeatherSearch() {
  
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [date, setDate] = useState(''); 

  
  const dispatch = useDispatch();
  
  const { currentWeather, loading, error } = useSelector((state) => state.weather);

  
  const handleSearch = () => {
    
    if (latitude && longitude && date) {
      
      dispatch(fetchWeather({ latitude, longitude, date }));
    } else {
      alert('Please enter Latitude, Longitude, and Date.'); 
    }
  };

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-2xl w-full flex flex-col items-center space-y-6">
      <h2 className="text-4xl font-extrabold text-blue-700 mb-4">Weather Finder</h2>

      {/* Input boxes for Latitude, Longitude, and Date */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full">
        <input
          type="number"
          step="any"
          placeholder="Latitude (e.g., 6.43)"
          value={latitude}
          onChange={(e) => setLatitude(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        <input
          type="number"
          step="any"
          placeholder="Longitude (e.g., 3.45)"
          value={longitude}
          onChange={(e) => setLongitude(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
        />
      </div>

      {/* The 'Find Weather' button */}
      <button
        onClick={handleSearch}
        disabled={loading} 
        className="w-full md:w-auto px-8 py-3 bg-green-600 text-white font-bold rounded-lg shadow-lg hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? 'Finding...' : 'Find Weather'}
      </button>

      {/* Where we show if something went wrong */}
      {error && (
        <p className="text-red-600 text-center font-medium mt-4 p-3 bg-red-50 rounded-lg border border-red-200 w-full">
          Error: {error}
        </p>
      )}

      {/* Where we show the weather we found */}
      {currentWeather && !loading && !error && (
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200 w-full text-center mt-6 shadow-inner">
          <h3 className="text-2xl font-bold text-blue-800 mb-3">Weather for {currentWeather.daily.time[0]}</h3>
          <p className="text-lg text-gray-700">
            Max Temp: <span className="font-semibold">{currentWeather.daily.temperature_2m_max[0]}°C</span>
          </p>
          <p className="text-lg text-gray-700">
            Min Temp: <span className="font-semibold">{currentWeather.daily.temperature_2m_min[0]}°C</span>
          </p>
          <p className="text-lg text-gray-700">
            Precipitation: <span className="font-semibold">{currentWeather.daily.precipitation_sum[0]} mm</span>
          </p>
          <p className="text-lg text-gray-700">
            Max Wind Speed: <span className="font-semibold">{currentWeather.daily.wind_speed_10m_max[0]} km/h</span>
          </p>
          <p className="text-sm text-gray-500 mt-4">
            (Daily summary data from Open-Meteo. Specific hourly data for historical dates is not available via this free API.)
          </p>
        </div>
      )}
    </div>
  );
}