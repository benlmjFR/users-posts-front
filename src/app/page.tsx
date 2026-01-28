import { AuthWidget } from "@/components/organisms/AuthWidget/AuthWidget";

export default function Home() {
  return (
    <main style={{ display: "grid", placeItems: "center", height: "100vh" }}>
      <AuthWidget />
    </main>
  );
}
