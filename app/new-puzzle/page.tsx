import dynamic from "next/dynamic";
import { montserrat } from "@/app/fonts";
import { FormField } from "@/components/ui/form";

const NewPuzzleLayout = dynamic(
  () => import("@/components/forms/new-puzzle/layout/NewPuzzleLayout"),
  {
    ssr: false,
  }
);

export default function NewPuzzlePage() {
  return (
    <NewPuzzleLayout>
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
