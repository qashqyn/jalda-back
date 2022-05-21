import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken";

import UserModel from "../models/user.js";
import RoleModel from '../models/roles.js';

export const login = async (req, res) => {
    const { email, password } = req.body;
    
    try {
        const existingUser = await UserModel.findOne({email}).populate('roles');
        
        if(!existingUser) return res.status(404).json({message: "User does not exist."});
        
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(400).json({message: "Invalid credentials"});

        const token = jwt.sign({email: existingUser.email, id: existingUser._id}, 'jalda', { expiresIn: "1h"});

        res.status(200).json({result: existingUser, token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong."});
    }
};

export const signup = async (req, res) => {
    const {email, password} = req.body;
    
    try {
        const existingUser = await UserModel.findOne({email});
        
        if(existingUser) return res.status(400).json({message: "User already exists."});

        const hashedPassword = await bcrypt.hash(password, 12);

        let userRoles = [];

        const userRole = await RoleModel.findOne().where('name').equals('User');
        userRoles.push(userRole._id);

        if(req.body.iinNumber){
            const authorRole = await RoleModel.findOne().where('name').equals('Author');
            userRoles.push(authorRole._id);
        }

        const newUser = new UserModel({...req.body, password: hashedPassword, roles: userRoles});
        await newUser.save();

        const result = await UserModel.findById(newUser._id).populate('roles');
        
        const token = jwt.sign({email: result.email, id: result._id}, 'jalda', { expiresIn: "1h"});
        
        res.status(201).json({result, token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong."});

        console.log(error);
    }
};

export const upgradeToAuthor = async (req, res) => {
    const data = req.body;

    try {
        if(!req.userId) return res.json({message: "Unauthenticated"});
        const _id = req.userId;

        const user = await UserModel.findById(_id);

        const authorRole = await RoleModel.findOne().where('name').equals('Author');
        user.roles.push(authorRole._id);

        const result = await UserModel.findByIdAndUpdate(_id, { ...data, roles: user.roles, _id}, {new: true});
        
        const token = jwt.sign({email: result.email, id: result._id}, 'jalda', { expiresIn: "1h"});
        
        res.json({ result, token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong."});

        console.log(error);
    }
}

export const addCreditCard = async (req, res) => {
    
}

export const getFavorites = async (req, res) => {
    try{
        const user = await UserModel.findById(req.userId)
            .populate({path: 'favorites', select: 'authorId title images rating description postDate'});

        res.status(200).json(user.favorites);
    }catch(error){
        res.status(404).json(error);
    }
}
export const getUsers = async (req, res) => {
    try {
        const users = await UserModel.find().populate('roles');
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(404).json(error);
    }
}

export const editUser = async (req, res) => {
    const data = req.body;

    try {
        if(!req.userId) return res.json({message: "Unauthenticated"});
        const _id = req.userId;

        const result = await UserModel.findByIdAndUpdate(_id, { ...data, _id}, {new: true}).populate('roles');
        
        const token = jwt.sign({email: result.email, id: result._id}, 'jalda', { expiresIn: "1h"});
        
        res.json({ result, token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: "Something went wrong."});
    }
}

export const changePassword = async (req, res) => {
    const {password, newPassword} = req.body;
    try {
        if(!req.userId) return res.json({message: "Unauthenticated"});
        const _id = req.userId;

        const existingUser = await UserModel.findById(_id);

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect)
            res.status(400).json({message: "Invalid credentials"});

        const hashedPassword = await bcrypt.hash(newPassword, 12);

        const result = await UserModel.findByIdAndUpdate(_id, {password: hashedPassword}, {new: true}).populate('roles');

        const token = jwt.sign({email: result.email, id: result._id}, 'jalda', { expiresIn: "1h"});
        res.json({ result, token});
    } catch (error) {
        res.status(500).json({message: "Something went wrong."});

        console.log(error);
    }
}