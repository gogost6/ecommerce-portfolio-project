import { CalvinKlein } from "./icons/calvin-clein";
import { Gucci } from "./icons/gucci";
import { Prada } from "./icons/prada";
import { Versace } from "./icons/versace";
import { Zara } from "./icons/zara";

export const Brands = () => {
  return (
    <div className="flex flex-wrap gap-8 items-center justify-center px-4 py-10 bg-black gap-y-5">
      <Versace />
      <Zara />
      <Gucci />
      <Prada />
      <CalvinKlein />
    </div>
  );
};
