import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchWeather = createAsyncThunk(
  'weather/fetchWeather', // A special name for this note
  async ({ latitude, longitude, date }) => {
    
    const apiUrl = `https://archive-api.open-meteo.com/v1/archive?latitude=${latitude}&longitude=${longitude}&start_date=${date}&end_date=${date}&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max&timezone=auto`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.reason || 'Failed to fetch weather data');
      }
      const data = await response.json();
      return { data, input: { latitude, longitude, date } };
    } catch (error) {
      throw new Error(`Could not fetch weather: ${error.message}`);
    }
  }
);

const weatherSlice = createSlice({
  name: 'weather', 
  initialState: {
    currentWeather: null, 
    history: [],          
    loading: false,       
    error: null,          
  },
  reducers: {
    clearHistory: (state) => {
      state.history = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        
        state.loading = false; 
        state.currentWeather = action.payload.data; 
        state.history.unshift({ 
          input: action.payload.input,
          result: action.payload.data,
          timestamp: new Date().toLocaleString(),
        });
    
        if (state.history.length > 10) {
          state.history.pop(); 
        }
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        
        state.loading = false; 
        state.error = action.error.message; 
        state.currentWeather = null; 
      });
  },
});

export const { clearHistory } = weatherSlice.actions;
export default weatherSlice.reducer;
