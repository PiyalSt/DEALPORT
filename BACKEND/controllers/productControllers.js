const Product = require("../models/productModels");

const createProduct = async (req, res) => {
  try {
    const {
      productName,
      productDescription,
      productPrice,
      discountPrice,
      stockQuantity,
      stockStatus,
      productImages, // ফ্রন্টএন্ড থেকে পাঠানো ইমেজ URL-এর অ্যারে
      productCategories,
      selectedColors,
    } = req.body;

    const product = await Product.create({
      productName,
      productDescription,
      productPrice,
      discountPrice,
      stockQuantity,
      stockStatus,
      productImages, // ফ্রন্টএন্ড থেকে পাঠানো ইমেজ URL-এর অ্যারে
      productCategories,
      selectedColors,
    });

    res.status(201).json({
      success: "Product create successfully!",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "Product not created!",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
};
