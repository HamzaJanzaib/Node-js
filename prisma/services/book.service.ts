import { prisma } from "../lib/prisma";

async function createBook({ title, PublishDate, price, authorId }: { title: string; PublishDate: Date; price: number; authorId: number }) {
        const book = await prisma.books.create({
            data: {
                title,
                PublishDate,
                price,
                author : {
                    connect: { id: authorId }
                }, include: {author: true}
            }
        });
        return book;
}

async function getBooks() {
        const books = await prisma.books.findMany({
            include: {
                author: true
            }
        });
        return books;
    
}

async function getBooksByAuthor(authorId: number) {
        const books = await prisma.books.findMany({ 
            where: { authorId },
            include: {
                author: true
            }
        });
        return books;
}


async function getBookById(id: number) {
        const book = await prisma.books.findUnique({
            where: { id }
        });
        return book;
}

async function updateBook(id: number, data: { title?: string; PublishDate?: Date; price?: number; authorId?: number }) {
        const book = await prisma.books.update({
            where: { id },
            data
        });
        return book;
}

async function deleteBook(id: number) {
    await prisma.books.delete({
            where: { id }
    });

    return true;
}

export { createBook, getBooks, getBookById, updateBook, deleteBook , getBooksByAuthor };
