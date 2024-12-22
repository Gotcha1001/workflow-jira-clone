import { SignedIn, SignedOut, SignInButton } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { Button } from './ui/button'
import { PenBox } from 'lucide-react'
import UserMenu from './user-menu'
import MotionWrapperDelay from './animations/MotionWrapperDelay'
import { checkUser } from '@/lib/checkUser'
import UserLoading from './user-loading'

const Header = async () => {
    await checkUser()
    return (

        <MotionWrapperDelay
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            variants={{
                hidden: { opacity: 0, x: -100 },
                visible: { opacity: 1, x: 0 },
            }}
        >
            <header className=" mx-auto gradient-background2">
                <nav className="py-6 px-4 flex justify-between items-center">
                    <Link href={"/"}>
                        <Image
                            src={"/logo.png"}
                            alt="Logo"
                            width={80}
                            height={120}
                            className="h-20 w-auto object-contain horizontal-rotate"
                        />
                    </Link>

                    <div className="flex items-center gap-4">
                        <Link href="/project/create">
                            <Button variant="work1" className="flex items-center gap-2 hover:text-indigo-700">
                                <PenBox size={18} />
                                <span>Create Project</span>
                            </Button>
                        </Link>
                        {/* Login and other things */}
                        <SignedOut>
                            <SignInButton forceRedirectUrl='onboarding'>
                                <Button variant="outline1">Login</Button>
                            </SignInButton>
                        </SignedOut>

                        <SignedIn>
                            <UserMenu />
                        </SignedIn>
                    </div>
                </nav>
                <UserLoading />
            </header>
        </MotionWrapperDelay>
    )
}

export default Header