import log4js from 'log4js';
import invokeService from '../services/invokeService.js';

const logger = log4js.getLogger('Invoke');
logger.level = 'DEBUG';


const invokeTransaction = async (req, res) => {
    try {
        logger.debug('==================== INVOKE ON CHAINCODE ==================');

        const { fcn, args } = req.body;
        const { channelName, chaincodeName } = req.params;

        logger.debug('channelName  : ' + channelName);
        logger.debug('chaincodeName : ' + chaincodeName);
        logger.debug('fcn  : ' + fcn);
        logger.debug('args  : ' + args);

        validateRequestFields({ chaincodeName, channelName, fcn, args });

        let message = await invokeService.invoke(channelName, chaincodeName, fcn, args, req.username, req.orgname);
        console.log(`message result is : ${message}`)

        const response_payload = {
            result: message,
            error: null,
            errorData: null
        }
        res.send(response_payload);


    } catch (error) {
        const response_payload = {
            result: null,
            error: error
        }
        res.status(500).send(response_payload)
    }
};

function validateRequestFields({ chaincodeName, channelName, fcn, args}) {
    if (!chaincodeName || !channelName || !fcn || !args) {
        throw new Error('Invalid request: channelName, chaincodeName, fcn, and args are required.');
    }
}

export default {
    invokeTransaction
};