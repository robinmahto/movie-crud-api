import express from 'express';
import { PrismaClient } from '@prisma/client';
import Joi from 'joi';
import { CustomErrorHandler } from '../../errorHandling';
const prisma = new PrismaClient();

const reviewsController = {

    async post(req : express.Request, res : express.Response, next: express.NextFunction){
        // validation
        const reviewsSchema = Joi.object({
            movie_id : Joi.number().required(),
            user_id : Joi.number().required(),
            rating : Joi.string().required(),
            comment : Joi.string().required()
        })
       const {error} = reviewsSchema.validate(req.body);
       if(error){
         return next(CustomErrorHandler.serverError(error.message));
       }

       const { movie_id, user_id, rating, comment } = req.body;
       try {
         const reviews = await prisma.review.create({data:{
            movie_id,
            user_id,
            rating,
            comment
         }})
         res.json({status: 200, message: reviews})
       } catch (error) {
          res.json({message: error})
       } 

    },

    async get(req : express.Request, res : express.Response){
        try {
          const reviews = await prisma.review.findMany();
          res.json({status: 200, data: reviews});
        } catch (error) {
           res.json({error: error})
        }
    },

   async update(req : express.Request, res : express.Response, next: express.NextFunction){
           // validation
           const reviewsSchema = Joi.object({
            movie_id : Joi.number().required(),
            user_id : Joi.number().required(),
            rating : Joi.string().required(),
            comment : Joi.string().required()
        })
       const {error} = reviewsSchema.validate(req.body);
       if(error){
         return next(CustomErrorHandler.serverError(error.message));
       }

       const { movie_id, user_id, rating, comment } = req.body;
       const id : any = req.params.id;
       try {
         const reviewsUpdate = await prisma.review.update({
             data: {
                 movie_id,
                 user_id,
                 rating,
                 comment
             },
             where: {
                 id,
                 movie_id,
                 user_id
             }
         })
         res.json({status: 200, message: reviewsUpdate})
       } catch (error) {
          res.json({message: error})
       } 

    },

   async deletes(req : express.Request, res : express.Response){
       const id : any = req.params.id;
       try {
        const deleteReviews = await prisma.user.delete({
            where: {
              id : id,
            },
          })
        res.json({message: deleteReviews})  
       } catch (error) {
        res.json({error: error})  
       }
    }

}

export default reviewsController;