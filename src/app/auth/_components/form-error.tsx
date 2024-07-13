import { TriangleAlert } from "lucide-react";

interface FormErrorProps {
  message?: string;
}

export function FormError({ message }: FormErrorProps) {
  if (!message) {
    return;
  }

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-destructive/15 text-destructive relative">
      <div className="absolute inset-0 w-1 h-full bg-destructive" />
      <TriangleAlert />
      <p className="font-medium">{message}</p>
    </div>
  );
}
