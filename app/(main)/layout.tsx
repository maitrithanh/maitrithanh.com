import Navbar from "../components/navbar/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto mt-24 max-w-6xl px-4 pb-20 md:px-6">
        {children}
      </main>
    </div>
  );
}
