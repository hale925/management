import { createSlice } from '@reduxjs/toolkit';

const employeesSlice = createSlice({
  name: 'employees',
  initialState: {
    employees: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchEmployeesStart: (state) => {
      console.log('Reducer: fetchEmployeesStart');
      state.loading = true;
      state.error = null;
    },
    fetchEmployeesSuccess: (state, action) => {
      console.log('Reducer: fetchEmployeesSuccess');
      state.loading = false;
      state.employees = action.payload;
      
    },
    fetchEmployeesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    }
    
  },
});

export const {
  fetchEmployeesStart,
  fetchEmployeesSuccess,
  fetchEmployeesFailure
  
} = employeesSlice.actions;

export default employeesSlice.reducer;
