import Link from "next/link";
import Image from "next/image";

const LeftSidebar: React.FC<{ children?: React.ReactNode }> = async ({
  children,
}) => {
  return (
    <aside className="min-h-screen w-3/12 flex-col gap-2 border-r-2 p-4 max-sm:hidden sm:flex">
      {children}
    </aside>
  );
};

export default LeftSidebar;
