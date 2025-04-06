import { Router } from 'express';
import auth from '../middlewares/authMiddleware.js'
import genreController from '../controllers/genreController.js';

const router = Router();
const {newGenre, allGenres, getGenreById, editGenre, deleteGenre} = genreController;

router.post('/genres', newGenre);

router.get('/genres', auth, allGenres);

router.get('/genres/:id', auth, getGenreById);

router.put('/genres/:id', auth, editGenre);

router.delete('genres/:id', auth, deleteGenre);

export default router;