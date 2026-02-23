import { CalvinKlein } from "./icons/calvin-clein";
import { Gucci } from "./icons/gucci";
import { Prada } from "./icons/prada";
import { Versace } from "./icons/versace";
import { Zara } from "./icons/zara";

export const Brands = () => {
  return (
    <div className="bg-black">
      <div className="flex flex-wrap gap-8 mx-auto max-w-7xl items-center justify-center md:justify-between px-4 py-10 md:py-11 gap-y-5">
        <Versace className="h-7 md:h-9" />
        <Zara className="h-7 md:h-9" />
        <Gucci className="h-7 md:h-9" />
        <Prada className="h-7 md:h-9" />
        <CalvinKlein className="h-7 md:h-9" />
      </div>
    </div>
  );
};
