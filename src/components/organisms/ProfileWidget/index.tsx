import { GlassCard } from "@/components/molecules/GlassCard";
import type { User } from "@/types/user";

interface ProfileWidgetProps {
  user: User;
}

export function ProfileWidget({ user }: ProfileWidgetProps) {
  return (
    <GlassCard>
      <h3>name: {user.name?.length ? user.name : "-"}</h3>
      <p>email: {user.email}</p>
      <p>role: {user.role}</p>
    </GlassCard>
  );
}
