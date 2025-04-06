import { Request, Response } from "express";
import Genre from '../model/Genre.js';

const newGenre = async ( req: Request, res: Response) => {
    try {
        const genre = new Genre(req.body);
        await genre.save();
        
        res.status(201).json({message: "Genre created succesfully", genre: genre})
    } catch (eror) {
        res.status(400).json({error: "Failed to create a genre"})
    }
}

const allGenres = async (req: Request, res: Response) => {
    try {
        const genres = await Genre.find();
        res.status(200).json({message: "Fetched all genres succesfully", genres: genres, totalCount: genres.length})
    } catch (error) {
        res.status(400).json({error: "Error fetching genres"})
    }
}

const getGenreById = async (req: Request, res: Response): Promise<void> => {
    try {
        const book = await Genre.findById(req.params.id);
        if (!book) {
            res.status(404).json({ error: "Genre not found" });
            return;
        }
        res.status(200).json(Genre);
    } catch (error) {
        res.status(500).json({ error: "Error fetching Genre" });
    }
};

const editGenre = async (req: Request, res: Response): Promise<void> => {
    try {
        const updatedGenre = await Genre.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true } // returns the updated document
        );
        if (!updatedGenre) {
            res.status(404).json({ error: "Book not found" });
            return;
        }
        res.status(200).json(updatedGenre);
    } catch (error) {
        res.status(400).json({ error: "Error updating genre" });
    }
};

const deleteGenre = async (req: Request, res: Response): Promise<void> => {
    try {
        const deletedGenre = await Genre.findByIdAndDelete(req.params.id);
        if (!deletedGenre) {
            res.status(404).json({ error: "Genre not found" });
            return
        }
        res.status(200).json({ message: "Genre deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting Genre" });
    }
};

export default {newGenre, allGenres, getGenreById, editGenre, deleteGenre};