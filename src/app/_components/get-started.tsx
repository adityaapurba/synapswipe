"use client";
import { signIn } from "next-auth/react";
import { useState } from "react";
import { Button } from "~/components/ui/button";

export function GetStarted() {
  const [processing, setProcessing] = useState(false);
  return (
    <Button
      className={`rounded-full px-10 py-8 text-2xl sm:text-3xl ${processing && "pointer-events-none"}`}
      onClick={async () => {
        setProcessing(true);
        await signIn("google");
        setProcessing(false);
      }}
      variant="outline"
    >
      Get started
    </Button>
  );
}
