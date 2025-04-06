import { Router } from 'express';
import auth from '../middlewares/authMiddleware.js'
import genreController from '../controllers/genreController.js';

const router = Router();
const {newGenre, allGenres, getGenreById, editGenre, deleteGenre} = genreController;

router.post('/books', newGenre);

router.get('/books', auth, allGenres);

router.get('/books/{bookId}', auth, getGenreById);

router.put('/books/{bookId}', auth, editGenre);

router.delete('books/{bookId}', auth, deleteGenre);

export default router;