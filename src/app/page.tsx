import { getServerAuthSession } from "~/server/auth";
import { HydrateClient } from "~/trpc/server";
import { GetStarted } from "./_components/get-started";
import { redirect } from "next/navigation";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });
  // void api.post.getLatest.prefetch();
  const session = await getServerAuthSession();
  if (session) redirect("/dashboard");

  return (
    <HydrateClient>
      <main className="flex min-h-screen">
        <div className="container flex flex-col items-center justify-center gap-12">
          <h1 className="select-none text-4xl font-extrabold tracking-tight sm:text-7xl">
            <span className="text-highlight">Synap</span> Swipe
          </h1>
          <h2 className="select-none text-xl font-extrabold tracking-tight sm:text-4xl">
            Swipe Compile and Memorize
          </h2>
          <GetStarted />
        </div>
      </main>
    </HydrateClient>
  );
}
