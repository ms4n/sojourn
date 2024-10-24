'use client';

import { QuestionButton } from '../components/ui/question-button';

export default function Page() {
  const handleButtonClick = () => {
    console.log('Button clicked!');
  };

  return (
    <div className="h-[calc(100vh-100px)] max-w-screen-lg flex items-center justify-center">
      <main className="container mx-auto font-rebond ">
        <QuestionButton onClick={handleButtonClick} />
      </main>
    </div>
  );
}
