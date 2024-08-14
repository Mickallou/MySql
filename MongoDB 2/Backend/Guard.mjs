import jwt from 'jsonwebtoken';

export const guard = (req, res, next) => {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            res.status(401).send("User is not authenticated");
            return;
        } else {
            next();
        }
    }) 
}

export const bussinessGuard = (req, res, next) => {
    jwt.verify(req.headers.authorization, process.env.JWT_SECRET, (err, data) => {
        if (err) {
            res.status(401).send("User is not authenticated");
            return;
        } else {
            if (data.isBusiness || data.isAdmin) {
                next();
            } else {
                res.status(403).send("User is not authorized");
            }
        }
    }) 
}

export const getUser = (req) => {
    if (!req.headers.authorization) {
        return null
    }

    const user = jwt.verify(req.headers.authorization, process.env.JWT_SECRET);

    if(!user) {
        return null;
    }

    return user;
}