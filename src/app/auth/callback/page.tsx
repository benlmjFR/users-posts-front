"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AuthCallbackPage() {
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      router.replace("/");
      return;
    }

    localStorage.setItem("access_token", token);
    router.replace("/profile");
  }, [router, params]);

  return <p>Connexion…</p>;
}
