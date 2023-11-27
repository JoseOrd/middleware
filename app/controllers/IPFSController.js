import * as ipfsClient from 'ipfs-http-client';


const ipfs = ipfsClient.create({ host: '127.0.0.1', port: 5001, protocol: 'http' });

const add = async (req, res) => {
    try {
        const { data } = req.body;
        const result = await ipfs.add(Buffer.from(JSON.stringify(data)));
        res.json({ success: true, result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

const get = async (req, res) => {
    try {
        const { hash } = req.params;
        const chunks = [];
        
        // Itera sobre el generador para obtener los chunks de datos
        for await (const chunk of ipfs.cat(hash)) {
            chunks.push(chunk);
        }

        // Combina los chunks en un búfer
        const resultBuffer = Buffer.concat(chunks);

        // Convierte el búfer a una cadena
        const resultString = resultBuffer.toString('utf-8');

        // Analiza la cadena JSON para obtener un objeto json
        const resultObject = JSON.parse(resultString);

        res.json({ success: true, result: resultObject });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, error: error.message });
    }
};

export default {
    add,
    get
};