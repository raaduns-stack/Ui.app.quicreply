const fs = require('fs');
const path = require('path');

const lightColors = {
    // Backgrounds
    'bg-[#0b1120]': 'bg-[#f7f8fa]',
    'bg-slate-900/90': 'bg-white/90',
    'bg-slate-800': 'bg-gray-100',
    'bg-slate-800/50': 'bg-gray-50',
    'bg-slate-900': 'bg-white',
    // Borders
    'border-slate-800': 'border-gray-200',
    'border-slate-700': 'border-gray-200',
    // Text
    'text-slate-200': 'text-gray-800',
    'text-slate-400': 'text-gray-600',
    'text-slate-500': 'text-gray-500',
    'text-slate-600': 'text-gray-400',
    'text-white': 'text-gray-900',
    // Emerald replacements
    'bg-emerald-600': 'bg-[#ba0031]',
    'bg-emerald-700/30': 'bg-[#ffe4e6]',
    'border-emerald-700/50': 'border-[#fecaca]',
    'text-emerald-400': 'text-[#ba0031]',
    'text-emerald-300': 'text-[#e80040]',
    'bg-emerald-800/60': 'bg-[#fff1f2]',
    // Other specific colors
    'bg-blue-700/30': 'bg-blue-50',
    'text-blue-400': 'text-blue-600',
    'bg-orange-700/30': 'bg-orange-50',
    'text-orange-400': 'text-orange-600',
    'bg-[#1e293b]': 'bg-white',
    'border-[#334155]': 'border-gray-200',
    'border-[#059669]': 'border-[#ba0031]',
    'bg-[#0c2318]': 'bg-[#fff1f2]',
    'bg-[#111827]': 'bg-white',
    'text-white': 'text-gray-900',
    'text-slate-300': 'text-gray-600'
};

const fullPath = './onboarding.html';
let content = fs.readFileSync(fullPath, 'utf8');
let modified = false;

// Process the logo
const oldLogoHtml = `<div class="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center">
      <span class="material-symbols-outlined text-white" style="font-size:18px">bolt</span>
    </div>
    <span class="font-extrabold text-white text-lg tracking-tight">QuicReply</span>`;
const newLogoHtml = `<img src="assets/images/logo.png" alt="QuicReply" class="h-6 sm:h-8 sidebar-logo-image" />`;

if (content.includes(oldLogoHtml)) {
    content = content.replace(oldLogoHtml, newLogoHtml);
    modified = true;
}

for (const [darkClass, lightClass] of Object.entries(lightColors)) {
    if (content.includes(darkClass)) {
        content = content.split(darkClass).join(lightClass);
        modified = true;
    }
}

if (modified) {
    fs.writeFileSync(fullPath, content, 'utf8');
    console.log(`Updated onboarding to light theme.`);
}
