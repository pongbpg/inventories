const router = require('express').Router();

var controllers = require('../controllers/accounts');

router.get('/', controllers.index)


module.exports = router;