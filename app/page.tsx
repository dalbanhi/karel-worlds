import { getCurrentUser } from "@/lib/auth/checkUser";
import { redirect } from "next/navigation";
import HeroDesktop from "@/components/shared/home/hero/HeroDesktop";
import HeroMobile from "@/components/shared/home/hero/HeroMobile";
import examplePuzzle from "@/public/data/example-puzzle.json";
import dynamic from "next/dynamic";

const TryItOutHeader = dynamic(
  () => import("@/components/shared/home/demo/TryItOut"),
  {
    loading: () => <p>Loading...</p>,
  }
);

export default async function Home() {
  const myCurrentUser = await getCurrentUser();
  // if (myCurrentUser?.onboardingComplete) {
  //   redirect("/my-stuff");
  // }

  return (
    <section className="flex flex-col items-center justify-between">
      <HeroDesktop />
      <HeroMobile />
      <TryItOutHeader
        worldDimensions={examplePuzzle.examplePuzzleWorldDimensions}
        puzzleImages={examplePuzzle.examplePuzzleWorldImages}
        startWorldInfo={examplePuzzle.examplePuzzleWorldStart}
        goalWorldInfo={examplePuzzle.examplePuzzleWorldEnd}
      />
    </section>
  );
}
