import { log } from "console";
import { createAuthor, deleteAuthor, getAuthorById, getAuthors, updateAuthor } from "../services/author.service";

async function createAuthorController(req: any, res: any) {
    try {
        const { name, age } = req.body;
       
        const author = await createAuthor({ name, age });
        return author;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating the author');
    }
}

async function getAuthorsController(req: any, res: any) {
    try {
        log('Fetching authors...');
        const authors = await getAuthors();
        return authors;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the authors');
    }
}


async function getAuthorByIdController(req: any, res: any) {
    try {
        const { id } = req.params;
        const author = await getAuthorById(parseInt(id));
        return author;
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
        return author;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while updating the author');
    }
}

async function deleteAuthorController(req: any, res: any) {
    try {
        const { id } = req.params;
        await deleteAuthor(parseInt(id));
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while deleting the author');
    }
}

export { createAuthorController, deleteAuthorController, getAuthorByIdController, getAuthorsController, updateAuthorController };
