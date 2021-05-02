function apiAuth(req,res,next){
    if(!req.session.user){
        return res.status(401).send('Not logged in!')
    } else {
        next();
    }
};

module.exports = apiAuth;