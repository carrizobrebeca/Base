import { configureStore } from '@reduxjs/toolkit';
import registerReducer from './registerSlice';
import loginReducer from './loginSlice';
import usersReducer from './usersSlice';

const store = configureStore({
  reducer: {
    register: registerReducer,
    login: loginReducer,
     users: usersReducer,
  },
});

export default store;
