import Link from "next/link";
import Image from "next/image";
import TagsList from "./RightSidebar/TagsList";
import { getAllTags } from "@/lib/actions/tags";

interface RightSidebarProps {
  children?: React.ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
}

const RightSidebar: React.FC<RightSidebarProps> = async ({
  children,
  searchParams,
}) => {
  const allTags = await getAllTags();
  return (
    <aside className="min-h-screen w-3/12 flex-col gap-2 border-l-2 p-4 max-sm:hidden sm:flex">
      <TagsList tags={JSON.stringify(allTags)} searchParams={searchParams} />
    </aside>
  );
};

export default RightSidebar;
