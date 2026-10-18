const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true
    },
    productDescription: {
        type: String,
        required: [true, 'Product description is required'],
        trim: true
    },
    productPrice: {
        type: Number,
        required: [true, 'Product price is required'],
        min: [0, 'Price cannot be negative']
    },
    discountPrice: {
        type: Number,
        default: 0,
        min: [0, 'Discount price cannot be negative']
    },
    stockQuantity: {
        type: Number,
        required: [true, 'Stock quantity is required'],
        min: [0, 'Quantity cannot be negative'],
        default: 0
    },
    stockStatus: {
        type: String,
        required: true,
        enum: ['In Stock', 'Out of Stock'], // ড্রপডাউন ভ্যালু ম্যানেজ করার জন্য
        default: 'In Stock'
    },
    productImages: {
        type: [String], // মেইন ইমেজ এবং গ্যালারি ইমেজের URL রাখার জন্য অ্যারে
        // required: [true, 'At least one product image is required']
    },
    productCategories: {
        type: String, // ক্যাটাগরি আইডি ব্যবহার করতে চাইলে mongoose.Schema.Types.ObjectId দিতে পারেন
        required: [true, 'Product category is required']
    },
    selectedColors: {
        type: [String], // কালার কোড বা নামগুলো অ্যারে আকারে রাখার জন্য (যেমন: ["#FF0000", "#000000"])
        default: []
    }
}, {
    timestamps: true // এর ফলে createdAt এবং updatedAt অটোমেটিক তৈরি হবে
});

module.exports = mongoose.model('Product', productSchema);