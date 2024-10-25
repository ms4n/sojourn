'use client';

import PlaceInput from '@/components/placeInput';
import { PlacePrediction } from '@/types/google-places';

export default function Home() {
  const handlePlaceSelect = (place: PlacePrediction) => {
    console.log('Selected place:', place);
    // Handle the selected place here
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <PlaceInput onClick={handlePlaceSelect} />
    </main>
  );
}
