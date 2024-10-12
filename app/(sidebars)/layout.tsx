export default function SidebarLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: { route: string };
}) {
  return (
    <div className="flex size-full grow justify-center">
      <div className="flex h-full min-h-full grow max-sm:flex-col max-sm:items-center md:justify-between xl:w-4/5">
        {children}
      </div>
    </div>
  );
}
