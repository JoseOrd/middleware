import express from 'express';
import dotenv from 'dotenv';
import { checkJWT } from './middlewares/jwtMiddleware.js';
import RouterAPI from './routes/indexRoutes.js';
import swaggerUI from 'swagger-ui-express';
import swaggerSpec from './docs/swagger.js';

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;

app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));

app.get('/', (req, res) => {
    res.send('Middellware Tesseract Blockchain v0 with Docker and NodeJS');
});

app.use(express.json({limit: '5mb'}));
app.use(checkJWT);
app.use(RouterAPI);

app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running on port ${PORT}`);
});


