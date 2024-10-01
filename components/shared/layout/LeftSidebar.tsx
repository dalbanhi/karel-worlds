import PuzzleSorter from "./LeftSidebar/PuzzleSorter";

interface LeftSidebarProps {
  children?: React.ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
}

const LeftSidebar: React.FC<LeftSidebarProps> = async ({
  children,
  searchParams,
}) => {
  return (
    <aside className="min-h-screen w-3/12 flex-col gap-2 border-r-2 p-4 max-sm:hidden sm:flex">
      <PuzzleSorter searchParams={searchParams} />
    </aside>
  );
};

export default LeftSidebar;
