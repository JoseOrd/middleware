import express from 'express';
import invokeController from '../controllers/invokeController.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Invoke
 *   description: Endpoints for invoking transactions on the chaincode.
*/

/**
 * @swagger
 * /api/v0/channels/{channelName}/chaincodes/{chaincodeName}:
 *   post:
 *     summary: Invoke a transaction on the chaincode
 *     tags: [Invoke]
 *     parameters:
 *       - in: path
 *         name: channelName
 *         description: The name of the channel
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: chaincodeName
 *         description: The name of the chaincode
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Request body for invoking the transaction
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InvokeTransaction'
 *     responses:
 *       '200':
 *         description: Successfully invoked the transaction
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InvokeTransactionResponse'
 *       '400':
 *         description: Bad request. Missing required parameters.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
router.post('/channels/:channelName/chaincodes/:chaincodeName', invokeController.invokeTransaction);

export default router;