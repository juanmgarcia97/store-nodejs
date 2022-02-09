function badCredentials (err, req, res, next) {
    res.status(401).json({
        message: err.message
    })
}

module.exports = {badCredentials}