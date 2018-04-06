const path = require('path');
const fs = require('fs');

exports.dir = (function() {
    const dir = path.join(process.cwd(), 'public', 'images', 'upload');

    if (!fs.existsSync(dir)) {
        fs.mkdir(dir);
    }

    return dir;
})();