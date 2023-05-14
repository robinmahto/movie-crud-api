import express from 'express';
const router = express.Router();
import {
    changePasswordController,
    loginController,
    signupController,
    moviesController,
    reviewsController
} from '../controllers';
import { auth } from '../middleware';

// auth
router.post('/signup', signupController.signup);
router.post('/login', loginController.login);
router.post('/changePassword', auth, changePasswordController.changePassword) // protected routes

// movies
router.post('/movies', auth, moviesController.post);
router.get('/movies', auth, moviesController.get);
router.get('/movies/:id', auth, moviesController.getById);
router.put('/movies/:id', auth, moviesController.update);
router.delete('/movies', auth, moviesController.deletes);

// reviews

router.post('/reviews', auth, reviewsController.post);
router.get('/reviews', auth, reviewsController.get);
router.put('/reviews/:id', auth, reviewsController.update);
router.delete('/reviews', auth, reviewsController.deletes);

export default router;