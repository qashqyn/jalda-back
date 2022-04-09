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
    const {login, email, password, phoneNumber, birthDate} = req.body;
    
    try {
        const existingUser = await UserModal.findOne({email});
        
        if(existingUser) return res.status(400).json({message: "User already exists."});

        const hashedPassword = await bcrypt.hash(password, 12);

        const result = await UserModal.create({login, email, password: hashedPassword, phoneNumber, birthDate});

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
