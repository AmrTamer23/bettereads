import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Landing,
});

function Landing() {
  return (
    <div>
      <h1>Hello World</h1>
    </div>
  );
}
