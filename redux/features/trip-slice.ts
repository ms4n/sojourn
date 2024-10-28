import { PlacePrediction } from '@/types/google-places';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TripDetails {
  name: string;
  startDate: Date | null;
  endDate: Date | null;
}

interface TripState {
  details: TripDetails;
}

const initialState: TripState = {
  details: {
    name: '',
    startDate: null,
    endDate: null,
  },
};

export const tripSlice = createSlice({
  name: 'trip',
  initialState,
  reducers: {
    setTripDetails: (
      state,
      action: PayloadAction<{
        name: string;
        startDate: Date | null;
        endDate: Date | null;
      }>
    ) => {
      state.details = action.payload;
    },
  },
});

export const { setTripDetails } = tripSlice.actions;
export default tripSlice.reducer;
