const fs = require('fs').promises;
const path = require('path');

function deleteFile(filename) {
    const filePath = path.join(__dirname, '..', 'uploads', filename);
    return fs.unlink(filePath);
}

module.exports = { deleteFile };