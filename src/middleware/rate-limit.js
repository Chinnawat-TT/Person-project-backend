
const { rateLimit } = require('express-rate-limit')

module.exports = rateLimit({
    windowMs : 1*60*1000,
    limit:1,
    message : 'fk stop request please '
})