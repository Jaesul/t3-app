import Link from "next/link";

import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { db } from "~/server/db";

export default async function Home() {

  const image = await db.query.image.findMany({
    orderBy: (model, {desc}) => desc(model.id)
  });
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="flex flex-wrap">

        {
          image.map((image) => (
            <div key={image.id} className="w-1/2 p-4 flex flex-col">
                <img src={image.url} alt="image" />
                <div>
                  {image.name}
                </div>
            </div>
          ))
        }
      </div>
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
