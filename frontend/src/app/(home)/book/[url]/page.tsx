import ClientPage from "./page.client";

interface Props {
  params: Promise<{ url: string }>;
}

export default async function Page({ params }: Props) {
  return <ClientPage params={await params} />;
}
