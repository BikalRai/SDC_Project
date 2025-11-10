import ItemCard from "../components/card/ItemCard";

const Vehicle = () => {
  const items = [
    { name: "Aprilia SR 125", price: "Rs. 1200/day", image: "https://imgs.search.brave.com/424siygrPE7JKfl0b46MKTSSdHCHhC5nPVtsZimW-Es/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2FlL2Jh/L2I2L2FlYmFiNjdl/YTcyNzlkOGMxYTZj/ZGMxZDdlNjQ0YWYw/LmpwZw" },
    { name: "Yamaha MT 15", price: "Rs. 1500/day", image: "https://imgs.search.brave.com/424siygrPE7JKfl0b46MKTSSdHCHhC5nPVtsZimW-Es/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2FlL2Jh/L2I2L2FlYmFiNjdl/YTcyNzlkOGMxYTZj/ZGMxZDdlNjQ0YWYw/LmpwZw" },
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 place-items-center">
      {items.map((item, index) => (
        <ItemCard key={index} {...item} />
      ))}
    </div>
  );
};

export default Vehicle;
