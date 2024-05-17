import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const mockPics = [
  "https://utfs.io/f/569ae1fb-f1e7-488b-8325-c5262a2e53cf-g8cswf.png",
  "https://utfs.io/f/d4352db6-0c6f-40e7-88fc-119e6df31b25-5564w7.png",
  "https://utfs.io/f/3d9ceb97-b872-4750-8a47-33eedeb0450b-bdnq5s.png",
  "https://utfs.io/f/082dc637-f7c8-4950-b4e3-0490dd200451-556482.png"
]

export default async function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      hello team
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
