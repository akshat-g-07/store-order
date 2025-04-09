import SearchBar from "@/components/order/search-bar";
import VegSwitch from "@/components/order/veg-switch";

const searchSuggestions = [
  "fan",
  "fairlife protein shakes",
  "face wash",
  "face mask",
  "fancy feast wet cat food",
  "fabric softener",
  "face moisturizer",
  "fake flowers",
  "fan for bedroom",
  "fake plants",
];

export default function Page() {
  return (
    <>
      <section className="py-5 px-2 flex justify-between items-center">
        <SearchBar searchSuggestions={searchSuggestions} />
        <VegSwitch />
      </section>
    </>
  );
}
