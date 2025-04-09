import GoToKart from "@/components/order/go-to-cart";
import MenuItem from "@/components/order/menu-item";
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
  const dummyItem = [
    {
      id: 1,
      name: "Honey Chilli Potato",
      veg: Math.random() > 0.5 ? true : false,
      price: "230",
    },
    {
      id: 2,
      name: "Honey Chilli Potato",
      veg: Math.random() > 0.5 ? true : false,
      price: "230",
    },
    {
      id: 3,
      name: "Honey Chilli Potato",
      veg: Math.random() > 0.5 ? true : false,
      price: "230",
    },
    {
      id: 4,
      name: "Honey Chilli Potato",
      veg: Math.random() > 0.5 ? true : false,
      price: "230",
    },
    {
      id: 5,
      name: "Honey Chilli Potato",
      veg: Math.random() > 0.5 ? true : false,
      price: "230",
    },
    {
      id: 6,
      name: "Honey Chilli Potato",
      veg: Math.random() > 0.5 ? true : false,
      price: "230",
    },
    {
      id: 7,
      name: "Honey Chilli Potato",
      veg: Math.random() > 0.5 ? true : false,
      price: "230",
    },
    {
      id: 8,
      name: "Honey Chilli Potato",
      veg: Math.random() > 0.5 ? true : false,
      price: "230",
    },
    {
      id: 9,
      name: "Honey Chilli Potato",
      veg: Math.random() > 0.5 ? true : false,
      price: "230",
    },
    {
      id: 11,
      name: "Honey Chilli Potato",
      veg: Math.random() > 0.5 ? true : false,
      price: "230",
    },
    {
      id: 12,
      name: "Honey Chilli Potato",
      veg: Math.random() > 0.5 ? true : false,
      price: "230",
    },
    {
      id: 13,
      name: "Honey Chilli Potato",
      veg: Math.random() > 0.5 ? true : false,
      price: "230",
    },
    {
      id: 14,
      name: "Honey Chilli Potato",
      veg: Math.random() > 0.5 ? true : false,
      price: "230",
    },
    {
      id: 15,
      name: "Honey Chilli Potato",
      veg: Math.random() > 0.5 ? true : false,
      price: "230",
    },
    {
      id: 16,
      name: "Honey Chilli Potato",
      veg: Math.random() > 0.5 ? true : false,
      price: "230",
    },
    {
      id: 17,
      name: "Honey Chilli Potato",
      veg: Math.random() > 0.5 ? true : false,
      price: "230",
    },
    {
      id: 18,
      name: "Honey Chilli Potato",
      veg: Math.random() > 0.5 ? true : false,
      price: "230",
    },
    {
      id: 19,
      name: "Honey Chilli Potato",
      veg: Math.random() > 0.5 ? true : false,
      price: "230",
    },
    {
      id: 10,
      name: "Honey Chilli Potato",
      veg: Math.random() > 0.5 ? true : false,
      price: "230",
    },
  ];

  return (
    <>
      <section className="w-full max-w-[550px] mx-auto relative">
        <section className="py-5 px-2 flex justify-between items-center sticky top-0 bg-gradient-to-r from-[#FFCF91] to-[#FFD194]">
          <SearchBar searchSuggestions={searchSuggestions} />
          <VegSwitch />
        </section>
        <section className="py-5 px-2 flex flex-col space-y-6">
          {dummyItem.map((item) => (
            <MenuItem
              key={item.id}
              id={item.id}
              name={item.name}
              price={item.price}
              veg={item.veg}
            />
          ))}
        </section>
        <GoToKart />
      </section>
    </>
  );
}
