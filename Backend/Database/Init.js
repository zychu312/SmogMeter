const url = 'mongodb://localhost:27017/mydb';

const mongoClient = require('mongodb').MongoClient;

exports.init = async () => {
    const connection = await mongoClient.connect(url);
    const forgeDb = await connection.db('mydb');
    const recordsCollection = await forgeDb.createCollection('records');
    return {
        recordsRepository: require('./Repositories/Records').builder(recordsCollection)
    };
};



