"use client";

import { Button } from "@/components/atoms/Button";
import { useAuth } from "@/hooks/useAuth";
import { usePathname, useRouter } from "next/navigation";

export function AuthButton() {
  const auth = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  if (auth.isAuthenticated === null) return null;

  if (auth.isAuthenticated) {
    return (
      <>
        {pathname !== "/profile" && (
          <Button label="Profil" onClick={() => router.push("/profile")} />
        )}
        <Button label="Logout" onClick={auth.logout} />
      </>
    );
  }

  return (
    <Button
      label="Login"
      onClick={() =>
        (window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`)
      }
    />
  );
}
