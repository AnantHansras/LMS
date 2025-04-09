import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "../slices/ThemeSlice";
import searchReducer from "../slices/Search";
export const store = configureStore({
    reducer: {
        darkMode: themeReducer, 
        lastSearch: searchReducer,
    },
});
