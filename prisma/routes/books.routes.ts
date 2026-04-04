import express, { Router } from "express";

import { createBookController, getBooksController, getBookByIdController, updateBookController, deleteBookController , getBooksByAuthorController} from "../controllers/book.controller";

const router : Router = express.Router();

/**
 * @route POST /books
 * @desc Create a new book
 * @access Public
 */
router.post('/', createBookController);

/**
 * @route GET /books
 * @desc Get all books
 * @access Public
 */

router.get("/" , getBooksController )

/**
 * @route GET /books/:id
 * @desc Get a book by ID
 * @access Public
 */
router.get('/:id', getBookByIdController);

/**
 * @route PUT /books/:id
 * @desc Update a book by ID
 * @access Public
 * */
router.put('/:id', updateBookController);

/**
 * @route DELETE /books/:id
 * @desc Delete a book by ID
 * @access Public
 */
router.delete('/:id', deleteBookController);

/**
 * @route GET /books/author/:authorId
 * @desc Get books by author ID
 * @access Public
 */
router.get('/author/:authorId', getBooksByAuthorController);



export default router;