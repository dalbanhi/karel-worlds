import dynamic from "next/dynamic";
import { montserrat } from "@/app/fonts";
import { getCurrentUser } from "@/lib/auth/checkUser";
import { User } from "@prisma/client";
import { Metadata } from "next";

const NewPuzzleLayout = dynamic(
  () => import("@/components/forms/new-puzzle/layout/NewPuzzleLayout"),
  {
    ssr: false,
    loading: () => <div>Loading...</div>, //TO DO: Fix the loading of this page to be more similar to the final result, using shadcn Skeleton?
  }
);

export const metadata: Metadata = {
  title: "New Puzzle ",
  description:
    "A place to make a new Karel Worlds puzzle to share with the broader community.",
};

export default async function NewPuzzlePage() {
  const myCurrentUser: User | null = await getCurrentUser();
  return (
    <NewPuzzleLayout currentUserID={myCurrentUser?.id ?? undefined}>
      {" "}
      <div className="flex w-full justify-center bg-accent">
        <h1
          className={`bg-accent/50 p-2 text-center text-5xl font-bold md:text-2xl ${montserrat.className}`}
        >
          Create a Puzzle
        </h1>
      </div>
      <div className="flex w-full justify-center bg-primary"></div>
    </NewPuzzleLayout>
  );
}
