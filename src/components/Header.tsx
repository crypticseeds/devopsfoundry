"use client"

import * as React from "react"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Menu, Moon, Sun, X } from "lucide-react"

export function Header() {
    const [isScrolled, setIsScrolled] = React.useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
    const { theme, setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20)
        }
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Projects", href: "/projects" },
        { name: "Blog", href: "/blog" },
        { name: "Documentation", href: "/documentation" },
        { name: "Contact", href: "#contact" },
    ]

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 mx-auto transition-all duration-300 ease-in-out ${isScrolled ? "top-4 w-[90%] md:w-[80%] max-w-5xl" : "w-full max-w-7xl px-6"
                    }`}
            >
                <div
                    className={`relative flex items-center justify-between transition-all duration-300 ${isScrolled
                        ? "h-14 rounded-full border border-white/10 bg-background/80 px-6 shadow-lg backdrop-blur-md dark:border-white/5"
                        : "h-20 bg-transparent px-0 border-transparent"
                        }`}
                >
                    {/* Logo Area */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="relative h-8 w-auto">
                            {mounted && (resolvedTheme === "dark" ? (
                                <img
                                    src="/logo-dark.png"
                                    alt="DevOps Foundry"
                                    className="h-8 w-auto"
                                />
                            ) : (
                                <img
                                    src="/logo-light.png"
                                    alt="DevOps Foundry"
                                    className="h-8 w-auto"
                                />
                            ))}
                            {!mounted && (
                                <div className="h-8 w-8 bg-transparent" />
                            )}
                        </div>
                        <div className={`flex flex-col justify-center transition-all duration-300 ${isScrolled ? "scale-95 origin-left" : "scale-100"}`}>
                            <span className="text-sm font-medium text-foreground border-l border-foreground/20 pl-3 ml-3">
                                Femi Akinlotan
                            </span>
                        </div>
                    </Link>

                    {/* Desktop Nav */}
                    <nav className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="text-sm font-medium text-foreground transition-colors hover:text-accent-blue"
                            >
                                {link.name}
                            </Link>
                        ))}

                        {/* Theme Toggle */}
                        <button
                            onClick={toggleTheme}
                            className="flex h-8 w-8 items-center justify-center rounded-full bg-foreground/10 text-foreground transition-colors hover:bg-accent-blue/20 hover:text-accent-blue"
                            aria-label="Toggle theme"
                        >
                            {mounted ? (
                                theme === "dark" ? (
                                    <Sun className="h-4 w-4" />
                                ) : (
                                    <Moon className="h-4 w-4" />
                                )
                            ) : (
                                <div className="h-4 w-4" />
                            )}
                        </button>
                    </nav>

                    {/* Mobile Menu Button */}
                    <button
                        className="flex md:hidden h-10 w-10 items-center justify-center rounded-full text-foreground"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu className="h-6 w-6" />
                    </button>
                </div>
            </header>

            {/* Mobile Drawer */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 z-[60] md:hidden">
                    {/* Overlay */}
                    <div
                        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                        onClick={() => setIsMobileMenuOpen(false)}
                    />

                    {/* Drawer */}
                    <div className="absolute right-0 top-0 h-full w-3/4 max-w-xs bg-background p-6 shadow-2xl transition-transform duration-300 ease-out">
                        <div className="flex items-center justify-between mb-8">
                            <span className="font-bold text-lg">Menu</span>
                            <button
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="p-2 text-secondary hover:text-foreground"
                            >
                                <X className="h-6 w-6" />
                            </button>
                        </div>

                        <nav className="flex flex-col gap-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium text-foreground hover:text-accent-blue"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <div className="border-t border-white/10 pt-6 mt-2">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-foreground">Theme</span>
                                    <button
                                        onClick={toggleTheme}
                                        className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground/10 text-foreground transition-colors hover:bg-accent-blue/20 hover:text-accent-blue"
                                    >
                                        {mounted ? (
                                            theme === "dark" ? (
                                                <Sun className="h-5 w-5" />
                                            ) : (
                                                <Moon className="h-5 w-5" />
                                            )
                                        ) : (
                                            <div className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            )}
        </>
    )
}
