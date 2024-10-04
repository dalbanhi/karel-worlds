import TagsList from "./RightSidebar/TagsList";
import { getTags } from "@/lib/actions/tags";
import { maxTagsOnExplore } from "@/constants/database";

interface RightSidebarProps {
  children?: React.ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
}

const RightSidebar: React.FC<RightSidebarProps> = async ({
  children,
  searchParams,
}) => {
  const allTags = await getTags(maxTagsOnExplore);
  return (
    <aside className="min-h-screen w-3/12 flex-col gap-2 border-l-2 p-4 max-sm:hidden sm:flex">
      <TagsList tags={JSON.stringify(allTags)} searchParams={searchParams} />
    </aside>
  );
};

export default RightSidebar;
