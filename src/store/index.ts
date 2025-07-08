import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './TaskSlice';

export const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
  // Не удаляй getDefaultMiddleware!
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // если используешь Date
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
