import { TriangleAlert } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) {
    return;
  }

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-red-600/10 text-red-600 relative">
      <div className="absolute inset-0 w-1 h-full bg-red-600" />
      <div>
        <TriangleAlert />
      </div>
      <p className="font-medium">{message}</p>
    </div>
  );
}
