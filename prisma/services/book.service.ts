import { prisma } from "./../lib/prisma";

async function createBook({ title, PublishDate, price, authorId }: { title: string; PublishDate: Date; price: number; authorId: number }) {
    try {
        const book = await prisma.books.create({
            data: {
                title,
                PublishDate,
                price,
                authorId
            }
        });
        return book;

    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while creating the book');
    }
}

async function getBooks() {
    try {
        const books = await prisma.books.findMany({
            include: {
                author: true
            }
        });
        return books;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the books');
    }
}

async function getBooksByAuthor(authorId: number) {
    try {
        const books = await prisma.books.findMany({ 
            where: { authorId },
            include: {
                author: true
            }
        });
        return books;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the books by author');
    }
}


async function getBookById(id: number) {
    try {
        const book = await prisma.books.findUnique({
            where: { id }
        });
        return book;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while fetching the book');
    }

}

async function updateBook(id: number, data: { title?: string; PublishDate?: Date; price?: number; authorId?: number }) {
    try {
        const book = await prisma.books.update({
            where: { id },
            data
        });
        return book;
    } catch (error) {
        console.error(error);
        throw new Error('An error occurred while updating the book');
    }
}

async function deleteBook(id: number) {
    try {
        await prisma.books.delete({
            where: { id }
        });
    }
    catch (error) {
        console.error(error);
        throw new Error('An error occurred while deleting the book');
    }
}

export { createBook, getBooks, getBookById, updateBook, deleteBook , getBooksByAuthor };
