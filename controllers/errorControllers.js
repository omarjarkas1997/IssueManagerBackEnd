

catch404Errors = (req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
}

errorHandler = (err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: err.message
    })
}

module.exports = {
    catch404Errors,
    errorHandler
}