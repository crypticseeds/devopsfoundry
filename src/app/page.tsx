import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { BlogPreview } from "@/components/BlogPreview";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased selection:bg-accent-blue/20 selection:text-accent-blue">
      <Header />
      <main className="flex-1">
        <Hero />
        <Skills />
        <Projects />
        <BlogPreview />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
