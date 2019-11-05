const router = require('express').Router();
const banks = require('./banks');
const accounts = require('./accounts');

router.use('/banks', banks)
router.use('/accounts', accounts)

module.exports = router