import { createSlice } from "@reduxjs/toolkit";

const initialTheme = localStorage.getItem("theme")
  || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: initialTheme
  },
  reducers: {
    toggleTheme: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      localStorage.setItem("theme", state.mode);
    },
    setTheme: (state, action) => {
      state.mode = action.payload;
      localStorage.setItem("theme", action.payload);
    }
  }
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
