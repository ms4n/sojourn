import { PlacePrediction } from '@/types/google-places';
import { createSlice } from '@reduxjs/toolkit';

type PlaceState = {
  destination: PlacePrediction | null;
};

const initialState: PlaceState = {
  destination: null,
};

export const placeSlice = createSlice({
  name: 'place',
  initialState,
  reducers: {
    setDestination: (state, action) => {
      state.destination = action.payload;
    },
  },
});

export const { setDestination } = placeSlice.actions;
export default placeSlice.reducer;


//example slice

// type PhoneNumberState = {
//   countryCode: string;
//   phoneNumber: string;
// };

// const initialState: PhoneNumberState = {
//   countryCode: "+91",
//   phoneNumber: "",
// };

// export const phoneNumberSlice = createSlice({
//   name: "phoneNumber",
//   initialState,
//   reducers: {
//     setPhoneNumber: (state, action) => {
//       state.phoneNumber = action.payload;
//     },

//     setCountryCode: (state, action) => {
//       state.countryCode = action.payload;
//     },
//   },
// });

// export const { setPhoneNumber, setCountryCode } = phoneNumberSlice.actions;
// export default phoneNumberSlice.reducer;
