import { Request, Response } from "express";
import Author from '../model/Author.js';


// Create new Author

const newAuthor = async ( req: Request, res: Response) => {
    try {
        const author = new Author(req.body);
        await author.save();
        
        res.status(201).json({message: "Author created succesfully", author: author})
    } catch (eror) {
        res.status(400).json({error: "Failed to create an author"})
    }
}

//Get all authors

const allAuthors = async (req: Request, res: Response) => {
    try {
        const authors = await Author.find();
        res.status(200).json({message: "Fetched all authors succesfully", authors: authors, totalCount: authors.length})
    } catch (error) {
        res.status(400).json({error: "Error fetching authors"})
    }
}

const getAuthorById = async (req: Request, res: Response): Promise<void> => {
    try {
        const author = await Author.findById(req.params.id);
        if (!author) {
            res.status(404).json({ error: "Author not found" });
            return
        }
        res.status(200).json(author);
    } catch (error) {
        res.status(500).json({ error: "Error fetching author" });
    }
};

const editAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedAuthor = await Author.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // returns the updated document
        );
        if (!updatedAuthor) {
         res.status(404).json({ error: "Author not found" });
         return;
        }
        res.status(200).json(updatedAuthor);
    } catch (error) {
        res.status(400).json({ error: "Error updating author" });
    }
};

const deleteAuthor = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedAuthor = await Author.findByIdAndDelete(req.params.id);
        if (!deletedAuthor) {
            res.status(404).json({ error: "Author not found" });
            return;
        }
        res.status(200).json({ message: "Author deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting author" });
    }
};


export default { newAuthor, allAuthors, editAuthor, getAuthorById, deleteAuthor };