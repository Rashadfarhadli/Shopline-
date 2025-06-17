import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function ProductsTable() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const [formData, setFormData] = useState({
    ProductName: "",
    Description: "",
    Volume: "",
    Calories: "",
    Ingredients: "",
    Price: "",
    Rating: "",
    stock: "",
    ImageUrl: "",
  });

  const [editingProductId, setEditingProductId] = useState(null);


  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = () => {
    setLoading(true);
    fetch("http://localhost:5005/products")
      .then((res) => {
        if (!res.ok) throw new Error("Məhsullar yüklənərkən xəta baş verdi");
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
        toast.error(err.message);
      });
  };


  const handleDelete = (id) => {
    if (!window.confirm("Məhsulu silmək istədiyinizə əminsiniz?")) return;

    fetch(`http://localhost:5005/products/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Məhsul silinərkən xəta baş verdi");
        setProducts((prev) => prev.filter((product) => product.id !== id));
        toast.success("Məhsul uğurla silindi");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();

   
    const ingredientsArray = formData.Ingredients
      ? formData.Ingredients.split(",").map((i) => i.trim())
      : [];


    const productData = {
      ProductName: formData.ProductName,
      Description: formData.Description,
      Volume: formData.Volume,
      Calories: Number(formData.Calories),
      Ingredients: ingredientsArray,
      Price: Number(formData.Price),
      Rating: Number(formData.Rating),
      stock: Number(formData.stock),
      ImageUrl: formData.ImageUrl,
    };

    if (editingProductId) {
     
      fetch(`http://localhost:5005/products/${editingProductId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Məhsul redaktə edilərkən xəta baş verdi");
          return res.json();
        })
        .then((updatedProduct) => {
          setProducts((prev) =>
            prev.map((prod) => (prod.id === editingProductId ? updatedProduct : prod))
          );
          toast.success("Məhsul redaktə edildi");
          resetForm();
        })
        .catch((err) => toast.error(err.message));
    } else {
    
      fetch("http://localhost:5005/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(productData),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Məhsul əlavə edilərkən xəta baş verdi");
          return res.json();
        })
        .then((newProduct) => {
          setProducts((prev) => [...prev, newProduct]);
          toast.success("Məhsul əlavə edildi");
          resetForm();
        })
        .catch((err) => toast.error(err.message));
    }
  };


  const resetForm = () => {
    setFormData({
      ProductName: "",
      Description: "",
      Volume: "",
      Calories: "",
      Ingredients: "",
      Price: "",
      Rating: "",
      stock: "",
      ImageUrl: "",
    });
    setEditingProductId(null);
  };


  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setFormData({
      ProductName: product.ProductName || "",
      Description: product.Description || "",
      Volume: product.Volume || "",
      Calories: product.Calories?.toString() || "",
      Ingredients: Array.isArray(product.Ingredients)
        ? product.Ingredients.join(", ")
        : "",
      Price: product.Price?.toString() || "",
      Rating: product.Rating?.toString() || "",
      stock: product.stock?.toString() || "",
      ImageUrl: product.ImageUrl || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" }); 
  };

  if (loading) return <p>Yüklənir...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  return (
    <div className="p-4 max-w-7xl mx-auto">

      <form
        onSubmit={handleFormSubmit}
        className="mb-8 p-4 border rounded shadow bg-white dark:bg-gray-800"
      >
        <h2 className="text-xl font-semibold mb-4">
          {editingProductId ? "Məhsulu redaktə et" : "Yeni məhsul əlavə et"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="ProductName"
            placeholder="Məhsulun adı"
            value={formData.ProductName}
            onChange={handleInputChange}
            required
            className="input-field"
          />
          <input
            type="text"
            name="Description"
            placeholder="Qısa təsvir"
            value={formData.Description}
            onChange={handleInputChange}
            required
            className="input-field"
          />
          <input
            type="text"
            name="Volume"
            placeholder="Həcm (məsələn: 1L)"
            value={formData.Volume}
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="number"
            name="Calories"
            placeholder="Kalori"
            value={formData.Calories}
            onChange={handleInputChange}
            min="0"
            className="input-field"
          />
          <input
            type="text"
            name="Ingredients"
            placeholder="Tərkib (vergüllə ayrılmış)"
            value={formData.Ingredients}
            onChange={handleInputChange}
            className="input-field"
          />
          <input
            type="number"
            name="Price"
            placeholder="Qiymət ($)"
            value={formData.Price}
            onChange={handleInputChange}
            min="0"
            step="0.01"
            required
            className="input-field"
          />
          <input
            type="number"
            name="Rating"
            placeholder="Reytinq (0-5)"
            value={formData.Rating}
            onChange={handleInputChange}
            min="0"
            max="5"
            step="0.1"
            className="input-field"
          />
          <input
            type="number"
            name="stock"
            placeholder="Stok sayı"
            value={formData.stock}
            onChange={handleInputChange}
            min="0"
            className="input-field"
          />
          <input
            type="url"
            name="ImageUrl"
            placeholder="Şəkil URL"
            value={formData.ImageUrl}
            onChange={handleInputChange}
            required
            className="input-field col-span-1 md:col-span-2"
          />
        </div>

        <div className="mt-4 flex gap-4">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
          >
            {editingProductId ? "Yenilə" : "Əlavə et"}
          </button>
          {editingProductId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded"
            >
              Ləğv et
            </button>
          )}
        </div>
      </form>

    
      {products.length === 0 ? (
        <p>Məhsul tapılmadı.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white dark:bg-gray-800 rounded-xl shadow-md">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left text-sm font-semibold text-gray-600 dark:text-gray-300">
                <th className="px-4 py-2">ID</th>
                <th className="px-4 py-2">Şəkil</th>
                <th className="px-4 py-2">Ad</th>
                <th className="px-4 py-2">Təsvir</th>
                <th className="px-4 py-2">Həcm</th>
                <th className="px-4 py-2">Kalori</th>
                <th className="px-4 py-2">Tərkib</th>
                <th className="px-4 py-2">Qiymət ($)</th>
                <th className="px-4 py-2">Reytinq</th>
                <th className="px-4 py-2">Stok</th>
                <th className="px-4 py-2">Əməliyyat</th>
              </tr>
            </thead>

            <tbody className="text-sm text-gray-700 dark:text-gray-300">
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-2">{product.id}</td>
                  <td className="px-4 py-2">
                    <img
                      src={product.ImageUrl}
                      alt={product.ProductName}
                      className="w-16 h-16 object-contain rounded"
                    />
                  </td>
                  <td className="px-4 py-2 font-semibold">{product.ProductName}</td>
                  <td className="px-4 py-2 max-w-xs truncate">{product.Description}</td>
                  <td className="px-4 py-2">{product.Volume}</td>
                  <td className="px-4 py-2">{product.Calories}</td>
                  <td className="px-4 py-2 max-w-sm">
                    {Array.isArray(product.Ingredients) && product.Ingredients.length > 0
                      ? product.Ingredients.join(", ")
                      : "Tərkib mövcud deyil"}
                  </td>
                  <td className="px-4 py-2">{product.Price?.toFixed(2) ?? "-"}</td>
                  <td className="px-4 py-2">{product.Rating ?? "-"}</td>
                  <td className="px-4 py-2">{product.stock ?? "-"}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-xs"
                    >
                      Redaktə et
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded-lg text-xs"
                    >
                      Sil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
