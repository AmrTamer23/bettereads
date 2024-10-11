import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Navbar } from "~/components/navbar";

//@ts-ignore
export const Route = createFileRoute("/(app)/_layout")({
  component: LayoutComponent,
});

function LayoutComponent() {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <Outlet />
    </>
  );
}
