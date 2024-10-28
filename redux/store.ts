import { configureStore } from '@reduxjs/toolkit';
import placeReducer from './features/slice';
import tripReducer from './features/trip-slice';

export const store = configureStore({
  reducer: {
    place: placeReducer,
    trip: tripReducer,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
