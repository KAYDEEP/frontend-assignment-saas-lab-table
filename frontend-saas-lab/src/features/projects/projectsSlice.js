import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for fetching projects data
export const fetchProjects = createAsyncThunk('projects/fetchProjects', async () => {
  const response = await axios.get('https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json');
  return response.data;
});
  // console.log("🚀 ~ fetchProjects ~ response:", response)

// Create slice
const projectsSlice = createSlice({
  name: 'projects',
  initialState: {
    projects: [],
    status: 'idle',  // 'idle', 'loading', 'succeeded', 'failed'
    currentPage: 1,
    totalPages: 0,
    error: null, // To capture any error from the API call
  },
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.status = 'loading';
        state.error = null; // Clear any previous errors
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        console.log("🚀 ~ .addCase ~ action:", action)
        state.status = 'succeeded';
        const totalProjects = action?.payload?.length;
        state.totalPages = Math.ceil(totalProjects / 5);
        state.projects = action?.payload || [];
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message; // Capture error message
      });
  },
});

export const { setCurrentPage } = projectsSlice.actions;

export default projectsSlice.reducer;
