import { currentUser } from "@/lib/auth";

export default async function ServerPage() {
  const user = await currentUser();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-5xl font-black">Server Example</h1>
      <pre className="mt-2 rounded-md bg-muted p-4">
        <code className="text-white">{JSON.stringify(user, null, 2)}</code>
      </pre>
    </div>
  );
}
