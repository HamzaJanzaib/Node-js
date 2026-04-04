import { Response } from "express";
import { createBook, deleteBook, getBookById, getBooks, getBooksByAuthor, updateBook } from "../services/book.service";

async function createBookController(req: any, res: Response) {
    try {
        const { title, price, authorId } = req.body;
        
        const priceValue = parseFloat(price);
        if (isNaN(priceValue)) {
            throw new Error('Invalid price provided');
        }

        // Set PublishDate to the current date and time
        const NewPublishDate =  new Date();

        const book = await createBook({ title, PublishDate: NewPublishDate, price: priceValue, authorId });

        res.json(book);
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating the book');
    }
}

async function getBooksController(req: any, res: Response) {
    try {
        const books = await getBooks();
        res.json(books);
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the books');
    }
}

async function getBooksByAuthorController(req: any, res: Response) {
    try {
        const { authorId } = req.params;
        const books = await getBooksByAuthor(parseInt(authorId));
        res.json(books);
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the books by author');
    }
}


async function getBookByIdController(req: any, res: Response) {
    try {
        const { id } = req.params;
        const book = await getBookById(parseInt(id));
        res.json(book);
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the book');
    }

}

async function updateBookController(req: any, res: Response) {
    try {
        const { id } = req.params;
        const { title, PublishDate, price, authorId } = req.body;
        const book = await updateBook(parseInt(id), { title, PublishDate: new Date(PublishDate), price, authorId });

        res.json(book);
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while updating the book');
    }
}

async function deleteBookController(req: any, res: Response) {
    try {
        const { id } = req.params;
        await deleteBook(parseInt(id));
        res.json({ message: 'Book deleted successfully' });

    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while deleting the book');
    }
}

export { createBookController, getBooksController, getBookByIdController, updateBookController, deleteBookController, getBooksByAuthorController };
