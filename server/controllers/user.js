import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

import UserModal from "../models/user.js";

export const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const existingUser = await UserModal.findOne({email});
        
        if(!existingUser) return res.status(404).json({message: "User does not exist."});
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'test', { expiresIn: "1h"});

        res.status(200).json({result: existingUser, token});
    } catch (error) {
        res.status(500).json({message: "Somethinggg went wrong."});
    }
};

export const signup = async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const existingUser = await UserModal.findOne({email});
        
        if(existingUser) return res.status(400).json({message: "User already exists."});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModal.create({...req.body, password: hashedPassword});

        const token = jwt.sign({email: result.email, id: result._id}, 'test', { expiresIn: "1h"});
        
        res.status(201).json({result, token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong."});

        console.log(error);
    }
};

export const getFavorites = async (req, res) => {
    try{
        const user = await UserModal.findById(req.userId)
            .populate({path: 'favorites'});

        res.status(200).json(user.favorites);
    }catch(error){
        res.status(404).json(error);
    }
}
export const getUsers = async (req, res) => {
    try {
        const users = await UserModal.find().populate('roles');
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
}

export const editUser = async (req, res) => {
    const data = req.body;

    try {
        if(!req.userId) return res.json({message: "Unaithenticated"});
        const _id = req.userId;

        const result = await UserModal.findByIdAndUpdate(_id, { ...data, _id}, {new: true});
        
        const token = jwt.sign({email: result.email, id: result._id}, 'test', { expiresIn: "1h"});
        
        res.json({ result, token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong."});

        console.log(error);
    }
}