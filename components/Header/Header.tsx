"use client"
import { MobileNav, MobileNavHeader, MobileNavMenu, MobileNavToggle, Navbar, NavbarButton, NavbarLogo, NavBody, NavItems } from "../ui/resizable-navbar"
import { useEffect, useState } from "react";
import { ThemeToggle } from "../theme-toggler/theme-toggler";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

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
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getUserInfo = async () => {
            try {
                const res = await axios.get('/api/users/profile')
                setUser(res.data)
            } catch (error: any) {
                console.log(error);
            }
        }
        getUserInfo()
    }, [])

    const handleUserLogout = async () => {
        try {
            const res = await axios.get('/api/users/logout')
            setUser(null)
            toast.success(res.data.message)
            router.push('/login')
        } catch (error: any) {
            toast.error("Error in logging out")
        }
    }

    return (
        <>
            <div className="fixed top-[20px] w-full z-20">
                <Navbar>
                    {/* Desktop Navigation */}
                    <NavBody>
                        <NavbarLogo />
                        <NavItems items={navItems} />
                        <div className="relative z-20 flex items-center gap-4">
                            {!user ? (
                                <>
                                    <NavbarButton onClick={() => router.push('/login')} variant="secondary">Login</NavbarButton>
                                    <NavbarButton onClick={() => router.push('/signup')} variant="primary">Signup</NavbarButton>
                                </>
                            ) : (
                                <>  
                                    <NavbarButton onClick={() => handleUserLogout()} variant="primary">Logout</NavbarButton>
                                    <Avatar className="w-8 h-8 border-2 border-primary cursor-pointer">
                                        <AvatarImage src="https://i.pravatar.cc/300" />
                                        <AvatarFallback>US</AvatarFallback>
                                    </Avatar>
                                </>
                            )}
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
                                {!user ? (
                                    <>
                                        <NavbarButton
                                            onClick={() => router.push('/login')}
                                            variant="primary"
                                            className="w-full"
                                        >
                                            Login
                                        </NavbarButton>
                                        <NavbarButton
                                            onClick={() => router.push('/signup')}
                                            variant="primary"
                                            className="w-full"
                                        >
                                            Signup
                                        </NavbarButton>
                                    </>
                                ) : (
                                    <>
                                        <NavbarButton
                                            onClick={() => handleUserLogout()}
                                            variant="primary"
                                            className="w-full"
                                        >
                                            Logout
                                        </NavbarButton>
                                        <Avatar className="w-8 h-8 border-2 border-primary cursor-pointer">
                                            <AvatarImage src="https://i.pravatar.cc/300" />
                                            <AvatarFallback>US</AvatarFallback>
                                        </Avatar>
                                    </>
                                )}
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