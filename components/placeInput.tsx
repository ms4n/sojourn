import { ChevronRight, MapPin } from 'lucide-react';
import { useState } from 'react';
import { TypingPlaceholder } from './random/typing-placeholder';
import { Button } from './ui/button';
import { Input } from './ui/input';

interface PlaceInputProps {
  onClick: () => void;
}

export function PlaceInput({ onClick }: PlaceInputProps) {
  const [destination, setDestination] = useState('');

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="font-rebond text-4xl">where to next, adventurer?</h1>
      <div className="relative w-full max-w-md">
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
          className="absolute bottom-0 right-0 top-3 z-10 mx-3 flex items-center justify-center"
          onClick={onClick}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}

export default PlaceInput;
