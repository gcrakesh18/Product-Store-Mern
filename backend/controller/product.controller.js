import Product from "../models/product.model.js";
import mongoose from "mongoose";


export const createProduct = async (req, res) => {
    const product = req.body;
    if (!product.name || !product.price || !product.image) {
        return res.status(400).json({ success: false, message: "Please provide all fields" });
    }
    const newProduct = new Product(product);
    try {
        await newProduct.save();
        res.status(201).json({ success: true, data: newProduct });
    } catch (error) {
        console.error("Error creating product:", error.message);
        res.status(500).json({ success: false, message: "Server Error:" });
    }
};

export const deleteProduct = async (req, res) => {
    const { id, name } = req.params;
    console.log("id:", id);

    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "You have successfully deleted the product" });
    } catch (error) {
        console.error("Error while deleting the product:", error.message);
        res.status(500).json({ success: false, message: "ohh Shitt! It's Server Error" });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json({ success: true, message: "Products fetched Successfully", data: products });
    } catch (error) {
        console.error("Error in fetching products : ", error.message);
        res.status(500).json({ success: false, message: "ohh Shitt! It's Server Error" });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ success: false, message: "Invalid product ID" });
    }

    try {
        await Product.findByIdAndUpdate(id, updatedData, { new: true });
        res.status(200).json({ success: true, message: "Product updated successfully", data: updatedData });
    } catch (error) {
        res.status(500).json({ success: false, message: "ohh Shitt! It's Server Error while updating" });
    }
};