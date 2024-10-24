import { Input } from './input';
import { ChevronRight } from 'lucide-react'; // Importing from Lucide

interface QuestionButtonProps {
  onClick: () => void;
}

export function QuestionButton({ onClick }: QuestionButtonProps) {
  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="font-rebond text-4xl">where to next, adventurer?</h1>
      <div className="relative w-full max-w-md">
        <Input
          placeholder="london"
          className="font-rebond border-b-2 border-gray-300 px-6 py-4 text-2xl focus:outline-none pr-12"
        />
        <button
          onClick={onClick}
          className="absolute right-0 top-0 h-full px-3 flex items-center justify-center text-primary hover:text-primary-dark"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
