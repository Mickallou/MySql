export const guard = (req, res, next) => {
    if (req.session.user) {
        next();
    } else {
        res.status(401).send("User is not authenticated");
    }
}

export const bussinessGuard = (req, res, next) => {
    if (req.session.user?.isBussines){
        next();
    } else {
        res.status(401).send("User is not a bussiness");
    }
}