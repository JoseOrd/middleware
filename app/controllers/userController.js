import log4js from 'log4js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import helper from '../controllers/helper.js';

dotenv.config();
const logger = log4js.getLogger('Users');

const jwt_expiretime = parseInt(process.env.JWT_EXPIRETIME || '');
const jwt_secret = process.env.JWT_SECRET || '';

const register = async (req, res) => {
    try {
        const { username, orgName } = req.body;

        logger.debug('End point: /users/register');
        logger.debug(`User name: ${username}`);
        logger.debug(`Org name: ${orgName}`);

        validateRequestFields({ username, orgName });

        const token = generateToken({ username, orgName });

        let response = await helper.getRegisteredUser(username, orgName, true);

        if (response && typeof response !== 'string') {
            logger.debug(`Successfully registered the username ${username} for organization ${orgName}`);
            response.token = token;
            res.json(response);
        } else {
            handleRegistrationError(res, username, orgName, response);
        }
    } catch (error) {
        handleServerError(res, error);
    }
};

const login = async (req, res) => {
    try {
        const { username, orgName } = req.body;

        logger.debug('End point: /users/login');
        logger.debug(`User name: ${username}`);
        logger.debug(`Org name: ${orgName}`);

        validateRequestFields({ username, orgName });

        const token = generateToken({ username, orgName });

        let isUserRegistered = await helper.isUserRegistered(username, orgName);

        if (isUserRegistered) {
            res.json({ success: true, message: { token } });
        } else {
            res.json({
                success: false,
                message: `User with username ${username} is not registered with ${orgName}, Please register first.`,
            });
        }
    } catch (error) {
        handleServerError(res, error);
    }
};

function validateRequestFields({ username, orgName }) {
    if (!username || !orgName) {
        throw new Error('Invalid request: Username and orgName are required.');
    }
}

function generateToken({ username, orgName }) {
    return jwt.sign({
        exp: Math.floor(Date.now() / 1000) + jwt_expiretime,
        username,
        orgName,
    }, jwt_secret);
}

function handleRegistrationError(res, username, orgName, response) {
    logger.debug(`Failed to register the username ${username} for organization ${orgName} with: ${response}`);
    res.json({ success: false, message: response });
}

function handleServerError(res, error) {
    logger.error(`Internal Server Error: ${error}`);
    res.status(500).json({ success: false, message: 'Internal Server Error ' + error.toString() });
}

export default {
    register,
    login,
};
