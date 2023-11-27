import express from 'express';
import IPFSController from '../controllers/IPFSController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: DB Off-Chain
 *   description: Endpoints for interacting with db to store and retrieve off-chain data.
*/

/**
 * @swagger
 * /api/v0/db/{hash}:
 *   get:
 *     summary: Retrieve data from DB
 *     tags: [DB Off-Chain]
 *     parameters:
 *       - in: path
 *         name: hash
 *         description: Hash of the data to be retrieved from DB
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successfully retrieved data from DB
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IPFSResponse'
 *       '400':
 *         description: Bad request. Failed to retrieve data from DB.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.get('/:hash', IPFSController.get);

/**
 * @swagger
 * /api/v0/db/:
 *   post:
 *     summary: Add data to DB
 *     tags: [DB Off-Chain]
 *     requestBody:
 *       description: Request body for adding data to DB
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/IPFSRequest'
 *     responses:
 *       '201':
 *         description: Successfully added data to DB
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/IPFSResponse'
 *       '400':
 *         description: Bad request. Failed to add data to DB.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/', IPFSController.add);

export default router;
