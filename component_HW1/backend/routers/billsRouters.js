const express = require('express');
const router = express.Router();
const billsController = require('../controllers/billsControllers');

/**
 * @swagger
 * /api/bills:
 *   get:
 *     summary: Get all bills
 *     description: Retrieve a list of all bills
 *     tags: [Bills]
 *     responses:
 *       200:
 *         description: List of bills retrieved successfully
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
 *                       title:
 *                         type: string
 *                         example: "Electric Bill"
 *                       amount:
 *                         type: number
 *                         format: float
 *                         example: 150.00
 *                       due_date:
 *                         type: string
 *                         format: date
 *                         example: "2024-03-15"
 *                       due_day:
 *                         type: integer
 *                         example: 15
 *                       status:
 *                         type: string
 *                         enum: [paid, unpaid, soon]
 *                         example: "unpaid"
 *                       is_paid:
 *                         type: boolean
 *                         example: false
 *                       is_urgent:
 *                         type: boolean
 *                         example: false
 *                       user_id:
 *                         type: string
 *                         format: uuid
 *                         example: "f8055fad-c589-4e62-89f4-f7bea461bed5"
 *                       icon:
 *                         type: string
 *                         example: "electricity"
 *       500:
 *         description: Server error
 */
router.get('/', billsController.getAllBills);

/**
 * @swagger
 * /api/bills/{userId}:
 *   get:
 *     summary: Get bills by user ID
 *     description: Retrieve all bills for a specific user
 *     tags: [Bills]
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
 *         description: User's bills retrieved successfully
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
 *                       title:
 *                         type: string
 *                         example: "Electric Bill"
 *                       amount:
 *                         type: number
 *                         format: float
 *                         example: 150.00
 *                       due_date:
 *                         type: string
 *                         format: date
 *                         example: "2024-03-15"
 *                       due_day:
 *                         type: integer
 *                         example: 15
 *                       status:
 *                         type: string
 *                         enum: [paid, unpaid, soon]
 *                         example: "unpaid"
 *                       is_paid:
 *                         type: boolean
 *                         example: false
 *                       is_urgent:
 *                         type: boolean
 *                         example: false
 *                       user_id:
 *                         type: string
 *                         format: uuid
 *                         example: "f8055fad-c589-4e62-89f4-f7bea461bed5"
 *                       icon:
 *                         type: string
 *                         example: "electricity"
 *       400:
 *         description: Invalid user ID
 *       500:
 *         description: Server error
 */
router.get('/:userId', billsController.getAllBillsByUserId);

/**
 * @swagger
 * /api/bills:
 *   post:
 *     summary: Create a new bill
 *     description: Create a new bill for a user
 *     tags: [Bills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - amount
 *               - due_date
 *               - user_id
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Electric Bill"
 *               amount:
 *                 type: number
 *                 format: float
 *                 example: 150.00
 *               due_date:
 *                 type: string
 *                 format: date
 *                 example: "2024-03-15"
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 example: "f8055fad-c589-4e62-89f4-f7bea461bed5"
 *               icon:
 *                 type: string
 *                 example: "electricity"
 *     responses:
 *       201:
 *         description: Bill created successfully
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
 *                     title:
 *                       type: string
 *                       example: "Electric Bill"
 *                     amount:
 *                       type: number
 *                       format: float
 *                       example: 150.00
 *                     due_date:
 *                       type: string
 *                       format: date
 *                       example: "2024-03-15"
 *                     due_day:
 *                       type: integer
 *                       example: 15
 *                     status:
 *                       type: string
 *                       enum: [paid, unpaid, soon]
 *                       example: "unpaid"
 *                     is_paid:
 *                       type: boolean
 *                       example: false
 *                     is_urgent:
 *                       type: boolean
 *                       example: false
 *                     user_id:
 *                       type: string
 *                       format: uuid
 *                       example: "f8055fad-c589-4e62-89f4-f7bea461bed5"
 *                     icon:
 *                       type: string
 *                       example: "electricity"
 *                 message:
 *                   type: string
 *                   example: "Bill created successfully"
 *       400:
 *         description: Invalid input data
 *       409:
 *         description: Bill with this title already exists
 *       500:
 *         description: Server error
 */
router.post('/', billsController.addNewBill);

module.exports = router;
