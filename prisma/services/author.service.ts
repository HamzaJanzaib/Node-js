import { prisma } from "../lib/prisma";

async function createAuthor({ name, age }: { name: string; age: number }) {
        const author = await prisma.authors.create({
            data: {
                name,
                age
            }
        });
        return author;
}

async function getAuthors() {
        const authors = await prisma.authors.findMany();
        return authors;
}


async function getAuthorById(id: number) {
        const author = await prisma.authors.findUnique({
            where: { id }
        });
        return author;
}

async function updateAuthor(id: number, data: { name?: string; age?: number }) {
        const author = await prisma.authors.update({
            where: { id },
            data
        });
        return author;
}

async function deleteAuthor(id: number) {
        await prisma.authors.delete({
            where: { id }
        });
        return true;
}

export { createAuthor, deleteAuthor, getAuthorById, getAuthors, updateAuthor };

