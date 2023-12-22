import { Gateway, Wallets, DefaultEventHandlerStrategies } from 'fabric-network';
import log4js from 'log4js';
import util from 'util';
import path from 'path';
import helper from '../controllers/helper.js';

const logger = log4js.getLogger('Invoke');

const invoke = async (channelName, 
                                chaincodeName, 
                                fcn,
                                args,
                                username,
                                org_name) => {

    try {
        logger.debug(util.format('\n============ invoke transaction on channel %s ============\n', channelName));

        const ccp = await helper.getCCP(org_name);

        const walletPath = await helper.getWalletPath(org_name)
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        let identity = await wallet.get(username);
        if (!identity) {
            console.log(`An identity for the user ${username} does not exist in the wallet, so registering user`);
            await helper.getRegisteredUser(username, org_name, true)
            identity = await wallet.get(username);
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        const connectOptions = {
            wallet, identity: username, discovery: { "enabled": true, "asLocalhost": true },
            eventHandlerOptions: {
                commitTimeout: 100,
                strategy: DefaultEventHandlerStrategies.NETWORK_SCOPE_ALLFORTX
            }
        }

         // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, connectOptions);

          // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channelName);

        const contract = network.getContract(chaincodeName);

        let result = await contract.submitTransaction(fcn, ...args);
        let message = `Successfully added to the ledger`;
        
        await gateway.disconnect();

        console.log(result.toString());

        const response_payload = {
            result: result.toString() === '' ? 'Transaction has been successfully submitted' : JSON.parse(result.toString()) ,
            message,
        };

        return response_payload;

    } catch (error) {
        console.log(`Getting error invoke transaction: ${error}`)

        const errorDetails = error.message || 'Unknown error occurred';

        // Utilizar expresiones regulares para extraer el mensaje específico
        const regexResult = /message=(.+)$/.exec(errorDetails);
        const specificErrorMessage = regexResult? regexResult[1] : 'Error details not available';

        throw specificErrorMessage;
    }
};

export default {
    invoke
}