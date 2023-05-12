import express from 'express';
const router = express.Router();
import { 
    changePasswordController, 
    loginController, 
    signupController, 
    moviesController, 
    reviewsController } from '../controllers';

// auth
router.post('/signup', signupController.signup);
router.post('/login', loginController.login);
router.post('/changePassword', changePasswordController.changePassword) // protected routes

// movies
router.post('/movies', moviesController.post);
router.get('/movies', moviesController.get);
router.get('/movies/:id', moviesController.getById);
router.put('/movies', moviesController.update);
router.delete('/movies', moviesController.deletes);

// reviews

router.post('/reviews', reviewsController.post);
router.get('/reviews', reviewsController.get);
router.put('/reviews', reviewsController.update);
router.delete('/reviews', reviewsController.deletes);


export default router;