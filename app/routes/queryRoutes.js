import express from "express";
import queryController from "../controllers/queryController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Query
 *   description: Endpoints for querying the chaincode on a specific channel.
 */

/**
 * @swagger
 * /api/v0/channels/{channelName}/chaincodes/{chaincodeName}:
 *   get:
 *     summary: Query the chaincode on a specific channel
 *     tags: [Query]
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
 *       - in: query
 *         name: args
 *         description: An string of arguments for the chaincode function
 *         required: false
 *         schema:
 *           type: string
 *         example: "jhonDoe@gmail.com"
 *       - in: query
 *         name: fcn
 *         description: The name of the chaincode function to invoke
 *         required: true
 *         schema:
 *           type: string
 *         example: "GetWalletByID"
 *     responses:
 *       '200':
 *         description: Successfully queried the chaincode
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/QueryResponse'
 *       '400':
 *         description: Bad request. Missing required parameters.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       '401':
 *         description: Unauthorized. Failed to authenticate token.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UnauthorizedResponse'
 */
router.get('/channels/:channelName/chaincodes/:chaincodeName', queryController.queryChaincode);

export default router;
