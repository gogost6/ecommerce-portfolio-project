export function TabsHeader() {
  return (
    <div className="w-full border-b mb-5">
      <div className="flex justify-center gap-12 text-gray-400 text-sm md:text-xl">
        <button className="pb-4">Product Details</button>
        <button className="pb-4 text-black relative">
          Rating & Reviews
          <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black" />
        </button>
        <button className="pb-4">FAQs</button>
      </div>
    </div>
  );
}
