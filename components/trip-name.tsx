'use client';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { getRandomPhoto } from '@/lib/controllers/unsplash';
import { PlacePrediction } from '@/types/google-places';
import { format } from 'date-fns';
import {
  ArrowRight,
  CalendarIcon,
  ChevronRight,
  RefreshCcw,
} from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { DateRange } from 'react-day-picker';

interface TripNameProps {
  destination: PlacePrediction;
  onComplete: (tripName: string, dateRange: DateRange | undefined) => void;
}

export default function TripName({ destination, onComplete }: TripNameProps) {
  const [tripName, setTripName] = useState(
    destination.structured_formatting.main_text
  );
  const [date, setDate] = useState<DateRange | undefined>();
  const [backgroundImage, setBackgroundImage] = useState<{
    imageUrl: string;
    photographer: { name: string; username: string };
  } | null>(null);
  const [isImageLoading, setIsImageLoading] = useState(false);

  async function fetchBackgroundImage() {
    setIsImageLoading(true);
    try {
      const photo = await getRandomPhoto(
        `${destination.structured_formatting.main_text} travel destination`
      );
      setBackgroundImage(photo);
    } catch (error) {
      console.error('Error fetching background image:', error);
    } finally {
      setIsImageLoading(false);
    }
  }

  useEffect(() => {
    fetchBackgroundImage();
  }, [destination]);

  return (
    <div className="container relative mx-auto flex min-h-[100svh] items-center justify-center px-1 py-4 sm:px-4 md:min-h-[100dvh] md:py-0">
      <div className="flex w-full max-w-screen-lg flex-col gap-4 sm:gap-8 lg:gap-12">
        <div className="flex w-full flex-col-reverse gap-4 lg:flex-row lg:gap-8">
          {/* Left Column - Form */}
          <div className="w-full lg:w-[40%]">
            <div className="flex h-full flex-col">
              {/* Input Fields Container */}
              <div className="space-y-4 sm:space-y-6">
                <div className="space-y-2 sm:space-y-3">
                  <h2 className="font-rebond text-xl">name your adventure</h2>
                  <div className="relative">
                    <Input
                      placeholder={destination.structured_formatting.main_text}
                      value={tripName}
                      onChange={(e) => setTripName(e.target.value)}
                      className="border-0 border-b-2 border-gray-200 px-4 py-6 font-rebond text-xl text-gray-700 shadow-none transition-colors focus:border-gray-400 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Date Picker */}
                <div className="space-y-2 sm:space-y-3">
                  <h2 className="font-rebond text-xl">
                    when are you traveling?
                  </h2>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={`h-[60px] w-full justify-start border-0 border-b-2 border-gray-200 px-4 font-rebond text-lg shadow-none transition-colors hover:bg-gray-50/50 ${
                          !date ? 'text-gray-400' : 'text-gray-700'
                        }`}
                      >
                        <CalendarIcon className="mr-3 h-5 w-5 text-gray-400" />
                        {date?.from ? (
                          date.to ? (
                            <>
                              {format(date.from, 'MMM d')} -{' '}
                              {format(date.to, 'MMM d, yyyy')}
                            </>
                          ) : (
                            format(date.from, 'MMMM d, yyyy')
                          )
                        ) : (
                          <span>select your travel dates</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="max-h-[95vh] w-auto overflow-auto p-0 sm:max-h-none"
                      align="start"
                      sideOffset={8}
                    >
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={1}
                        className="font-rebond sm:hidden"
                      />
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                        className="hidden font-rebond sm:block"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          </div>

          <div className="relative w-full overflow-hidden rounded-xl lg:w-[60%]">
            <div className="aspect-[4/3] lg:aspect-[16/9]">
              {backgroundImage?.imageUrl ? (
                <>
                  <Image
                    src={backgroundImage.imageUrl}
                    alt={`Photo of ${destination.structured_formatting.main_text}`}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  <button
                    onClick={fetchBackgroundImage}
                    disabled={isImageLoading}
                    className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/20 text-white/90 backdrop-blur-sm transition-all hover:bg-white/20 disabled:cursor-not-allowed"
                    title="Get new image"
                  >
                    <RefreshCcw
                      className={`h-4 w-4 ${isImageLoading ? 'animate-spin' : ''}`}
                    />
                  </button>

                  <div className="absolute bottom-0 left-0 right-0 px-5 py-4">
                    <h3 className="font-playfair text-3xl font-medium text-white md:text-3xl">
                      {tripName || 'your next adventure'}
                    </h3>
                    {date?.from && (
                      <p className="mt-1 font-rebond text-white/90 md:text-lg">
                        {date.to ? (
                          <>
                            {format(date.from, 'MMM d')} -{' '}
                            {format(date.to, 'MMM d, yyyy')}
                          </>
                        ) : (
                          format(date.from, 'MMMM d, yyyy')
                        )}
                      </p>
                    )}
                  </div>
                </>
              ) : (
                <div className="h-full w-full animate-pulse rounded-xl bg-gray-200" />
              )}
            </div>
          </div>
        </div>

        <Button
          variant="pressed"
          className="h-14 w-full text-lg font-medium lg:ml-auto lg:w-auto"
          onClick={() => onComplete(tripName, date)}
          disabled={!tripName || !date}
        >
          <span className="flex items-center gap-2">
            start planning
            <ChevronRight className="mt-1 h-5 w-5" strokeWidth={2.5} />
          </span>
        </Button>
      </div>
    </div>
  );
}
