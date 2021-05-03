const router = require('express').Router();

const userRoutes = require('./user-routes.js')
const tripRoutes = require('./trip-routes.js')
const gearRoutes = require('./gear-routes.js')

router.use('/users', userRoutes);
router.use('/trips', tripRoutes);
router.use('/gear', gearRoutes);

module.exports = router;