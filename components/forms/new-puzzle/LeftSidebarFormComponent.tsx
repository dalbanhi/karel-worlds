const LeftSidebarFormComponent: React.FC<{
  children?: React.ReactNode;
}> = async ({ children }) => {
  return (
    <aside className="min-h-screen border-r-2 w-3/12 flex-col gap-2 p-4 max-sm:hidden sm:flex">
      {children}
    </aside>
  );
};

export default LeftSidebarFormComponent;
