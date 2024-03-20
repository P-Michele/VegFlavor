const fs = require('fs');
const path = require('path');

// Specify the file path
function deleteFile(filename) {
    // Specify the uploads folder path
    const filePath = path.join(__dirname,'..', 'uploads',filename);

    // Use fs.unlink to delete the file
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting file:', err);
            return;
        }
        console.log('File deleted successfully');
    });
}

module.exports={deleteFile};