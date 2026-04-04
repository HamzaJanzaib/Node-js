import { Application, Request, Response } from "express";
import { prisma } from "./lib/prisma";

import express from "express";
import Routes from "./routes/index";

const app: Application = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.use('/api', Routes);



app.listen(3000, () => {
    console.log('Server is running on port 3000');
});