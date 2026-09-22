import Navbar from "../components/navbar/Navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main className="mx-auto mt-14 max-w-3xl px-5 pb-20 pt-10 md:mt-16 md:px-6 md:pt-14">
        {children}
      </main>
    </div>
  );
}
