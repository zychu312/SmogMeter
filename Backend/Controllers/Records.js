
exports.init = ({ getRecords }) => {

    const getRecordsHandler = async (req, res) => {

        const fromDate = new Date(parseInt(req.params.from));
        const toDate = new Date(parseInt(req.params.to));

        getRecords(fromDate, toDate).then(devices => res.json(devices));
    };

    let router = require('express').Router();

    router.get('/records/:from/:to', getRecordsHandler);
    
    return router;
};


