const fs = require('fs');
const path = require('path');

const dir = './dashboard';
const brandColors = {
    'bg-emerald-600': 'bg-[#ba0031]',
    'bg-emerald-700': 'bg-[#e80040]',
    'text-emerald-400': 'text-[#e80040]',
    'text-emerald-500': 'text-[#ba0031]',
    'text-emerald-300': 'text-[#fca5a5]',
    'text-emerald-200': 'text-[#fca5a5]',
    'border-emerald-700': 'border-[#ba0031]',
    'border-emerald-400': 'border-[#e80040]',
    'bg-emerald-900': 'bg-[#3b000e]',
    'bg-emerald-500': 'bg-[#ba0031]',
    'ring-emerald-500': 'ring-[#e80040]',
    'text-emerald-600': 'text-[#ba0031]',
    'border-transparent border-l-emerald': 'border-transparent border-l-[#ba0031]'
};

function processDirectory(directory) {
    const files = fs.readdirSync(directory);
    for (const file of files) {
        const fullPath = path.join(directory, file);
        if (fs.statSync(fullPath).isDirectory()) {
            processDirectory(fullPath);
        } else if (fullPath.endsWith('.html') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
            if (file === 'shell.css') continue; // Handled manually
            
            let content = fs.readFileSync(fullPath, 'utf8');
            let modified = false;

            // Optional: specifically replace the sidebar logo in sidebar.js
            if (file === 'sidebar.js') {
                const oldLogoHtml = `<div class="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center flex-shrink-0">\n        <span class="material-symbols-outlined text-white" style="font-size:18px">bolt</span>\n      </div>\n      <span class="sidebar-logo-text font-extrabold text-white text-lg tracking-tight">QuicReply</span>`;
                const newLogoHtml = `<img src="../assets/images/logo.png" alt="QuicReply" class="h-6 sm:h-8 sidebar-logo-image transition-transform hover:scale-105 duration-300 cursor-pointer" />`;
                if (content.includes(oldLogoHtml)) {
                    content = content.replace(oldLogoHtml, newLogoHtml);
                    modified = true;
                }
                
                // Specific sidebar replacements
                if (content.includes('border-slate-800')) {
                   content = content.replace(/border-slate-800/g, 'border-[#1a1a27]');
                   modified = true;
                }
                if (content.includes('border-slate-700')) {
                   content = content.replace(/border-slate-700/g, 'border-[#252535]');
                   modified = true;
                }
            }

            // Replace emerald colors with specific hex codes using Regex bounds to avoid breaking
            for (const [emeraldClass, brandClass] of Object.entries(brandColors)) {
                // regex matching the exact class (avoid replacing something like bg-emerald-600/50 accidentally losing the /50 unless specified)
                // Actually, wait, let's just replace the color portion
                const searchStr = emeraldClass;
                if (content.includes(searchStr)) {
                    content = content.split(searchStr).join(brandClass);
                    modified = true;
                }
            }

            // Replace "badge-green" with "badge-red-brand" wherever it refers to an active/selected status,
            // but keep badge-green for "Resolved", "Live", "Converted", "Online", etc.
            // On second thought, let's keep badge-green as green semantics. 

            // Fix filter-chip style script in conversations.html which has hardcoded green colors
            if (file === 'conversations.html') {
                if (content.includes('#064e3b; color:#34d399; border-color:#059669;')) {
                    content = content.replace('#064e3b; color:#34d399; border-color:#059669;', '#3b000e; color:#fca5a5; border-color:#ba0031;');
                    modified = true;
                }
            }
            // Fix automation.html which has similar hardcoded css
            if (file === 'automation.html') {
                if (content.includes('background:#059669;')) {
                    content = content.replace(/background:#059669;/g, 'background:#ba0031;');
                    modified = true;
                }
                if (content.includes('background:#047857;')) {
                    content = content.replace(/background:#047857;/g, 'background:#e80040;');
                    modified = true;
                }
            }

            if (modified) {
                fs.writeFileSync(fullPath, content, 'utf8');
                console.log(`Updated ${fullPath}`);
            }
        }
    }
}

processDirectory(dir);
console.log("Done.");
