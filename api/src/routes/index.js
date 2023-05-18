const { Router } = require('express');
const countries = require('./country.router')
const activities = require('./activity.router')

const router = Router()

router.use('/countries',countries)
router.use('/activities',activities)


module.exports = router