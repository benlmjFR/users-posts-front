import { Button } from '@/components/atoms/Button';
import { GlassCard } from '@/components/molecules/GlassCard';

export function AuthWidget() {
  return (
    <GlassCard>
      <h3>Connexion</h3>
      <Button variant="primary">Se connecter</Button>
    </GlassCard>
  );
}
