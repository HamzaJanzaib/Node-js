import express, { Router } from "express";
import BooksRoutes from "./books.routes";
import AuthorsRoutes from "./author.routes";

const router : Router = express.Router();

router.use('/books', BooksRoutes);
router.use('/authors', AuthorsRoutes);

export default router;