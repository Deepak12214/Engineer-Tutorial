import { configureStore, createSlice } from '@reduxjs/toolkit';

// Course slice for managing course state
const courseSlice = createSlice({
  name: 'course',
  initialState: {
    currentCourse: null,
    currentTopic: null,
    progress: {},
  },
  reducers: {
    setCurrentCourse: (state, action) => {
      state.currentCourse = action.payload;
    },
    setCurrentTopic: (state, action) => {
      state.currentTopic = action.payload;
    },
    updateProgress: (state, action) => {
      const { courseId, topicId } = action.payload;
      if (!state.progress[courseId]) {
        state.progress[courseId] = [];
      }
      if (!state.progress[courseId].includes(topicId)) {
        state.progress[courseId].push(topicId);
      }
    },
  },
});

export const { setCurrentCourse, setCurrentTopic, updateProgress } = courseSlice.actions;

export const store = configureStore({
  reducer: {
    course: courseSlice.reducer,
  },
});

export default store;