"use client";

import { GlassCard } from "@/components/molecules/GlassCard";
import { Button } from "@/components/atoms/Button";

export const AuthWidget = () => {
  const handleGoogle = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google`;
  };

  return (
    <GlassCard>
      <Button label="Login with Google" onClick={handleGoogle} />
    </GlassCard>
  );
};
