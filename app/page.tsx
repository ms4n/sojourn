'use client';

import { PlaceInput } from '@/components/place-input';
import { TripName } from '@/components/trip-name';
import { setDestination } from '@/redux/features/slice';
import { setTripDetails } from '@/redux/features/trip-slice';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { PlacePrediction } from '@/types/google-places';
import { DateRange } from 'react-day-picker';

export default function Home() {
  const dispatch = useAppDispatch();
  const destination = useAppSelector((state) => state.place.destination);

  const handlePlaceSelect = (place: PlacePrediction) => {
    dispatch(setDestination(place));
  };

  const handleTripDetails = (tripName: string, dateRange: DateRange | undefined) => {
    if (dateRange) {
      dispatch(
        setTripDetails({
          name: tripName,
          startDate: dateRange.from || null,
          endDate: dateRange.to || null,
        })
      );
    }
  };

  return (
    <main className="flex min-h-full flex-col items-center justify-center p-4">
      {!destination ? (
        <PlaceInput onClick={handlePlaceSelect} />
      ) : (
        <TripName destination={destination} onComplete={handleTripDetails} />
      )}
    </main>
  );
}
