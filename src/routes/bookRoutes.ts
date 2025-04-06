import { Router } from 'express';
import bookController from '../controllers/bookController.js';
import auth from '../middlewares/authMiddleware.js'

const router = Router();
const { newBook, allBooks, editBook, getBookById, deleteBook} = bookController;

router.post('/books', newBook);

router.get('/books', auth, allBooks);

router.get('/books/:id', auth, getBookById);

router.put('/books/:id', auth, editBook);

router.delete('books/:id', auth, deleteBook);

export default router;