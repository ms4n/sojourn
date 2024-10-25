'use client';

import PlaceInput from '@/components/placeInput';
import { PlacePrediction } from '@/types/google-places';

export default function Home() {
  const handlePlaceSelect = (place: PlacePrediction) => {
    console.log('Selected place:', place);
    // Handle the selected place here
  };

  return (
    <main className="flex min-h-full flex-col items-center justify-center">
      <PlaceInput onClick={handlePlaceSelect} />
    </main>
  );
}
