import { GlassCard } from '@/components/molecules/GlassCard';
import type { User } from '@/types/user';

interface ProfileWidgetProps {
  user: User;
}

export function ProfileWidget({ user }: ProfileWidgetProps) {
  return (
    <GlassCard>
      <h3>{user.name}</h3>
      <p>{user.email}</p>
    </GlassCard>
  );
}
