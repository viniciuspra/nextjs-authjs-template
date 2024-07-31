import Link from "next/link";

import { Button } from "@/components/ui/button";

export default function Unauthorized() {
  return (
    <section>
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <p className="mb-4 text-3xl tracking-tight font-bold md:text-4xl text-white">
            Access Denied
          </p>
          <p className="mb-4 text-lg font-light text-gray-400">
            Sorry, you don’t have permission to access this content.
          </p>
        </div>
      </div>
    </section>
  );
}
