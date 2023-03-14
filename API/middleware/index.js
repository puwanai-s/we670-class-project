const admin = require('./../config/firebase');

class Middleware {
    async decodeToken(req, res, next) {
        if (!req.headers.authorization) {
            return res.status(401).json({ message: 'Authorization header is required' });
        }

        const token = req.headers.authorization.split('Bearer ')[1];
        try {
            const decodeValue = await admin.auth().verifyIdToken(token);
            if (decodeValue) {
                req.currentUser = decodeValue;
                return next();
            }
            return res.status(401).json({ message: 'Unauthorized' });
        } catch (e) {
            return res.status(500).json({ message: e.code });
        }
    }
}

module.exports = new Middleware();