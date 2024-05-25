"use client";
import JoyrideComponent from "@/src/components/joyride/joyride";
import SuperPageLayout from "@/src/components/layouts/superPageLayout/superPageLayout";
export default function Layout({ children }: { children: React.ReactNode }) {
  const links = [
    {
      url: "/dashboard/review",
      title: "Review",
    },
    {
      url: "/dashboard/new",
      title: "New Item",
    },
  ];
  return (
    <section>
                        <JoyrideComponent />

      <nav>
        {" "}
        <SuperPageLayout links={links} />
      </nav>
      {children}
    </section>
  );
}
