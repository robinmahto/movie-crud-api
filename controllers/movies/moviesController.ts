import express from 'express';
import Joi from 'joi';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const moviesController = {

    async post(req: express.Request, res: express.Response, next: express.NextFunction) {
        //validation
        const movieSchema = Joi.object({
            movie_name: Joi.string().required(),
            description: Joi.string().required(),
            director_name: Joi.string().required(),
            release_date: Joi.string().required()
        })
        const { error } = movieSchema.validate(req.body);
        if (error) {
            return next(error);
        }

        try {
            const { movie_name, description, director_name, release_date } = req.body;
            const movies = await prisma.movie.create({
                data: {
                    movie_name,
                    description,
                    director_name,
                    release_date
                }
            })

            // send response to user
            res.json({ status: true, message: 'created successfully', data: movies });

        } catch (error) {
            return next(error)
        }
    },
    async get(req: express.Request, res: express.Response, next: express.NextFunction) {
        try {
            const getAllMovies = await prisma.movie.findMany();
            res.json({ status: true, message: 'fetch all movies successfully', data: getAllMovies });
        } catch (error) {
            return next(error)
        }
    },
    async getById(req: express.Request, res: express.Response, next: express.NextFunction) {
        const id : any = req.params.id;
        try {
            const getSingleMovies = await prisma.movie.findUnique({
                where: {
                    id: id,
                }
            })
            // sending response to user
            res.json({ status: true, message: 'get single movie list successfully', data: getSingleMovies })
        } catch (error) {
            next(error)
        };
    },
    async update(req: express.Request, res: express.Response, next: express.NextFunction) {
        //validation
        const movieSchema = Joi.object({
            movie_name: Joi.string().required(),
            description: Joi.string().required(),
            director_name: Joi.string().required(),
            release_date: Joi.string().required()
        })
        const { error } = movieSchema.validate(req.body);
        if (error) {
            return next(error);
        }


        try {
            const { movie_name, description, director_name, release_date } = req.body;
            const id : any = req.params.id;
            const movies = await prisma.movie.update({
                data: {
                    movie_name,
                    description,
                    director_name,
                    release_date
                },
                where: {
                    id: id
                }
            })

            // send response to user
            res.json({ status: true, message: 'updated successfully', data: movies });

        } catch (error) {
            return next(error)
        }

    },
    async deletes(req: express.Request, res: express.Response, next: express.NextFunction) {
        const id : any = req.params.id;
        try {
            const movieDeleted = await prisma.movie.delete({
                where: {
                    id: id,
                }
            })
            // sending response to user
            res.json({ status: true, message: 'deleted successfully', data: movieDeleted })
        } catch (error) {
            next(error)
        };
    }
}

export default moviesController;