import { Application, Request, Response } from "express";
import { prisma } from "./lib/prisma";

const express = require('express');

const app: Application = express();


app.get('/', (req: Request, res: Response) => {
    prisma.books.findMany({
        include: {
            author: true,
        },
    }).then(books => {
        res.json(books);
    }).catch(error => {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching books' });
    });
});


app.listen(3000, () => {
    console.log('Server is running on port 3000');
});