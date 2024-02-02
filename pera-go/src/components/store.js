import { configureStore } from '@reduxjs/toolkit';
import positionReducer from './positionSlice'; 
import employeeReducer from './employee/employeeSlice'

const store = configureStore({
  reducer: {
    positions: positionReducer, 
    employees: employeeReducer,
  },
});

export default store;
