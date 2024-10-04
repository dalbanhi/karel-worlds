import TagsList from "./RightSidebar/TagsList";
import { getTags } from "@/lib/actions/tags";
import { maxTagsOnExplore } from "@/constants/database";
import dynamic from "next/dynamic";

// const TagsList = dynamic(() => import("./RightSidebar/TagsList"), {
//   ssr: false,
//   loading: () => <div>Loading...</div>,
// });

interface RightSidebarProps {
  children?: React.ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
}

const RightSidebar: React.FC<RightSidebarProps> = async ({
  children,
  searchParams,
}) => {
  const topTags = await getTags(maxTagsOnExplore);
  return (
    <aside className="min-h-svh w-3/12 grow flex-col gap-2 border-l-2 p-4 max-sm:hidden sm:flex">
      <TagsList tags={JSON.stringify(topTags)} searchParams={searchParams} />
    </aside>
  );
};

export default RightSidebar;
