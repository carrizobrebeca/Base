import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './registerSlice';
import loginReducer from './loginSlice';
import usersReducer from './usersSlice';
import postReducer from './postSlice';
import eventReducer from './eventSlice';
const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
     users: usersReducer,
     event: eventReducer,
     post: postReducer,
  },
});

export default store;
