import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'lastSearch',
  initialState: {
    lastSearch: localStorage.getItem("lastSearch") || '',
  },
  reducers: {
    setLastSearch: (state, action) => {
      state.lastSearch = action.payload;
      localStorage.setItem("lastSearch", action.payload);
    }
  }
});

export const { setLastSearch } = searchSlice.actions;
export default searchSlice.reducer;
