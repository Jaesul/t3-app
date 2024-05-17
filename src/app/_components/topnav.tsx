import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'


export default function TopNav() {
    return (
        <nav className="flex items-center justify-between w-full p-4 font-semibold text-xl border-b justify-between">
            <div>
                Gallery
            </div>
        <SignedOut>
            <SignInButton/>
        </SignedOut>
        <SignedIn>
            <UserButton/>
        </SignedIn>
      </nav>
    )
}