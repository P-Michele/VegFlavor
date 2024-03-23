const fs = require('fs').promises;
const path = require('path');

function deleteFile(filename) {
    return new Promise((resolve, reject) => {
        const filePath = path.join(__dirname, '..', 'uploads', filename);
        
        fs.unlink(filePath, (error) => {
            if (error) {
                reject(error);
            } else {
                resolve();
            }
        });
    });
}

module.exports = { deleteFile };