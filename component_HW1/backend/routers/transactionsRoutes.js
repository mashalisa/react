const express = require('express');
const router = express.Router();
const transactionsController = require('../controllers/transactionsController');
console.log('transactionsRoutes');

/**
 * @swagger
 * components:
 *   schemas:
 *     Transaction:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           example: "f435838e-abbb-467f-b896-1679f0642892"
 *         recipient_name:
 *           type: string
 *           example: "test"
 *         amount:
 *           type: number
 *           example: 500.00
 *         date:
 *           type: string
 *           format: date-time
 *           example: "2025-06-15 13:54:51"
 *     BudgetUsage:
 *       type: object
 *       properties:
 *         category:
 *           type: string
 *           example: "groceries"
 *         max-amount:
 *           type: number
 *           example: 750
 *         transactions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Transaction'
 *     NewTransaction:
 *       type: object
 *       required:
 *         - user_id
 *         - recipient_name
 *         - amount
 *         - category
 *       properties:
 *         user_id:
 *           type: string
 *           format: uuid
 *           example: "65fbc7da-c9c3-472f-9669-17351f702166"
 *         recipient_name:
 *           type: string
 *           example: "test"
 *         amount:
 *           type: number
 *           example: 500.00
 *         category:
 *           type: string
 *           example: "groceries"
 */

/**
 * @swagger
 * /api/transactions:
 *   get:
 *     summary: Get all transactions
 *     tags: [Transactions]
 *     description: Retrieve a list of all transactions.
 *     responses:
 *       200:
 *         description: A list of transactions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       amount:
 *                         type: number
 *                       createdAt:
 *                         type: string
 *                       updatedAt:
 *                         type: string
 *       500:
 *         description: Internal Server Error.
 */
// router.get('/:userId', transactionsController.getAllTransactions);

/**
 * @swagger
 * /api/transactions/user/{userId}:
 *   get:
 *     summary: Get all transactions for a user
 *     description: Retrieves all transactions for a specific user
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           description: UUID of the user to get transactions for
 *         example: "65fbc7da-c9c3-472f-9669-17351f702166"
 *     responses:
 *       200:
 *         description: Successfully retrieved transactions
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
 *                     $ref: '#/components/schemas/Transaction'
 *                 message:
 *                   type: string
 *                   example: "Transactions retrieved successfully"
 *       400:
 *         description: Invalid user ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "User ID must be a valid UUID"
 *                 data:
 *                   type: null
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 data:
 *                   type: null
 */
router.get('/user/:userId', transactionsController.getTransactionByUserId);

/**
 * @swagger
 * /api/transactions/budget/{userId}:
 *   get:
 *     summary: Get budget usage and transactions by user ID
 *     description: Retrieves all budget categories with their usage and detailed transactions for a specific user
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *           description: UUID of the user to get transactions for
 *         example: "65fbc7da-c9c3-472f-9669-17351f702166"
 *     responses:
 *       200:
 *         description: Successfully retrieved budget usage and transactions
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
 *                     $ref: '#/components/schemas/BudgetUsage'
 *                 message:
 *                   type: string
 *                   example: "Budget usage retrieved successfully"
 *       400:
 *         description: Invalid user ID format
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "User ID must be a valid UUID"
 *                 data:
 *                   type: null
 *       404:
 *         description: No budgets found for the user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "No budgets found for this user"
 *                 data:
 *                   type: null
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 data:
 *                   type: null
 */
router.get('/budget/:userId', transactionsController.transactionByBudgetId);

/**
 * @swagger
 * /api/transactions:
 *   post:
 *     summary: Create a new transaction
 *     description: Creates a new transaction for a user in a specific category
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - user_id
 *               - recipient_name
 *               - amount
 *               - category
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 example: "65fbc7da-c9c3-472f-9669-17351f702166"
 *               recipient_name:
 *                 type: string
 *                 example: "test"
 *               amount:
 *                 type: number
 *                 example: 500.00
 *               category:
 *                 type: string
 *                 example: "groceries"
 *     responses:
 *       200:
 *         description: Transaction created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   $ref: '#/components/schemas/Transaction'
 *                 message:
 *                   type: string
 *                   example: "Transaction created successfully"
 *       400:
 *         description: Invalid input or category not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Category not found"
 *                 data:
 *                   type: null
 *       500:
 *         description: Server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *                 data:
 *                   type: null
 */
router.post('/', transactionsController.createNewtransactions);

module.exports = router;
