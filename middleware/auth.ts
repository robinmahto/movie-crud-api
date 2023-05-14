import express from 'express';
import { CustomErrorHandler } from "../errorHandling";
import { JwtServices } from "../services"; 

const auth = async(req:express.Request, res:express.Response, next:express.NextFunction)=>{
        const authHeader = req.headers.authorization;
        if(!authHeader){
            return next(CustomErrorHandler.unAuthorized);
        }
        const token = authHeader.split(' ')[1];

        try {
            const { _id, email } = JwtServices.verify(token);
            const user = {_id, email};
            req.user = user;
            next();
        } catch (error) {
            return next(CustomErrorHandler.unAuthorized());
        }

}

export default auth;

