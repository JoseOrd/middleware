import jwt from 'jsonwebtoken';
import util from 'util';
import log4js from 'log4js';
import dotenv from 'dotenv';

dotenv.config();
const logger = log4js.getLogger('app');
const secretKey = process.env.JWT_SECRET || '';

const verifyToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secretKey, (err, decoded) => {
      if (err) {
        reject(err);
      } else {
        resolve(decoded);
      }
    });
  });
};

export const checkJWT = async (req, res, next) => {
  logger.debug(`New req for ${req.originalUrl}`);

  try {
    if (req.originalUrl.includes('/users') || req.originalUrl.includes('/register')) {
      return next();
    }

    const token = req.headers.authorization?.split('Bearer ')[1]?.trim() || '';
    if (!token) {
      throw new Error('Token not provided');
    }

    const decoded = await verifyToken(token);
    req.username = decoded.username;
    req.orgname = decoded.orgName;

    logger.debug(util.format('Decoded from JWT token: username - %s, orgname - %s', decoded.username, decoded.orgName));
    next();
  } catch (error) {
    logger.error(`Error: ${error.message}`);
    res.status(401).json({
      success: false,
      message: 'Failed to authenticate token. Make sure to include the ' +
        'token returned from /users call in the authorization header ' +
        ' as a Bearer token',
    });
  }
};
