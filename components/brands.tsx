import { CalvinKlein } from "./icons/calvin-clein";
import { Gucci } from "./icons/gucci";
import { Prada } from "./icons/prada";
import { Versace } from "./icons/versace";
import { Zara } from "./icons/zara";

export const Brands = () => {
  return (
    <div className="bg-black">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-8 gap-y-5 px-4 py-10 md:justify-between md:py-11">
        <Versace className="h-5.75 md:h-8.25" />
        <Zara className="h-6.5 md:h-9.5" />
        <Gucci className="h-6.25 md:h-9" />
        <Prada className="h-5.25 md:h-8" />
        <CalvinKlein className="h-5.5 md:h-8.25" />
      </div>
    </div>
  );
};
