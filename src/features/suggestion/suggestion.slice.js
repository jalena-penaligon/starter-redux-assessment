import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchSuggestion =
  createAsyncThunk(
    'suggestion/fetchSuggestion',
    async (arg, thunkAPI) => {
      const response = await fetch('http://localhost:3004/api/suggestion');
      const data = await response.json();
      console.log('data, ', data);
      return data;
    }
  );

  const initialState = {
    suggestion: '',
    loading: false,
    error: false, 
  };
  
const options = {
  name: 'suggestion',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchSuggestion.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [fetchSuggestion.fulfilled]: (state, { payload: { imageUrl, caption } }) => {
      state.suggestion = { imageUrl, caption };
      state.loading = false;
      state.error = false;
    },
    [fetchSuggestion.rejected]: (state, action) => {
      state.loading = false;
      state.error = true;
    },
  },
};

const suggestionSlice = createSlice(options);

export default suggestionSlice.reducer;

export const selectSuggestion = (state) => state.suggestion.suggestion;
export const selectLoading = (state) => state.suggestion.loading;
export const selectError = (state) => state.suggestion.error;