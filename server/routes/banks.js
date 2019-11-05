const router = require('express').Router();
var controllers = require('../controllers/banks');

router.get('/', controllers.index)

module.exports = router;