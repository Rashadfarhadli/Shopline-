import { useEffect, useState } from "react";

function ProductList() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5005/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Xəta baş verdi:", err));
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Our Products</h2>
      <h5 className="text-xl mb-10 text-gray-800">Discover our wide range of quality products</h5>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {products.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition duration-300 p-6"
          >
            <img
              src={item.ImageUrl}
              alt={item.ProductName}
              className="w-full h-48 object-cover rounded-xl mb-4"
            />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{item.ProductName}</h3>
            <p className="text-gray-600 mb-2">{item.Description}</p>
            <p className="text-lg text-green-600 font-bold mb-2">${item.Price}</p>
            <p className="text-sm text-yellow-500">⭐ {item.Rating} / 5</p>
            <p className="text-sm text-gray-500">Stock: {item.stock} ədəd</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
