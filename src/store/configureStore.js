import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import taskReducer from './tasks';
import emplyeeReducer from './employees';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    employees: emplyeeReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), logger],
});

export default store;
