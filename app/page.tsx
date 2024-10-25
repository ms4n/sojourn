'use client';

import PlaceInput from '../components/placeInput';

export default function Page() {
  const handleButtonClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className="flex h-full w-full items-center justify-center px-4">
      <div className="mx-auto w-full max-w-screen-lg">
        <PlaceInput onClick={handleButtonClick} />
      </div>
    </div>
  );
}
