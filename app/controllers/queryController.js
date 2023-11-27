import log4js from 'log4js';
import queryService from '../services/queryService.js';
const logger = log4js.getLogger('Query');

logger.level = 'DEBUG';

const queryChaincode = async (req, res) => {
   try {
        logger.debug('==================== QUERY BY CHAINCODE ==================');

        const { channelName, chaincodeName } = req.params;
        const { fcn, args, peer } = req.query;

        logger.debug('channelName : ' + channelName);
        logger.debug('chaincodeName : ' + chaincodeName);
        logger.debug('fcn : ' + fcn);
        logger.debug('args : ' + args);

        validateRequestFields({ chaincodeName, channelName, fcn, args });

        let message = await queryService.query(channelName, chaincodeName, args, fcn, req.username, req.orgname);

        const response_payload = {
            result: message,
            error: null,
            errorData: null
        }

        res.send(response_payload)
   } catch (error) {
        const response_payload = {
            result: null,
            error: error.name,
            errorData: error.message
        }
        res.send(response_payload)
   }
};


function validateRequestFields({ chaincodeName, channelName, fcn, args}) {
    if (!chaincodeName || !channelName || !fcn || !args) {
        throw new Error('Invalid request: channelName, chaincodeName, fcn, and args are required.');
    }
}

export default {
    queryChaincode
};