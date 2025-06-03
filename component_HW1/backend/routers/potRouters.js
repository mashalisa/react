const express = require('express');
const router = express.Router();
const potsController = require('../controllers/potsController');

/**
 * @swagger
 * components:
 *   schemas:
 *     Pot:
 *       type: object
 *       required:
 *         - name
 *         - goal_amount
 *         - user_id
 *         - theme
 *         - current_amount
 *       properties:
 *         id:
 *           type: string
 *           format: uuid
 *           description: The auto-generated UUID of the pot
 *         name:
 *           type: string
 *           description: The name of the pot
 *         goal_amount:
 *           type: number
 *           format: float
 *           description: The target amount for the pot
 *         current_amount:
 *           type: number
 *           format: float
 *           description: The current amount in the pot
 *           default: 0
 *         user_id:
 *           type: string
 *           format: uuid
 *           description: The ID of the user who owns the pot
 *         theme:
 *           type: string
 *           enum: [green, yellow, red, blue, purple, orange, pink, brown, gray, black, white, cyan, navy, magenta, army, fuchsia, teal]
 *           description: The color theme of the pot
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date the pot was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date the pot was last updated
 */

/**
 * @swagger
 * /api/pots:
 *   get:
 *     summary: Returns all pots
 *     tags: [Pots]
 *     responses:
 *       200:
 *         description: The list of pots
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pot'
 *       500:
 *         description: Server error
 */
router.get('/', potsController.getAllVaults);

/**
 * @swagger
 * /api/pots/{id}:
 *   get:
 *     summary: Get a pot by ID
 *     tags: [Pots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The pot ID
 *     responses:
 *       200:
 *         description: The pot description by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pot'
 *       404:
 *         description: The pot was not found
 *       500:
 *         description: Server error
 */
router.get('/id/:id', potsController.getVaultById);

/**
 * @swagger
 * /api/pots/{userId}/groupByName:
 *   get:
 *     summary: Get all vaults for a user, grouped by name
 *     tags: [Pots]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of vaults grouped by name
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               additionalProperties:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Pot'
 *               example:
 *                 "Debt":
 *                   - id: "uuid"
 *                     name: "Debt"
 *                     goal_amount: 1000
 *                     current_amount: 500
 *                     user_id: "uuid"
 *                     theme: "red"
 *                   - id: "uuid"
 *                     name: "Debt"
 *                     goal_amount: 2000
 *                     current_amount: 1000
 *                     user_id: "uuid"
 *                     theme: "blue"
 *                 "Savings":
 *                   - id: "uuid"
 *                     name: "Savings"
 *                     goal_amount: 5000
 *                     current_amount: 2500
 *                     user_id: "uuid"
 *                     theme: "green"
 *       404:
 *         description: No vaults found
 *       500:
 *         description: Server error
 */
router.get('/:userId/groupByName', potsController.getAllVaultsByUserIdGroupByName);

/**
 * @swagger
 * /api/pots/{name}/{userId}:
 *   get:
 *     summary: Get all pots by user ID and name
 *     tags: [Pots]
 *     parameters:
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The pot name to search for
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of pots matching the criteria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Pot'
 *       404:
 *         description: No pots found
 *       500:
 *         description: Server error
 */
router.get('/:name/:userId', potsController.getAllVaultsByNameByUserId);

/**
 * @swagger
 * /api/pots/{userId}:
 *   get:
 *     summary: Get all vaults for a specific user
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The user ID
 *     responses:
 *       200:
 *         description: List of vaults for the user
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
 *                       goal_amount:
 *                         type: number
 *                       current_amount:
 *                         type: number
 *                       user_id:
 *                         type: string
 *       404:
 *         description: No vaults found for this user
 *       500:
 *         description: Server error
 */
router.get('/:userId', potsController.getAllVaultsByUserId);

/**
 * @swagger
 * /api/pots:
 *   post:
 *     summary: Create a new pot
 *     tags: [Pots]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pot'
 *     responses:
 *       201:
 *         description: The pot was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pot'
 *       400:
 *         description: Invalid input
 *       500:
 *         description: Server error
 */
router.post('/', potsController.addNewVault);

/**
 * @swagger
 * /api/pots/{id}:
 *   put:
 *     summary: Update a vault's current amount by ID
 *     tags: [Pots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The vault ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - current_amount
 *             properties:
 *               current_amount:
 *                 type: number
 *                 format: float
 *                 description: The new current amount for the vault
 *             example:
 *               current_amount: 5000.50
 *     responses:
 *       200:
 *         description: The vault's current amount was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pot'
 *       404:
 *         description: The vault was not found
 *       500:
 *         description: Server error
 */
router.put('/:id', potsController.editVault);

/**
 * @swagger
 * /api/pots/{id}:
 *   delete:
 *     summary: Delete a pot by ID
 *     tags: [Pots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The pot ID
 *     responses:
 *       200:
 *         description: The pot was deleted
 *       404:
 *         description: The pot was not found
 *       500:
 *         description: Server error
 */
router.delete('/:id', potsController.deleteVault);

module.exports = router;
