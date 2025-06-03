import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchEvent = createAsyncThunk('event/fetchEvent', async () => {
  const response = await axios.get(`http://localhost:3001/event`);
  return response.data;
});

export const fetchNewEvent = createAsyncThunk('event/fetchNewEvent', async (eventData) => {
  const {name, title, image, type, location, creatorId, eventDate, eventTime } = eventData;
  const response = await axios.post('http://localhost:3001/event', { name, title, image, type, location, creatorId, eventDate, eventTime  });
  return response.data;
});

const eventSlice = createSlice({
  name: 'event',
  initialState: {
    allEvent: [], 
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allEvent = action.payload; 
      })
      .addCase(fetchEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchNewEvent.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNewEvent.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allEvent.push(action.payload); 
      })
      .addCase(fetchNewEvent.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default eventSlice.reducer;
