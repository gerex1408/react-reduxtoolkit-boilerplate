import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// SAGA

export const fetchTasks = createAsyncThunk(
  'fetchTasks',
  async (a, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        'https://jsonplaceholder.typicode.com/todos'
      );
      return { tasks: response.data };
    } catch (error) {
      return rejectWithValue({ error: error.message });
    }
  }
);

// REDUCERS

const initialState = {
  data: [],
  isLoading: false,
  hasError: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.data = action.payload.tasks;
        state.isLoading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.hasError = action.payload.error;
        state.isLoading = false;
      });
  },
});
export const { getTasks, addTask, removeTask } = taskSlice.actions;
export default taskSlice.reducer;
