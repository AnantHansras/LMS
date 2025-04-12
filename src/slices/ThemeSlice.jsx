import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
  name: 'theme',
  initialState: {
    theme: localStorage.getItem("theme") || "midnight", 
  },
  reducers: {
    setTheme: (state, action) => {
      const newTheme = action.payload;
      state.theme = newTheme;
      localStorage.setItem("theme", newTheme);
    }
  }
});

export const { setTheme } = themeSlice.actions;
export default themeSlice.reducer;
