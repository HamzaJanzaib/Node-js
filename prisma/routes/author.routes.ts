import express, { Router } from "express";

import { createAuthorController, deleteAuthorController, getAuthorByIdController, getAuthorsController, updateAuthorController } from "../controllers/author.controller";

const router : Router = express.Router();

/**
 * @route POST /authors
 * @desc Create a new author
 * @access Public
 */
router.post('/', createAuthorController);

/**
 * @route GET /authors
 * @desc Get all authors
 * @access Public
 */

router.get("/" , getAuthorsController )

/**
 * @route GET /authors/:id
 * @desc Get an author by ID
 * @access Public
 */
router.get('/:id', getAuthorByIdController);

/**
 * @route PUT /authors/:id
 * @desc Update an author by ID
 * @access Public
 * */
router.put('/:id', updateAuthorController);

/**
 * @route DELETE /authors/:id
 * @desc Delete an author by ID
 * @access Public
 */
router.delete('/:id', deleteAuthorController);



export default router;