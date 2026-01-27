'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/molecules/GlassCard/GlassCard';

export default function ProfilePage() {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (!token) {
      router.replace('/');
      return;
    }
    const id = requestAnimationFrame(() => setAllowed(true));
    return () => cancelAnimationFrame(id);
  }, [router]);

  if (!allowed) {
    return (
      <main style={{ padding: 40, textAlign: 'center' }}>
        <p>Vérification…</p>
      </main>
    );
  }

  return (
    <main style={{ padding: 40 }}>
      <GlassCard>
        <h2>Mon profil</h2>
        <p>Email : user@email.com</p>
      </GlassCard>
    </main>
  );
}
