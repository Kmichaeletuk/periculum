// src/App.jsx
import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import weatherReducer from './weatherSlice';
import WeatherSearch from './WeatherSearch';
import WeatherHistory from './WeatherHistory';


const store = configureStore({
  reducer: {
    weather: weatherReducer, 
  },
});


export default function App() {
  
  const [currentPage, setCurrentPage] = useState('search');

  return (
    
    <Provider store={store}>
      <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-200 text-gray-800 font-inter flex flex-col">
        {/* Navigation Buttons to switch pages */}
        <nav className="bg-white shadow-md p-4 flex justify-center space-x-4 rounded-b-lg">
          <button
            onClick={() => setCurrentPage('search')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              currentPage === 'search'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
            }`}
          >
            Weather Finder
          </button>
          <button
            onClick={() => setCurrentPage('history')}
            className={`px-6 py-2 rounded-lg font-semibold transition-all duration-300 ${
              currentPage === 'history'
                ? 'bg-blue-600 text-white shadow-lg'
                : 'bg-gray-200 text-gray-700 hover:bg-blue-100'
            }`}
          >
            Weather Diary
          </button>
        </nav>

        {/* This is where we show the correct page */}
        <main className="flex-grow flex items-center justify-center p-4">
          {currentPage === 'search' ? <WeatherSearch /> : <WeatherHistory />}
        </main>
      </div>
    </Provider>
  );
}