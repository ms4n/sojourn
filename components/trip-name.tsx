'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { DateRange } from 'react-day-picker';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { getRandomPhoto } from '@/lib/controllers/unsplash';
import { PlacePrediction } from '@/types/google-places';
import { Calendar } from '@/components/ui/calendar';

interface TripNameProps {
  destination: PlacePrediction;
  onComplete: (tripName: string, dateRange: DateRange | undefined) => void;
}

export function TripName({ destination, onComplete }: TripNameProps) {
  const [tripName, setTripName] = useState('');
  const [date, setDate] = useState<DateRange | undefined>();
  const [backgroundImage, setBackgroundImage] = useState<{
    imageUrl: string;
    photographer: { name: string; username: string };
  } | null>(null);

  useEffect(() => {
    async function fetchBackgroundImage() {
      try {
        const photo = await getRandomPhoto(
          destination.structured_formatting.main_text
        );
        setBackgroundImage(photo);
      } catch (error) {
        console.error('Error fetching background image:', error);
      }
    }
    fetchBackgroundImage();
  }, [destination]);

  return (
    <div className="relative h-[500px] w-full max-w-3xl overflow-hidden rounded-xl flex flex-col items-center justify-center">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500"
        style={{
          backgroundImage: `url(${backgroundImage?.imageUrl})`,
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center space-y-6 p-8 text-white">
        <h2 className="font-rebond text-4xl">Name your adventure</h2>
        
        <Input
          placeholder="Enter trip name"
          className="max-w-md border-0 bg-white/10 px-4 py-6 text-xl text-white placeholder:text-white/70 backdrop-blur-sm"
          value={tripName}
          onChange={(e) => setTripName(e.target.value)}
        />

        <div className="grid gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                variant="outline"
                className={cn(
                  'w-[300px] justify-start border-0 bg-white/10 text-left font-normal text-white backdrop-blur-sm',
                  !date && 'text-white/70'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date?.from ? (
                  date.to ? (
                    <>
                      {format(date.from, 'LLL dd, y')} -{' '}
                      {format(date.to, 'LLL dd, y')}
                    </>
                  ) : (
                    format(date.from, 'LLL dd, y')
                  )
                ) : (
                  <span>Pick a date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={date?.from}
                selected={date}
                onSelect={setDate}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        <Button
          variant="pressed"
          className="mt-6"
          disabled={!tripName || !date?.from || !date?.to}
          onClick={() => onComplete(tripName, date)}
        >
          Continue
        </Button>

        {/* Photo Credit */}
        {backgroundImage && (
          <div className="absolute bottom-2 right-2 text-xs text-white/70">
            Photo by{' '}
            <a
              href={`https://unsplash.com/@${backgroundImage.photographer.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              {backgroundImage.photographer.name}
            </a>{' '}
            on Unsplash
          </div>
        )}
      </div>
    </div>
  );
}
