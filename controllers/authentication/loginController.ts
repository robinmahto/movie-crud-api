import express from 'express';
import Joi from "joi";
import bcrypt from 'bcrypt';
import { JwtServices } from '../../services';
import { PrismaClient } from '@prisma/client';
import { CustomErrorHandler } from '../../errorHandling';
const prisma = new PrismaClient();

const loginController = {

     async login(req: express.Request, res: express.Response, next:express.NextFunction){
       // validation
       const loginSchema = Joi.object({
          email: Joi.string().required(),
          password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
       })

       const {error} = loginSchema.validate(req.body);
       if(error){
         return next(CustomErrorHandler.wrongCreadentials());
       }

       try {
          // checking email exists in db
           const userExist = await prisma.user.findUnique({
               where :{
                    email: req.body.email,
               },
           })
           if(!userExist){
               return next(CustomErrorHandler.wrongCreadentials("email doesn't exists"));
           }

          // compare password
          const passwordMatch = await bcrypt.compare(req.body.password, userExist.password);
          if(!passwordMatch){
               return next(CustomErrorHandler.wrongCreadentials("password doesn't match"));
          }

          // jwt token
          const access_token = JwtServices.sign({_id:userExist.id, email: userExist.email});

         // send response
         res.json({message:'login sucessfully', access_token})    

       } catch (error) {
          return next(error);
       }

     }
}

export default loginController;