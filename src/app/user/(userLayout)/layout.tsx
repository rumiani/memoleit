import ItemsNav from "@/src/components/general/layouts/appLayout/appLayout";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <div className="px-2 sm:px-6 lg:px-8">
        <ItemsNav />
        <div className="sm:ml-14">{children}</div>
      </div>
  );
}
