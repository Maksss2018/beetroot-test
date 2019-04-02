import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

router.post("/", (req, res, next) => {
    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token;
    if (!token) {
        return res.status(401).json({message: "Must pass token"});
    }
// Check token that was passed by decoding token using secret
    jwt.verify(token, process.env.JWT_SECRET, function (err, userData) {
        if (err) {
            res.status(500).json({errors: {global: err}});
        }
        let {iat, _id, ...user} = userData;
        res.status(200).json({user, token});
        /*
        db.collection('users').findOne({_id}, (err, doc) => {
            if (err) {
                res.status(500).json({errors: {global: err}});
                return;
            }
            //* because role of this user  can be changed from DB admin panel
            if (doc) {
                res.json({
                    user: doc,
                    token: token
                });
            } else {
                res.status(401).json({errors: {global: 'Invalid  ID '}});
            }
        });
        */
    });
});

export default router;
