import { Request, Response } from "express";
import Book from '../model/Book.js';

const newBook = async ( req: Request, res: Response) => {
    try {
        const book = new Book(req.body);
        await book.save();
        
        res.status(201).json({message: "Book created succesfully", book: book})
    } catch (eror) {
        res.status(400).json({error: "Failed to create a book"})
    }
}

const allBooks = async (req: Request, res: Response) => {
    try {
        const books = await Book.find();
        res.status(200).json({message: "Fetched all books succesfully", books: books, totalCount: books.length})
    } catch (error) {
        res.status(400).json({error: "Error fetching books"})
    }
}

const getBookById = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            res.status(404).json({ error: "Book not found" });
            return
        }
        res.status(200).json(book);
    } catch (error) {
        res.status(500).json({ error: "Error fetching book" });
    }
};

const editBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // returns the updated document
        );
        if (!updatedBook) {
            res.status(404).json({ error: "Book not found" });
            return
        }
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ error: "Error updating book" });
    }
};

const deleteBook = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedBook = await Book.findByIdAndDelete(req.params.id);
        if (!deletedBook) {
            res.status(404).json({ error: "Book not found" });
            return
        }
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting book" });
    }
};

export  default { newBook, allBooks, editBook, getBookById, deleteBook};