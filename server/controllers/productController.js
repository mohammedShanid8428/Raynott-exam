const Product = require('../models/productModel');


exports.createProducts = async (req, res) => {
  try {
    const newProduct = new Product(req.body); // ✅ FIXED HERE
    await newProduct.save();
    res.status(201).json({ message: "Product added successfully", newProduct });
  } catch (err) {
    res.status(500).json({ message: "Error adding product", error: err.message });
  }
};


exports.getAllProducts = async (req, res) => {
  try {
    const { search, category, sort } = req.query;
    let filter = {};

    if (search) filter.productName = { $regex: search, $options: "i" }; // ✅ typo fixed: $options
    if (category) filter.category = { $regex: category, $options: "i" };

    let query = Product.find(filter);

    if (sort === "price") query = query.sort({ price: 1 });
    if (sort === "quantity") query = query.sort({ quantity: 1 }); // ✅ fixed: was sorting price again

    const products = await query;
    res.json({ message: "Products fetched successfully", products });
  } catch (err) {
    res.status(500).json({ message: "Error fetching products", error: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true }); // ✅ added
    if (!updated) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product updated successfully", updated });
  } catch (err) {
    res.status(400).json({ message: "Error updating product", error: err.message });
  }
};


exports.deleteProduct = async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting product", error: err.message });
  }
};
