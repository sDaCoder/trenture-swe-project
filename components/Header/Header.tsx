"use client"
import { MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle, Navbar, NavbarButton, NavbarLogo, NavBody, NavItems } from "../ui/resizable-navbar"
import { useState } from "react";
import { ThemeToggle } from "../theme-toggler/theme-toggler";
import Link from "next/link";
import { Home, Plane } from "lucide-react";
import { useRouter } from "next/navigation";

const Header = () => {

    const navItems = [
        {
            name: "Home",
            link: "/",
        },
        {
            name: "Our Plans",
            link: "/plans",
        },
        // {
        //     name: "Contact",
        //     link: "/contact",
        // },
    ];

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const router = useRouter()

    return (
        <>
            <div className="fixed top-[20px] w-full z-20">
                <Navbar>
                    {/* Desktop Navigation */}
                    <NavBody>
                        <NavbarLogo />
                        <NavItems items={navItems} />
                        <div className="relative z-20 flex items-center gap-4">
                            <NavbarButton onClick={() => router.push('/login')} variant="secondary">Login</NavbarButton>
                            <NavbarButton onClick={() => router.push('/signup')} variant="primary">Signup</NavbarButton>
                            <ThemeToggle />
                        </div>
                    </NavBody>

                    {/* Mobile Navigation */}
                    <MobileNav>
                        <MobileNavHeader>
                            <NavbarLogo />
                            <MobileNavToggle
                                isOpen={isMobileMenuOpen}
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            />
                        </MobileNavHeader>

                        <MobileNavMenu
                            isOpen={isMobileMenuOpen}
                            onClose={() => setIsMobileMenuOpen(false)}
                        >
                            {navItems.map((item, idx) => (
                                <Link
                                    key={`mobile-link-${idx}`}
                                    href={item.link}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="relative text-neutral-600 dark:text-neutral-300"
                                >
                                    <span className="block">{item.name}</span>
                                </Link>
                            ))}
                            <div className="flex w-full flex-col gap-4">
                                <NavbarButton
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    variant="primary"
                                    className="w-full"
                                >
                                    Login
                                </NavbarButton>
                                <NavbarButton
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    variant="primary"
                                    className="w-full"
                                >
                                    Signup
                                </NavbarButton>
                                <ThemeToggle />
                            </div>
                        </MobileNavMenu>
                    </MobileNav>
                </Navbar>
            </div>
        </>
    )
}

export default Header