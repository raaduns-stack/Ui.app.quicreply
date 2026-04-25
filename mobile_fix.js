const fs = require('fs');
const path = require('path');

const dir = './dashboard';

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.html')) {
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Fix card layout overflow on mobile caused by hardcoded desktop negative margin
            if (content.includes('overflow-x-auto -mx-6')) {
                content = content.replace(/overflow-x-auto -mx-6/g, 'overflow-x-auto -mx-4 lg:-mx-6');
                modified = true;
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Mobile responsive fix applied to ${fullPath}`);
            }
        }
    }
}

processDirectory(dir);
console.log("Mobile responsiveness pass completed.");
