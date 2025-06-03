import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchPost = createAsyncThunk('post/fetchPost', async () => {
  const response = await axios.get(`http://localhost:3001/post`);
  return response.data;
});

export const fetchNewPost = createAsyncThunk('post/fetchNewPost', async (postData) => {
  const {image, description, userId, eventId } = postData;
  const response = await axios.post('http://localhost:3001/post', { image, description, userId, eventId });
  return response.data;
});

const postSlice = createSlice({
  name: 'post',
  initialState: {
    allpost: [], 
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPost.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchPost.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.allpost = action.payload; 
      })
      .addCase(fetchPost.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchNewPost.pending, (state) => {
      state.status = 'loading';
    })
    .addCase(fetchNewPost.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.allpost.push(action.payload); // opcional: agregar al array
    })
    .addCase(fetchNewPost.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  },
});

export default postSlice.reducer;
