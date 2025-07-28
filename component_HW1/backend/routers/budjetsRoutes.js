const express = require('express');
const router = express.Router();
const budjetsController = require('../controllers/budjetsController');

/**
 * @swagger
 * /api/budgets:
 *   get:
 *     summary: Get all budgets
 *     description: Retrieve a list of all budgets
 *     tags: [Budgets]
 *     responses:
 *       200:
 *         description: List of budgets retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "f8055fad-c589-4e62-89f4-f7bea461bed5"
 *                       user_id:
 *                         type: string
 *                         format: uuid
 *                         example: "f8055fad-c589-4e62-89f4-f7bea461bed5"
 *                       category:
 *                         type: string
 *                         example: "groceries"
 *                       max_amount:
 *                         type: number
 *                         format: float
 *                         example: 1000.00
 *                       theme:
 *                         type: string
 *                         example: "blue"
 *                 message:
 *                   type: string
 *                   example: "Budgets retrieved successfully"
 *       500:
 *         description: Server error
 */
router.get('/', budjetsController.getAllBudjets);

/**
 * @swagger
 * /api/budgets/{userId}:
 *   get:
 *     summary: Get budgets by user ID
 *     description: Retrieve all budgets for a specific user
 *     tags: [Budgets]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User's budgets retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         example: "f8055fad-c589-4e62-89f4-f7bea461bed5"
 *                       user_id:
 *                         type: string
 *                         format: uuid
 *                         example: "f8055fad-c589-4e62-89f4-f7bea461bed5"
 *                       category:
 *                         type: string
 *                         example: "groceries"
 *                       max_amount:
 *                         type: number
 *                         format: float
 *                         example: 1000.00
 *                       theme:
 *                         type: string
 *                         example: "blue"
 *                 message:
 *                   type: string
 *                   example: "Budgets retrieved successfully"
 *       400:
 *         description: Invalid user ID
 *       500:
 *         description: Server error
 */
router.get('/:userId', budjetsController.getAllBudjetsByUserId);

/**
 * @swagger
 * /api/budgets:
 *   post:
 *     summary: Create a new budget
 *     description: Create a new budget with the provided data
 *     tags: [Budgets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - category
 *               - max_amount
 *               - theme
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 example: "f8055fad-c589-4e62-89f4-f7bea461bed5"
 *               category:
 *                 type: string
 *                 enum: [entertainment, bills, groceries, dining out, transportation, shopping, other]
 *                 example: "groceries"
 *               max_amount:
 *                 type: number
 *                 format: float
 *                 example: 1000.00
 *               theme:
 *                 type: string
 *                 enum: [green, yellow, red, blue, purple, orange, pink, brown, gray, black, white, cyan, navy, magenta, army, fuchsia, teal]
 *                 example: "blue"
 *     responses:
 *       201:
 *         description: Budget created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "f8055fad-c589-4e62-89f4-f7bea461bed5"
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       example: "f8055fad-c589-4e62-89f4-f7bea461bed5"
 *                     category:
 *                       type: string
 *                       example: "groceries"
 *                     max_amount:
 *                       type: number
 *                       format: float
 *                       example: 1000.00
 *                     theme:
 *                       type: string
 *                       example: "blue"
 *                 message:
 *                   type: string
 *                   example: "Budget created successfully"
 *       400:
 *         description: Invalid input data
 *       500:
 *         description: Server error
 */
router.post('/', budjetsController.addNewBudjet);

/**
 * @swagger
 * /api/budgets/{id}:
 *   put:
 *     summary: Update a budget by ID
 *     tags:
 *       - Budgets
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The budget ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category_id:
 *                 type: string
 *                 description: Category ID
 *               max_amount:
 *                 type: number
 *                 format: float
 *                 description: Maximum amount for the budget
 *               theme:
 *                 type: string
 *                 description: Theme color
 *               user_id:
 *                 type: string
 *                 description: User ID
 *               is_used:
 *                 type: boolean
 *                 description: Is the budget used
 *     responses:
 *       200:
 *         description: Budget updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   $ref: '#/components/schemas/Budget'
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Budget not found
 */
router.put('/:id', budjetsController.editBudget);

/**
 * @swagger
 * /api/budgets/{id}:
 *   delete:
 *     summary: Delete a budget by ID
 *     tags:
 *       - Budgets
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The budget ID
 *     responses:
 *       200:
 *         description: Budget deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Budget not found
 */
router.delete('/:id', budjetsController.deleteBudget);

module.exports = router;
