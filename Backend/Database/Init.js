const url = 'mongodb://192.168.0.14:27017';
const mongoClient = require('mongodb').MongoClient;

exports.init = async () => {
    const connection = await mongoClient.connect(url);
    const forgeDb = await connection.db('mydb');
    const recordsCollection = await forgeDb.createCollection('records');
    return {
        recordsRepository: require('./Repositories/Records').builder(recordsCollection)
    };
};



