"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import { ScaleLoader } from "react-spinners";

import { newVerification } from "@/actions/new-verification";

import { Card, CardContent, CardTitle } from "@/components/ui/card";

import { CircleCheckIcon, TriangleAlert } from "lucide-react";

export default function NewVerificationPage() {
  const [message, setMessage] = useState<
    | {
        type: "error" | "success";
        text: string;
      }
    | undefined
  >(undefined);
  const [loading, setLoading] = useState(false);
  const hasSubmitted = useRef(false);
  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    setMessage(undefined);
    setLoading(true);

    if (!token) {
      setMessage({ type: "error", text: "Missing token!" });
      setLoading(false);
      return;
    }

    newVerification(token)
      .then((response) => {
        if (response.error) {
          setMessage({ type: "error", text: response.error });
        } else if (response.success) {
          setMessage({ type: "success", text: response.success });
        }
      })
      .catch((error) => {
        console.error("Error verifying email", error);
        setMessage({
          type: "error",
          text: "An error occurred while verifying your email.",
        });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token]);

  useEffect(() => {
    if (!hasSubmitted.current) {
      onSubmit();
      hasSubmitted.current = true;
    }
  }, [onSubmit]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-3 text-primary-foreground p-4">
      <Card className="mx-auto max-w-md w-[500px]">
        <CardContent className="flex flex-col items-center justify-center gap-6 py-8">
          {loading ? (
            <div className="flex items-center justify-center gap-6 flex-col">
              <p className="text-primary/50">Confirming your verification</p>
              <ScaleLoader color="#ffffff" height={20} />
            </div>
          ) : (
            <>
              {message?.type === "success" && (
                <>
                  <CircleCheckIcon className="text-green-500 size-12" />
                  <div className="space-y-3 text-center">
                    <CardTitle className="text-2xl font-bold">
                      {message.text}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Congratulations! You have successfully verified your email
                      address. Now you can login to the website.
                    </p>
                    <div>
                      <Link
                        href="/auth/login"
                        className="underline underline-offset-2 font-semibold "
                      >
                        Back to login
                      </Link>
                    </div>
                  </div>
                </>
              )}
              {message?.type === "error" && (
                <>
                  <TriangleAlert className="text-red-500 size-12" />
                  <div className="space-y-3 text-center">
                    <CardTitle className="text-2xl font-bold">
                      {message.text}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      Sorry, something went wrong while verifying your email.
                      Please try again later.
                    </p>
                    <div>
                      <Link
                        href="/"
                        className="underline underline-offset-2 font-semibold "
                      >
                        Back to site
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
