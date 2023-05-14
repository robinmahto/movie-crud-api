import express from 'express';
import { PrismaClient } from '@prisma/client';
import { CustomErrorHandler } from '../../errorHandling';
import { JwtServices } from '../../services';
import Joi from 'joi';
import bcrypt from 'bcrypt';
const prisma = new PrismaClient();

const signupController = {
    
    async signup(req: express.Request, res: express.Response, next: express.NextFunction){
        // validation
        const signupSchema = Joi.object({
            username : Joi.string().required(),
            email: Joi.string().email().required(),
            password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
        })
        const {error} = signupSchema.validate(req.body);
        if(error){
            return next(error)
        }

        // checking users email in database
        try {
            const emailExists = await prisma.user.findUnique({
                where:{
                    email: req.body.email,
                }
            })
            if(emailExists){
                return next(CustomErrorHandler.alreadyExist('This email is already exists'));
            }
        } catch (error) {
           return next(error);
        }

        // hash password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const { username, email } = req.body;
        try {
            const user = await prisma.user.create({data:{
                username,
                email,
                password: hashedPassword
            }});

            // generate token
            const access_token = JwtServices.sign({_id: user.id, email: user.email});

            // send response to user
            res.json({message:'signup successfully', data: user, access_token})

        } catch (error) {
            return next(error);
        }
    }
}

export default signupController;