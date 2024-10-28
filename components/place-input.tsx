'use client';

import { useDebounce } from '@/hooks/use-debounce';
import { getPlacePredictions } from '@/lib/controllers/google-places';
import { PlacePrediction } from '@/types/google-places';
import { ChevronRight, MapPin } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TypingPlaceholder } from './random/typing-placeholder';
import { PlacesSkeleton } from './skeletons/places-skeleton';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface PlaceInputProps {
  onClick: (place: PlacePrediction) => void;
}

export function PlaceInput({ onClick }: PlaceInputProps) {
  const [destination, setDestination] = useState('');
  const [predictions, setPredictions] = useState<PlacePrediction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPrediction, setSelectedPrediction] =
    useState<PlacePrediction | null>(null);

  const debouncedDestination = useDebounce(destination, 300);

  useEffect(() => {
    async function fetchPredictions() {
      if (!debouncedDestination) {
        setPredictions([]);
        return;
      }

      setIsLoading(true);
      try {
        const results = await getPlacePredictions(debouncedDestination);
        setPredictions(results);
      } catch (error) {
        console.error('Error fetching predictions:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPredictions();
  }, [debouncedDestination]);

  return (
    <div className="flex flex-col items-center space-y-4 px-4 sm:px-0">
      <h1 className="font-rebond text-4xl">where to next, adventurer?</h1>
      <div className="relative w-full">
        <MapPin className="absolute left-3 top-1/2 z-10 h-6 w-6 -translate-y-1/2 text-gray-400" />
        <div className="relative">
          <Input
            placeholder=" "
            className="border-b-2 border-gray-300 px-6 py-8 pl-12 pr-12 font-rebond text-2xl text-accentGray focus:outline-none"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
          />
          {!destination && (
            <div className="pointer-events-none absolute left-12 top-1/2 -translate-y-1/2 text-gray-400">
              <TypingPlaceholder className="font-rebond text-2xl" />
            </div>
          )}
        </div>
        <Button
          variant="pressed"
          disabled={!selectedPrediction}
          className="absolute bottom-0 right-0 top-3 z-10 mx-3 flex items-center justify-center"
          onClick={() => selectedPrediction && onClick(selectedPrediction)}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>

        {predictions.length > 0 ? (
          <div className="absolute mt-3 w-full rounded-md border border-gray-200 bg-white shadow-sm">
            <ul className="max-h-60 overflow-auto py-2">
              {predictions.map((prediction) => (
                <li
                  key={prediction.place_id}
                  className="cursor-pointer px-4 py-2 hover:bg-gray-100"
                  onClick={() => {
                    setDestination(prediction.description);
                    setSelectedPrediction(prediction);
                
                  }}
                >
                  <div className="font-medium">
                    {prediction.structured_formatting.main_text}
                  </div>
                  <div className="text-sm text-gray-500">
                    {prediction.structured_formatting.secondary_text}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : isLoading && (
          <PlacesSkeleton />
        )}
      </div>
    </div>
  );
}

export default PlaceInput;
