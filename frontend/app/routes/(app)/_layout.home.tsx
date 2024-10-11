import { createFileRoute } from "@tanstack/react-router";
import { useAtom, useAtomValue } from "jotai";
import { userAtom } from "~/stores/user";

//@ts-ignore
export const Route = createFileRoute("/(app)/_layout/home")({
  component: () => <Home />,
});

function Home() {
  return <div>Hello /home!</div>;
}
