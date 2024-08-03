import Link from "next/link";
import { Button } from "@/components/ui/button";

export function AuthButtons() {
  return (
    <div className="flex items-center gap-4">
      <Link href="/auth/register">
        <Button variant={"outline"} className="w-32 rounded-full border-2">
          Registrar
        </Button>
      </Link>
      <Link href="/auth/login">
        <Button className="w-32 rounded-full">Entrar</Button>
      </Link>
    </div>
  );
}
