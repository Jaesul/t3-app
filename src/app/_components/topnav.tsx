"use client"
import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { UploadButton } from '~/utils/uploadthing'


export default function TopNav() {
    const router = useRouter();
    return (
        <nav className="flex items-center justify-between w-full p-4 font-semibold text-xl border-b justify-between">
            <div>
                Gallery
            </div>
            <div className='flex flex-row'>
                <SignedOut>
                    <SignInButton />
                </SignedOut>
                <SignedIn>
                    <UploadButton endpoint='imageUploader' onClientUploadComplete={() => { router.refresh();}}/>
                    <UserButton />
                </SignedIn>
            </div>
        </nav>
    )
}