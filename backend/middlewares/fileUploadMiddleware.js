const uploadErrorHandler = (err, req, res, next) => {
    if (err.code === 'FILE_TYPE_NOT_SUPPORTED') {
        return res.status(400).json({ message: err.message });
    }
    next();
}

module.exports = { uploadErrorHandler };