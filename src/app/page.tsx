import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { db } from "~/server/db";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import { getMyImages } from "~/server/queries";
import Image from "next/image";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await getMyImages();

  return (
    <div className="flex flex-wrap gap-4">

      {
        images.map((image) => (
          <div key={image.id} className="w-48 h-48 flex flex-col">
            <Image src={image.url} alt={image.name} style={{objectFit: "contain"}} width={192} height={192}/>
            <div>
              {image.name}
            </div>
          </div>
        ))
      }
    </div>
  )
}

export default async function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <SignedOut>
        <div className="w-full h-full text-2xl text-center">
          Please sign in above
        </div>
      </SignedOut>
      <SignedIn>
        <Images/>
      </SignedIn>
    </main>
  );
}

async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;

  const latestPost = await api.post.getLatest();

  return (
    <div className="w-full max-w-xs">
      {latestPost ? (
        <p className="truncate">Your most recent post: {latestPost.name}</p>
      ) : (
        <p>You have no posts yet.</p>
      )}

      <CreatePost />
    </div>
  );
}
