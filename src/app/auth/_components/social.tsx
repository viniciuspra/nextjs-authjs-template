import Image from "next/image";
import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";

export function Social() {
  const onClick = (provider: "google" | "facebook") => {
    signIn(provider, {
      callbackUrl: DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center gap-3">
      <Button
        type="button"
        onClick={() => onClick("google")}
        className="w-full h-10 focus-visible:ring-black border font-bold border-secondary/20 hover:bg-zinc-100 transition duration-150"
      >
        <Image
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          width={24}
          height={24}
          loading="lazy"
          alt="google logo"
        />
      </Button>
      <Button
        type="button"
        onClick={() => onClick("facebook")}
        className="w-full h-10 focus-visible:ring-black border font-bold border-secondary/20 hover:bg-zinc-100 transition duration-150"
      >
        <Image
          src="https://www.svgrepo.com/show/448224/facebook.svg"
          width={28}
          height={28}
          loading="lazy"
          alt="google logo"
        />
      </Button>
    </div>
  );
}
