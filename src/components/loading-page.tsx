import { ScaleLoader } from "react-spinners";
export function LoadingPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-center px-10">
      <ScaleLoader color="#efefef" />
    </div>
  );
}
