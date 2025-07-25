import React from 'react';

import { configureStore } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';



const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

const increment = () => ({
  type: INCREMENT
});


const decrement = () => ({
  type: DECREMENT
});



const initialState = {
  count: 0
};

function counterReducer(state = initialState, action) {
  switch (action.type) {
    case INCREMENT:
      // Return a new state object with the updated count
      return {
        ...state, // Spread existing state to preserve other properties if any
        count: state.count + 1
      };
    case DECREMENT:
      // Return a new state object with the updated count
      return {
        ...state,
        count: state.count - 1
      };
    default:
      // If the action type is not recognized, return the current state unchanged
      return state;
  }
}


const store = configureStore({
  reducer: counterReducer // configureStore expects an object with a 'reducer' property
});



function Counter() {
 
  const count = useSelector(state => state.count);

  
  const dispatch = useDispatch();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 font-inter">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Redux Counter</h1>
        <p className="text-6xl font-extrabold text-blue-600 mb-8">{count}</p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => dispatch(decrement())} // Dispatch the decrement action
            className="px-6 py-3 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
          >
            Decrement
          </button>
          <button
            onClick={() => dispatch(increment())} // Dispatch the increment action
            className="px-6 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 transition duration-300 ease-in-out"
          >
            Increment
          </button>
        </div>
        <p className="text-sm text-gray-500 mt-8">
          This is a simple counter demonstrating Redux state management.
        </p>
      </div>
    </div>
  );
}



export default function App() {
  return (
    
    <Provider store={store}>
      <Counter />
    </Provider>
  );
}


