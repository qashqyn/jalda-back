import UserModel from "../models/user.js";
import RoleModel from '../models/roles.js';
import nodemailer from 'nodemailer';
import mongoose from "mongoose";
import generator from 'generate-password';
import bcrypt from 'bcryptjs';


export const getWaitingAuthors = async (req, res) => {
    try {
        // if(!req.isAdmin || req.isAdmin !== true)
        //     return res.status(403).json({message: "Not an Admin"});

        const waitingAuthors = await UserModel.find({"status": "waiting"}).select('companyName name surname fathername iinNumber email phoneNumber sendDate').sort('sendDate');

        res.status(200).json(waitingAuthors);

    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}

export const approveAuthor = async (req, res) => {
    const {id} = req.params;
    const { newStatus } = req.body;

    try {
        // if(!req.isAdmin || req.isAdmin !== true)
        //     return res.status(403).json({message: "Not an Admin"});

        if(!mongoose.Types.ObjectId.isValid(id)){
            console.log("No user with that Id");
            return res.status(404).send("No user with that Id");
        }
        
        let text = '';
        
        const user = await UserModel.findById(id);
        const authorRole = await RoleModel.findOne().where('name').equals('Author');

        let roles = user.roles;

        if(newStatus === 'approved'){
            roles.push(authorRole._id);
            if(!user.password){
                const password = generator.generate({length: 8, numbers: true});
                const hashedPassword = await bcrypt.hash(password, 12);
            
                text = `Вашу заявку одобрили. Ваш пароль: ${password}`;

                await UserModel.findByIdAndUpdate(id, {password: hashedPassword, status: newStatus, roles: roles});

            }else{
                text = "Вашу заявку одобрили.";
                await UserModel.findByIdAndUpdate(id, {status: newStatus, roles: roles});
           }
        }else if(newStatus === 'dismissed'){
            text = "Вашу заявку отклонили.";
        }else{
            return res.status(400).send("New status not given.");
        }

        
        const transporter = nodemailer.createTransport({
            port: 465,   
            host: "smtp.gmail.com",
            auth: {
              user: 'jalda.platform@gmail.com',
              pass: 'jalda2022'
            },
            secure: true,
        });

        var mailOptions = {
            from: 'jalda.platform@gmail.com',
            to: user.email,
            subject: 'Заявка на становление Партнером',
            text: text
        };
          
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                res.status(400).json({message: "Error"});
            }
            console.log('Email sent: ' + info.response);
            return res.status(201).json({message: "Success"});
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
}