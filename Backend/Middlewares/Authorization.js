const jwt = require('jsonwebtoken');

const builder = shouldBeAdmin => (req, res, next) => {
    const auth = req.headers.authorization;

    if (auth == null)
        res.status(401).json({ err: 'Authorization required' });

    const token = auth.split(' ')[1];

    jwt.verify(token, 'MyLittleSecret', (err, payload) => {

        if (err != null) {
            res.status(401).json({ err });
            return;
        }

        const { permissions } = payload;

        if (shouldBeAdmin && permissions !== 'admin')
            res.status(401).json({ err: 'Admin privileges required' });

        next();
    });
};

exports.normal = builder(false);
exports.admin = builder(true);

