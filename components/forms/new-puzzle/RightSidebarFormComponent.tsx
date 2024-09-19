"use client";
const RightSidebarFormComponent: React.FC<{
  children?: React.ReactNode;
}> = ({ children }) => {
  return (
    <aside className="min-h-screen border-l-2 w-3/12 flex-col gap-2 p-4 max-sm:hidden sm:flex">
      {children}
    </aside>
  );
};

export default RightSidebarFormComponent;
