import { log } from "console";
import { createAuthor, deleteAuthor, getAuthorById, getAuthors, updateAuthor } from "../services/author.service";
import { Response } from "express";

async function createAuthorController(req: any, res: Response) {
    try {
        const { name, age } = req.body;
       
        const author = await createAuthor({ name, age });
       
        res.status(201).json(author);
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating the author');
    }
}

async function getAuthorsController(req: any, res: Response) {
    try {
        log('Fetching authors...');
        const authors = await getAuthors();

        res.json(authors);
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the authors');
    }
}


async function getAuthorByIdController(req: any, res: Response) {
    try {
        const { id } = req.params;
        const author = await getAuthorById(parseInt(id));
        res.json(author);
    } catch (error) {   
        console.error(error);
        throw new Error('An error occurred while fetching the author');
    }

}

async function updateAuthorController(req: any, res: any) {
    try {
        const { id } = req.params;
        const { name, age } = req.body;
        const author = await updateAuthor(parseInt(id), { name, age });
        res.json(author);
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while updating the author');
    }
}

async function deleteAuthorController(req: any, res: Response) {
    try {
        const { id } = req.params;
        await deleteAuthor(parseInt(id));
        res.json({ message: 'Author deleted successfully' });
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while deleting the author');
    }
}

export { createAuthorController, deleteAuthorController, getAuthorByIdController, getAuthorsController, updateAuthorController };
