import Home from "./home";

export const metadata = generateMetadata();

function generateMetadata() {
  const title = "Open-Mushaf";
  const description = "المحف المفتوح المصدر";
  const openGraph = {
    title,
    description,
  };

  return {
    title,
    description,
    openGraph,
  };
}
export default function Page() {
  return <Home />;
}
