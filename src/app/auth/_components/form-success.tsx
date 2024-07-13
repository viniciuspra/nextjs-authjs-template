import { CircleCheck } from "lucide-react";

interface FormSuccessProps {
  message?: string;
}

export function FormSuccess({ message }: FormSuccessProps) {
  if (!message) {
    return;
  }

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-emerald-600/15 text-emerald-600 relative">
      <div className="absolute inset-0 w-1 h-full bg-emerald-600" />
      <CircleCheck />
      <p className="font-medium">{message}</p>
    </div>
  );
}
