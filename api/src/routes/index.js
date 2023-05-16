const { Router } = require('express');
const countries = require('./country.router')

const router = Router()

router.use('/countries',countries)


module.exports = router