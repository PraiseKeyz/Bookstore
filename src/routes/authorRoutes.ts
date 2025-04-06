import { Router} from "express";
import auth from '../middlewares/authMiddleware.js';
import authorController from "../controllers/authorController.js";

const { newAuthor, allAuthors, editAuthor, getAuthorById, deleteAuthor } = authorController;
const router = Router();

router.post('/authors', auth, newAuthor);

router.get('/authors', auth, allAuthors);

router.get('/authors/:id', auth, getAuthorById);

router.put('/authors/:id', auth, editAuthor)

router.delete('/authors/:id', auth, deleteAuthor);

export default router;