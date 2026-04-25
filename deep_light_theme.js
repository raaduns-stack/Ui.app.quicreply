const fs = require('fs');
const path = require('path');

const dir = './dashboard';
const lightColors = {
    // Leftover backgrounds
    'bg-[#0f172a]': 'bg-gray-50',
    'bg-slate-900': 'bg-gray-50',
    'bg-slate-800': 'bg-gray-100',
    'bg-slate-700': 'bg-gray-200',
    'background:#0f172a': 'background:#f8fafc',
    'bg-slate-900/90': 'bg-white/90',

    // Specific to topbar search in shell.js
    'border border-[#1a1a27]': 'border border-gray-200',
    'text-gray-200 text-sm': 'text-gray-900 text-sm',
    'focus:border-emerald-500': 'focus:border-[#ba0031]',

    // Campaign Builder / Modal borders & styles
    'border-slate-700': 'border-gray-200',
    'text-[#e80040]': 'text-[#ba0031]',
    
    // Remaining specific emerald hover states
    'hover:border-emerald-600': 'hover:border-[#ba0031]',
    'accent-emerald-500': 'accent-[#ba0031]'
};

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js')) {
            if (file === 'shell.css') continue;
            
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Replace colors globally in the file
            for (const [darkClass, lightClass] of Object.entries(lightColors)) {
                if (content.includes(darkClass)) {
                    content = content.split(darkClass).join(lightClass);
                    modified = true;
                }
            }

            // Check specifically topbar input
            if (file === 'shell.js') {
                if (content.includes('bg-[#0f172a] border border-[#1a1a27] text-gray-200')) {
                    content = content.replace('bg-[#0f172a] border border-[#1a1a27] text-gray-200', 'bg-gray-50 border border-gray-200 text-gray-900');
                    modified = true;
                }
            }
            
            if (file === 'campaign-builder.html') {
                if (content.includes('bg-slate-900 rounded-xl border border-[#ba0031]/40')) {
                    content = content.replace(/bg-slate-900 rounded-xl border border-\[#ba0031\]\/40/g, 'bg-gray-50 rounded-xl border border-[#ba0031]');
                    modified = true;
                }
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Deep Light theme fixed in ${fullPath}`);
            }
        }
    }
}

processDirectory(dir);
console.log("Deep Light theme patch completed.");
