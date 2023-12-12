// app/docs/swagger.js

import swaggerJSDoc from 'swagger-jsdoc';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Middleware Tesseract Blockchain v0',
            version: '0.1.0 (Beta)',
            description: 'An agile solution designed to work with Hyperledger Fabric networks. Using Docker and NodeJS, it streamlines interaction with smart contracts and facilitates off-chain data storage through IPFS. Ideal for secure transaction execution.',
        },
        servers: [
            {
              url: "http://localhost:3000",
            },
            {
                url: 'http://54.241.19.197/',
                description: 'Servidor de producción',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer'
                }
              },
            schemas: {
                IPFSRequest: {
                    type: 'object',
                    properties: {
                        data: {
                            type: 'string',
                            description: 'Data to be uploaded to IPFS',
                        },
                    },
                    required: ['data'],
                },
        
                IPFSResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            description: 'Indicates if the IPFS operation was successful',
                        },
                        result: {
                            type: 'object',
                            description: 'Result of the IPFS operation',
                            // Puedes ajustar las propiedades según la respuesta real de IPFS
                        },
                    },
                },
                User: {
                    type: 'object',
                    properties: {
                        username: {
                            type: 'string',
                            description: 'The username of the user',
                        },
                        orgName: {
                            type: 'string',
                            description: 'The organization name of the user',
                        },
                    },
                    required: ['username', 'orgName'],
                },
                InvokeTransaction: {
                    type: 'object',
                    properties: {
                        // peers: {
                        //     type: 'array',
                        //     description: 'An array of target peers',
                        //     example: ["peer0.org1.example.com", "peer0.org2.example.com"],
                        //     items: {
                        //         type: 'string',
                        //     },
                        // },
                        fcn: {
                            type: 'string',
                            description: 'The name of the chaincode function to invoke',
                            example: 'CreateWallet',
                        },
                        args: {
                            type: 'array',
                            description: 'An array of arguments for the chaincode function',
                            example: ["jhonDoe@gmail.com", "hashipfs"],
                            items: {
                                type: 'string',
                            },
                        },
                        // transient: {
                        //     type: 'object',
                        //     description: 'Transient data for the transaction',
                        // },
                    },
                    required: ['fcn', 'args'],
                },
                UnauthorizedResponse: {
                    type: 'object',
                    properties: {
                        success: {
                            type: 'boolean',
                            description: 'Indicates if the request was successful or not',
                            example: false,
                        },
                        message: {
                            type: 'string',
                            description: 'Error message indicating failure to authenticate the token',
                            example: 'Failed to authenticate token. Make sure to include the token returned from /users call in the authorization header as a Bearer token',
                        },
                    },
                },
                InvokeTransactionResponse: {
                    type: 'object',
                    properties: {
                        result: {
                            type: 'string',
                            description: 'Result of the transaction invocation',
                        },
                        error: {
                            type: 'string',
                            description: 'Error name (if any)',
                        },
                        errorData: {
                            type: 'string',
                            description: 'Details of the error (if any)',
                        },
                    },
                },
                QueryResponse: {
                    type: 'object',
                    properties: {
                        result: {
                            type: 'string',
                            description: 'Result of the chaincode query',
                        },
                        error: {
                            type: 'string',
                            description: 'Error name (if any)',
                        },
                        errorData: {
                            type: 'string',
                            description: 'Details of the error (if any)',
                        },
                    },
                },
                ErrorResponse: {
                    type: 'object',
                    properties: {
                        result: {
                            type: 'null',
                        },
                        error: {
                            type: 'string',
                            description: 'Error name',
                        },
                        errorData: {
                            type: 'string',
                            description: 'Details of the error',
                        },
                    },
                },
                IPFSRequest:{
                    type: 'object',
                    properties: {
                        data: {
                            type: 'string',
                            description: 'Data to be uploaded to IPFS',
                        },
                    },
                    required: ['data'],
                },
            },
        },
        security: [
            {
              bearerAuth: [],
            },
        ],

    },
    // Rutas de documentos
    apis: [path.resolve(__dirname, '../routes/*.js')],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
