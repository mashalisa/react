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
router.get('/', potsController.getAllPots);

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
router.get('/:id', potsController.getPotById);

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
router.post('/', potsController.addNewPot);

/**
 * @swagger
 * /api/pots/{id}:
 *   put:
 *     summary: Update a pot by ID
 *     tags: [Pots]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The pot ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Pot'
 *     responses:
 *       200:
 *         description: The pot was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Pot'
 *       404:
 *         description: The pot was not found
 *       500:
 *         description: Server error
 */
router.put('/:id', potsController.editPot);

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
router.delete('/:id', potsController.deletePot);

/**
 * @swagger
 * /api/pots/{userId}/{name}:
 *   get:
 *     summary: Get all pots by user ID and name
 *     tags: [Pots]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *           format: uuid
 *         required: true
 *         description: The user ID
 *       - in: path
 *         name: name
 *         schema:
 *           type: string
 *         required: true
 *         description: The pot name to search for
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
router.get('/:userId/:name', potsController.getAllPotsByNameByUserId);

/**
 * @swagger
 * /api/pots/{userId}:
 *   get:
 *     summary: Get all pots by user ID
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
 *         description: List of pots for the user
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
router.get('/:userId', potsController.getAllPotsByUserId);

module.exports = router;
