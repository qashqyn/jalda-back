import mongoose from "mongoose";
import Category from "../models/category.js";

export const getMainCategories = async (req, res) => {
    try {
        const categories = await Category.find({parent: null});
        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json(error);
    }
};

export const getCategory = async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findById(id);

        res.status(200).json(category);
    } catch (error) {
        res.status(404).json(error);
    }
};

export const getChildCategories = async (req, res) => {
    const { id } = req.params;

    try {
        const categories = await Category.find({parent: id});

        res.status(200).json(categories);
    } catch (error) {
        res.status(404).json(error);
    }
};

export const createCategory = async (req, res) => {
    const categoryData = req.body;

    const category = new Category(categoryData);
    try {
        await category.save();

        res.status(201).json(category);
    } catch (error) {
        res.status(404).json(error);
    }
}

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const category = req.body;

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(404).send("No category with that ID");

    const updatedCategory = await Category.findByIdAndUpdate(id, { ...category, id}, {new: true});

    res.json(updatedCategory);
}
