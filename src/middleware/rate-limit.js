
const { rateLimit } = require('express-rate-limit')

module.exports = rateLimit({
    windowMs : 5*60*1000,
    limit:100,
    message : 'fk stop request please '
})