import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../slices/ThemeSlice";
import searchReducer from "../slices/Search"; // <-- Add this line

export const store = configureStore({
    reducer: {
        darkMode: themeReducer, 
        lastSearch: searchReducer,
    },
});
