import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalsService';

const initialState = {
  goals: [],
  isError: false,
  isSucces: false,
  isLoading: false,
  message: '',
};

export const createGoal = createAsyncThunk(
  'goals/create',
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.createGoal(goalData, token);
    } catch (error) {
      const message =
        (error.response &&
          error.res.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const readGoals = createAsyncThunk('goals/get', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await goalService.readGoals(_, token);
  } catch (error) {
    const message =
      (error.response &&
        error.res.response.data &&
        error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const goalSlice = createSlice({
  name: 'goal',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.goals.push(action.payload);
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(readGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(readGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucces = true;
        state.goals = action.payload;
      })
      .addCase(readGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalSlice.actions;

export default goalSlice.reducer;
