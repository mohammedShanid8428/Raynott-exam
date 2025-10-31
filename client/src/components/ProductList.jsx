import React, { useEffect, useState } from "react";
import {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} from "../../services/allApis";
import { toast } from "react-toastify";

const initialForm = {
  productName: "",
  price: "",
  quantity: "",
  category: "",
  image: "",
};

const ProductInventory = () => {
  const [formData, setFormData] = useState(initialForm);
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);
  const [filters, setFilters] = useState({ search: "", category: "" });
  const [sort, setSort] = useState("");


  const fetchProducts = async () => {
    try {
      const query = [];
      if (filters.search) query.push(`search=${filters.search}`);

      if (filters.category) query.push(`category=${filters.category}`);

      if (sort) query.push(`sort=${sort}`);

      const res = await getAllProducts(query.length ? `?${query.join("&")}` : "");
      const data = res?.data?.products ||  [];
      setProducts(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch products");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { productName, price, quantity, category, image } = formData;

    if (!productName || !price || !quantity || !category || !image)
      return toast.error("Please fill all fields");

    try {
      if (editId) {
        await updateProduct(editId, formData);
        toast.success("Product updated successfully!");
      } else {
        await createProduct(formData);
        toast.success("Product added successfully!");
      }

      setFormData(initialForm);
      setEditId(null);
      fetchProducts();
    } catch (err) {
      console.error(err);
      toast.error("Failed to save product");
    }
  };

  
  const handleEdit = (product) => {
    setEditId(product._id);
    setFormData({
      productName: product.productName,
      price: product.price,
      quantity: product.quantity,
      category: product.category,
      image: product.image,
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        await deleteProduct(id);
        toast.success("Product deleted successfully!");
        fetchProducts();
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete product");
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold text-center mb-6">PRODUCT INVENTORY</h1>

  
      <div className="flex flex-wrap gap-3 mb-5">

        <input
          type="text"
          placeholder="Search by name"
          value={filters.search}
          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          className="border p-2 rounded-lg"
        />

        <input
          type="text"
          placeholder="Category"
          value={filters.category}
          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          className="border p-2 rounded-lg"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="border p-2 rounded-lg"
        >

          <option value="">Sort By</option>
          <option value="price">Price</option>
          <option value="quantity">Quantity</option>
        </select>
        <button
          onClick={fetchProducts}
          className="bg-green-500 text-white px-4 py-2 rounded-lg"
        >
          Apply
        </button>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block font-semibold mb-1">Product Name</label>
          <input
            type="text"
            placeholder="Enter product name"
            value={formData.productName}
            onChange={(e) => setFormData({ ...formData, productName: e.target.value })}
            className="border p-2 rounded-lg w-full"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Price</label>
          <input
            type="number"
            placeholder="Enter price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            className="border p-2 rounded-lg w-full"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Quantity</label>
          <input
            type="number"
            placeholder="Enter quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            className="border p-2 rounded-lg w-full"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Category</label>
          <input
            type="text"
            placeholder="Enter category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="border p-2 rounded-lg w-full"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold mb-1">Image URL</label>
          <input
            type="text"
            placeholder="Enter image URL"
            value={formData.image}
            onChange={(e) => setFormData({ ...formData, image: e.target.value })}
            className="border p-2 rounded-lg w-full"
          />
        </div>

        <div className="md:col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-6 rounded-lg mt-3"
          >
            {editId ? "Update Product" : "Add Product"}
          </button>
        </div>
      </form>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded-lg text-center">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border font-semibold">Image</th>
              <th className="p-3 border font-semibold">Product Name</th>
              <th className="p-3 border font-semibold">Price</th>
              <th className="p-3 border font-semibold">Quantity</th>
              <th className="p-3 border font-semibold">Category</th>
              <th className="p-3 border font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product._id}
                className={`even:bg-gray-50 ${
                  product.quantity === 0
                    ? "bg-red-200"
                    : product.quantity < 5
                    ? "bg-yellow-100"
                    : ""
                }`}
              >
                <td className="p-3 border">
                  <img
                    src={product.image}
                    alt=""
                    className="w-16 h-16 object-cover mx-auto rounded"
                  />
                </td>
                <td className="p-3 border">{product.productName}</td>
                <td className="p-3 border">₹{product.price}</td>
                <td className="p-3 border">{product.quantity}</td>
                <td className="p-3 border">{product.category}</td>
                <td className="p-3 border">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-yellow-400 hover:bg-yellow-500 px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan="6" className="p-4 text-gray-500">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductInventory;
