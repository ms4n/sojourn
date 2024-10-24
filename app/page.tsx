'use client';

import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronLeft, ChevronRight, Loader } from 'lucide-react';
const Home = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 text-4xl font-rebond font-bold">
      <p className="font-rebond font-normal">
        Look, if you had one shot, or one opportunity
      </p>
      <p className="font-rebond font-medium">
        To seize everything you ever wanted, in one moment
      </p>
      <p className="font-rebond font-semibold">
        Would you capture it, or just let it slip?
      </p>
      <p className="font-rebond font-bold">
        His palms are sweaty, knees weak, arms are heavy
      </p>
      <p className="font-rebond font-extrabold">
        There&apos;s vomit on his sweater already, mom&apos;s spaghetti
      </p>
      <Button variant="pressed">
        generate
        <ChevronRight />
      </Button>

      <Button className="h-16 w-16 flex items-center justify-center" variant="pressedDark">
        <ChevronRight size={48} />
      </Button>
    </div>
  );
};

export default Home;
