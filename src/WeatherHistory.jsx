
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearHistory } from './weatherSlice';

export default function WeatherHistory() {
  
  const history = useSelector((state) => state.weather.history);
  const dispatch = useDispatch();

  return (
    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-3xl w-full flex flex-col items-center space-y-6">
      <h2 className="text-4xl font-extrabold text-indigo-700 mb-4">My Weather Diary</h2>

      {history.length === 0 ? (
        <p className="text-gray-600 text-lg p-4 bg-gray-50 rounded-lg border border-gray-200 w-full text-center">
          Your Weather Diary is empty! Go to "Weather Finder" to search for some weather.
        </p>
      ) : (
        <>
          {/* Button to clear the Weather Diary */}
          <button
            onClick={() => dispatch(clearHistory())}
            className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-300 transition-all duration-300 transform hover:scale-105"
          >
            Clear Weather Diary
          </button>

          {/* List of past weather searches */}
          <div className="w-full space-y-4 max-h-96 overflow-y-auto pr-2">
            {history.map((entry, index) => (
              <div key={index} className="bg-indigo-50 p-5 rounded-lg border border-indigo-200 shadow-sm flex flex-col md:flex-row md:justify-between md:items-center">
                <div className="mb-2 md:mb-0">
                  <p className="text-lg font-semibold text-indigo-800">
                    {entry.input.date} at Lat: {entry.input.latitude}, Lon: {entry.input.longitude}
                  </p>
                  <p className="text-sm text-gray-600">Searched: {entry.timestamp}</p>
                </div>
                <div className="text-right md:text-left">
                  <p className="text-md text-gray-700">
                    Max Temp: <span className="font-bold">{entry.result.daily.temperature_2m_max[0]}°C</span>
                  </p>
                  <p className="text-md text-gray-700">
                    Precip: <span className="font-bold">{entry.result.daily.precipitation_sum[0]} mm</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}