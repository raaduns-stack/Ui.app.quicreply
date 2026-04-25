const fs = require('fs');
const path = require('path');

const dir = './dashboard';
const lightColors = {
    // Backgrounds replacing Dark backgrounds
    'bg-[#0c0c13]': 'bg-white',
    'bg-[#1a1a27]': 'bg-white',
    'bg-[#252535]': 'bg-gray-100',
    'border-[#1a1a27]': 'border-gray-200',
    'border-[#252535]': 'border-gray-200',

    // Slate dark texts to light
    'text-white': 'text-gray-900',
    'text-slate-200': 'text-gray-800',
    'text-slate-400': 'text-gray-600',
    'text-slate-500': 'text-gray-500',
    'text-slate-600': 'text-gray-400',
    'text-slate-300': 'text-gray-700',
    'border-slate-800': 'border-gray-200',
    'border-slate-700': 'border-gray-200',
    'hover:bg-slate-700': 'hover:bg-gray-100',
    'hover:bg-slate-800': 'hover:bg-gray-50',

    // Crimson dark overrides
    'bg-[#3b000e]': 'bg-red-50',
    'text-[#fca5a5]': 'text-[#ba0031]',
    
    // Custom hub-card in conversations.html
    'background:#1e293b; border:1px solid #334155;': 'background:#ffffff; border:1px solid #e5e7eb;',
    'border-color:#475569;': 'border-color:#d1d5db; box-shadow:0 4px 6px rgba(0,0,0,0.05);',
    'color:#64748b;': 'color:#4b5563;',
    'color:#e2e8f0; background:#1e293b;': 'color:#111827; background:#f3f4f6;',
    'color:#34d399;': 'color:#ba0031;',
    'border-slate-900': 'border-white',
    'border-2 border-slate-900': 'border-2 border-white',
    
    // index.html special colors
    'bg-slate-700/40': 'bg-gray-100',
    'bg-slate-800/50': 'bg-gray-50',
    'bg-slate-900/50': 'bg-white',
    'border-emerald-700/40': 'border-[#fecaca]',
    'bg-emerald-900/20': 'bg-[#fff1f2]',
    'bg-emerald-700/40': 'bg-[#ffe4e6]',
    
    // Team page
    'bg-slate-800': 'bg-gray-100'
};

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js')) {
            if (file === 'shell.css' || file === 'shell.js') continue;
            
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Replace colors
            for (const [darkClass, lightClass] of Object.entries(lightColors)) {
                if (content.includes(darkClass)) {
                    content = content.split(darkClass).join(lightClass);
                    modified = true;
                }
            }

            // specific sidebar logo fix
            if (file === 'sidebar.js') {
                const searchTxt = 'border-b border-[#1a1a27]';
                if(content.includes(searchTxt)) {
                    content = content.replace(searchTxt, 'border-b border-gray-200');
                    modified = true;
                }
                const oldAvatarTxt = 'avatar bg-[#ba0031] text-[#fca5a5]';
                if(content.includes(oldAvatarTxt)) {
                    content = content.split(oldAvatarTxt).join('avatar bg-[#ba0031] text-white');
                    modified = true;
                }
            }
            
            // automation html background lines
            if (file === 'automation.html') {
                if (content.includes('background:#1a1a27')) {
                    content = content.replace(/background:#1a1a27/g, 'background:#ffffff');
                    modified = true;
                }
                if (content.includes('border:#334155')) {
                    content = content.replace(/border:#334155/g, 'border-color:#e5e7eb');
                    modified = true;
                }
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated to light ${fullPath}`);
            }
        }
    }
}

processDirectory(dir);
console.log("Light theme pass done.");
