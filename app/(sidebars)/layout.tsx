export default function SidebarLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params?: { route: string };
}) {
  return (
    <div className="flex w-full h-full grow justify-center">
      <div className="flex min-h-full h-full grow max-sm:flex-col max-sm:items-center md:justify-between xl:w-4/5">
        {children}
      </div>
    </div>
  );
}
