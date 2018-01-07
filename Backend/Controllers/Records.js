
exports.init = ({ getRecords }) => {

    const getRecordsHandler = (req, res) => {
        getRecords().then(devices => res.json(devices));
    };

    let router = require('express').Router();

    router.get('/records', getRecordsHandler)
    
    return router;
};


