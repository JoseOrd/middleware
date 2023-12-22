import { Gateway, Wallets, } from 'fabric-network';
import fs from 'fs';
import path from "path";
import log4js from 'log4js';
import util from 'util';
import helper from '../controllers/helper.js';

const logger = log4js.getLogger('Query');


const query = async (channelName, chaincodeName, args, fcn, username, org_name) => {
    try {
        const ccp = await helper.getCCP(org_name) //JSON.parse(ccpJSON);

        const walletPath = await helper.getWalletPath(org_name) //.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        let identity = await wallet.get(username);
        if (!identity) {
            console.log(`An identity for the user ${username} does not exist in the wallet, so registering user`);
            await helper.getRegisteredUser(username, org_name, true)
            identity = await wallet.get(username);
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        const gateway = new Gateway();
        await gateway.connect(ccp, {
            wallet, identity: username, discovery: { enabled: true, asLocalhost: true }
        });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork(channelName);

        // Get the contract from the network.
        const contract = network.getContract(chaincodeName);
        let result = await contract.evaluateTransaction(fcn, args);

        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        await gateway.disconnect();

        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        // Intenta analizar el resultado como JSON
        try {
            result = JSON.parse(result.toString());
            return result;
        } catch (jsonError) {
            return result.toString();
        }

    } catch (error) {
            console.error(`Failed to evaluate transaction: ${error}`);
            throw error.message
    }
};

export default {
    query
};