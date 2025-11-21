import Link from "next/link"
import { ArrowRight, Download, Mail, MapPin } from "lucide-react"
import { hero } from "@/data/content"

export function Hero() {
    return (
        <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden pt-20 md:pt-0">
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-6 md:grid-cols-2 md:items-center">

                {/* Text Content */}
                <div className="flex flex-col gap-6 text-center md:text-left">
                    <div className="flex flex-col gap-4 md:items-start">
                        <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-1.5 text-sm font-medium text-secondary self-center md:self-auto">
                            <MapPin className="h-4 w-4" />
                            <span>{hero.location}</span>
                        </div>
                        <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">
                            {hero.title.first} <br className="hidden md:block" />
                            {hero.title.second}
                        </h1>
                    </div>

                    <p className="text-lg leading-relaxed text-secondary md:text-xl">
                        {hero.description}
                    </p>

                    <div className="flex w-full max-w-md flex-col gap-6 sm:flex-row sm:justify-center md:justify-between">
                        <Link
                            href={hero.buttons.resume.url}
                            target="_blank"
                            className="group flex items-center justify-center gap-2 rounded-full border border-secondary/20 bg-transparent px-8 py-3.5 text-sm font-bold text-foreground shadow-sm transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background hover:scale-105 active:scale-95"
                        >
                            <Download className="h-4 w-4" />
                            {hero.buttons.resume.text}
                        </Link>
                        <Link
                            href={hero.buttons.projects.url}
                            className="group flex items-center justify-center gap-2 rounded-full border border-secondary/20 bg-transparent px-8 py-3.5 text-sm font-bold text-foreground shadow-sm transition-all duration-300 hover:border-foreground hover:bg-foreground hover:text-background hover:scale-105 active:scale-95"
                        >
                            {hero.buttons.projects.text}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>
                    </div>
                </div>

                {/* Image/Illustration Area */}
                <div className="relative mx-auto aspect-square w-full max-w-md overflow-hidden rounded-2xl bg-secondary/5 md:ml-auto">
                    <div className="absolute inset-0 flex items-center justify-center text-secondary/20">
                        {/* Placeholder for Portrait/Illustration */}
                        <div className="flex flex-col items-center gap-4">
                            <div className="h-32 w-32 rounded-full bg-secondary/10 animate-pulse" />
                            <span className="text-sm font-medium">Portrait Placeholder</span>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute -right-12 -top-12 h-64 w-64 rounded-full bg-accent-blue/5 blur-3xl" />
                    <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-accent-red/5 blur-3xl" />
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 animate-bounce md:block">
                <div className="h-10 w-6 rounded-full border-2 border-secondary/30 p-1">
                    <div className="h-2 w-full rounded-full bg-secondary/50" />
                </div>
            </div>
        </section>
    )
}
