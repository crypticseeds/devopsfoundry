import { Header } from "@/components/Header";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased selection:bg-accent-blue/20 selection:text-accent-blue">
      <Header />
      <main className="flex-1">
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
