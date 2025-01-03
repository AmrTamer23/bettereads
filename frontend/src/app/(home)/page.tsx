import { BookOpen, BookMarked, ShoppingCart } from "lucide-react";
import CurrentlyReading from "@/components/home/currently-reading";
import ToReadList from "@/components/home/to-read-list";
import ToBuyCarousel from "@/components/home/to-buy-carousel";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="~text-2xl/3xl font-bold mb-8">My Book Collections</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div className="col-span-1 md:col-span-2 lg:col-span-2">
          <section className="mb-8">
            <h2 className="~text-lg/2xl font-semibold mb-4 flex items-center">
              <BookOpen className="mr-2" />
              Currently Reading
            </h2>
            <CurrentlyReading />
          </section>

          <section>
            <h2 className="~text-lg/2xl font-semibold mb-4 flex items-center">
              <BookMarked className="mr-2" />
              To Read
            </h2>
            <ToReadList />
          </section>
        </div>

        <div>
          <section>
            <h2 className="~text-lg/2xl font-semibold mb-4 flex items-center">
              <ShoppingCart className="mr-2" />
              Priority To Buy
            </h2>
            <ToBuyCarousel />
          </section>
        </div>
      </div>
    </div>
  );
}
