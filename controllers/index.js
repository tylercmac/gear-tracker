const router = require('express').Router();
const apiRoutes = require('./api');
const homeRoutes = require('./home-routes.js')
const authRoutes = require('./auth-routes.js');

router.use('/portal', authRoutes)
router.use('/', homeRoutes);
router.use('/api', apiRoutes);


module.exports = router;