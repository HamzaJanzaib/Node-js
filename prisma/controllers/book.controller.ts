import { createBook, deleteBook, getBookById, getBooks, getBooksByAuthor, updateBook } from "../services/book.service";

async function createBookController(req: any, res: any) {
    try {
         const { title, PublishDate, price, authorId } = req.body;
        const book = await createBook({ title, PublishDate: new Date(PublishDate), price, authorId });

        return book;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating the book');
    }
}

async function getBooksController(req: any, res: any) {
    try {
        const books = await getBooks();
        return books;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the books');
    }
}

async function getBooksByAuthorController(req: any, res: any) {
    try {
        const { authorId } = req.params;
        const books = await getBooksByAuthor(parseInt(authorId));
        return books;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the books by author');
    }
}


async function getBookByIdController(req: any, res: any) {
    try {
        const { id } = req.params;
        const book = await getBookById(parseInt(id));
        return book;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the book');
    }

}

async function updateBookController(req: any, res: any) {
    try {
        const { id } = req.params;
        const { title, PublishDate, price, authorId } = req.body;
        const book = await updateBook(parseInt(id), { title, PublishDate: new Date(PublishDate), price, authorId });

        return book;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while updating the book');
    }
}

async function deleteBookController(req: any, res: any) {
    try {
        const { id } = req.params;
        await deleteBook(parseInt(id));
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while deleting the book');
    }
}

export { createBookController, getBooksController, getBookByIdController, updateBookController, deleteBookController , getBooksByAuthorController };
