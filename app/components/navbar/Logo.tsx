'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'

const Logo = () => {
    const router = useRouter()

    return (
        <Image
            onClick={() => router.push('/')}
            alt="Logo"
            className="hidden md:block cursor-pointer w-auto h-[32px] select-none"
            height={100}
            width={100}
            priority
            src="/images/logo.svg"
        />
    )
}

export default Logo