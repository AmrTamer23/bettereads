import { Navbar } from "@/components/layout/navbar";

export default function Home({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
