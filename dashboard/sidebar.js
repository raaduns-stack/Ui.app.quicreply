/* ============================================================
   QuicReply Sales OS — Sidebar & Topbar HTML Templates
   Nav Structure:
     MAIN        → Dashboard
     MESSAGES    → Inbox
     CUSTOMERS   → Contacts, Pipeline
     GROWTH      → Campaigns, AI / Jennifer (sub: Overview, Knowledge Base, Test AI, Settings)
     CHANNELS    → WhatsApp (sub: Overview, API Setup)
     INSIGHTS    → Analytics
     TEAM        → Team
     SYSTEM      → Billing, Settings
   ============================================================ */

window.QR = window.QR || {};

/* ---------- SHARED HELPERS ---------- */
window.QR.getAssetPrefix = function () {
  const pathParts = location.pathname.split('/').filter(p => p.length > 0);
  const dashboardIndex = pathParts.indexOf('dashboard');
  let assetPrefix = './';

  if (dashboardIndex !== -1) {
    const lastPart = pathParts[pathParts.length - 1] || '';
    const isFile = lastPart.includes('.');
    const depth = pathParts.length - (isFile ? 1 : 0) - dashboardIndex;
    assetPrefix = '../'.repeat(depth);
  }
  return assetPrefix;
};

/* ---------- SIDEBAR HTML ---------- */
window.QR.getSidebarHTML = function () {
  const p = window.QR.getAssetPrefix();   // path prefix relative to current page
  const state = window.SalesOS.state;

  return /* html */ `
<aside id="sidebar">

  <!-- ── Logo Row ── -->
  <div class="flex items-center justify-between px-4 py-4 border-b border-gray-100">
    <a href="${p}dashboard/index.html" class="flex items-center gap-2 min-w-0">
      <img src="${p}assets/images/logo.png" alt="QuicReply"
           class="h-7 sidebar-logo-image transition-transform hover:scale-105 duration-300 cursor-pointer shrink-0" />
    </a>
    <button id="btn-sidebar-collapse" class="btn-ghost hidden lg:flex shrink-0"
            aria-label="Collapse sidebar">
      <span class="material-symbols-outlined" style="font-size:20px;">menu</span>
    </button>
  </div>

  <!-- ── QR Mode Card ── -->
  <div class="px-4 py-3 border-b border-gray-100" id="sidebar-qr-card">
    <div class="flex items-center gap-3 p-3 rounded-xl border border-emerald-100 bg-emerald-50/50 hover:bg-emerald-50 transition-colors cursor-pointer relative z-10 overflow-visible group">
      <div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
        <span class="material-symbols-outlined" style="font-size:18px;">chat</span>
      </div>
      <div class="flex-1 min-w-0">
        <div class="text-xs font-bold text-gray-900 truncate">QR Mode</div>
        <div class="text-[10px] text-gray-500 truncate mt-0.5">Limited features</div>
      </div>
      <div class="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_0_2px_#ecfdf5]"></div>
    </div>
  </div>

  <!-- ── Navigation ── -->
  <nav class="flex-1 overflow-y-auto py-3 space-y-0" id="sidebar-nav">

    <!-- MAIN -->
    <div class="sidebar-section-label px-4 pt-2 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
      Main
    </div>
    <a href="${p}dashboard/index.html"
       class="nav-item" data-nav-href="dashboard/index.html">
      <span class="material-symbols-outlined">dashboard</span>
      <span class="nav-label">Dashboard</span>
    </a>

    <!-- MESSAGES -->
    <div class="sidebar-section-label px-4 pt-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
      Messages
    </div>
    <a href="${p}dashboard/inbox/index.html"
       class="nav-item" data-nav-href="dashboard/inbox/index.html">
      <span class="material-symbols-outlined">inbox</span>
      <span class="nav-label">Inbox</span>
    </a>

    <!-- CUSTOMERS -->
    <div class="sidebar-section-label px-4 pt-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
      Customers
    </div>
    <a href="${p}dashboard/contacts/index.html"
       class="nav-item" data-nav-href="dashboard/contacts/index.html">
      <span class="material-symbols-outlined">contacts</span>
      <span class="nav-label">Contacts</span>
    </a>
    <a href="${p}dashboard/pipeline/index.html"
       class="nav-item" data-nav-href="dashboard/pipeline/index.html">
      <span class="material-symbols-outlined">account_tree</span>
      <span class="nav-label">Pipeline</span>
    </a>

    <!-- GROWTH -->
    <div class="sidebar-section-label px-4 pt-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
      Growth
    </div>
    <a href="${p}dashboard/campaigns/index.html"
       class="nav-item" data-nav-href="dashboard/campaigns/index.html">
      <span class="material-symbols-outlined">campaign</span>
      <span class="nav-label">Campaigns</span>
    </a>

    <!-- AI / Jennifer — expandable group -->
    <div class="nav-group" id="group-ai">
      <button class="nav-group-trigger" id="trigger-ai"
              aria-expanded="false" aria-controls="subnav-ai"
              data-group-paths="dashboard/ai/">
        <span class="material-symbols-outlined">bolt</span>
        <span class="nav-label">AI / Jennifer</span>
        <span class="material-symbols-outlined nav-chevron">expand_more</span>
      </button>
      <div class="nav-subitems" id="subnav-ai" role="group">
        <a href="${p}dashboard/ai/index.html"
           class="nav-subitem" data-nav-href="dashboard/ai/index.html">Overview</a>
        <a href="${p}dashboard/ai/setup.html"
           class="nav-subitem" data-nav-href="dashboard/ai/setup.html">Setup</a>
        <a href="${p}dashboard/ai/knowledge.html"
           class="nav-subitem" data-nav-href="dashboard/ai/knowledge.html">Knowledge Base</a>
        <a href="${p}dashboard/ai/test.html"
           class="nav-subitem" data-nav-href="dashboard/ai/test.html">Test AI</a>
        <a href="${p}dashboard/ai/settings.html"
           class="nav-subitem" data-nav-href="dashboard/ai/settings.html">Settings</a>
      </div>
    </div>

    <!-- CHANNELS -->
    <div class="sidebar-section-label px-4 pt-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
      Channels
    </div>

    <!-- WhatsApp — expandable group -->
    <div class="nav-group" id="group-whatsapp">
      <button class="nav-group-trigger" id="trigger-whatsapp"
              aria-expanded="false" aria-controls="subnav-whatsapp"
              data-group-paths="dashboard/whatsapp/ dashboard/api-setup/">
        <svg viewBox="0 0 24 24" fill="currentColor"
             style="width:22px;height:22px;flex-shrink:0;color:#25d366;" aria-hidden="true">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
        </svg>
        <span class="nav-label">WhatsApp</span>
        <span class="material-symbols-outlined nav-chevron">expand_more</span>
      </button>
      <div class="nav-subitems" id="subnav-whatsapp" role="group">
        <a href="${p}dashboard/whatsapp/index.html"
           class="nav-subitem" data-nav-href="dashboard/whatsapp/index.html">Overview</a>
        <a href="${p}dashboard/api-setup/index.html"
           class="nav-subitem" data-nav-href="dashboard/api-setup/index.html">API Setup</a>
      </div>
    </div>

    <!-- INSIGHTS -->
    <div class="sidebar-section-label px-4 pt-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
      Insights
    </div>
    <a href="${p}dashboard/analytics/index.html"
       class="nav-item" data-nav-href="dashboard/analytics/index.html">
      <span class="material-symbols-outlined">bar_chart</span>
      <span class="nav-label">Analytics</span>
    </a>

    <!-- TEAM -->
    <div class="sidebar-section-label px-4 pt-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
      Team
    </div>
    <a href="${p}dashboard/team/index.html"
       class="nav-item" data-nav-href="dashboard/team/index.html">
      <span class="material-symbols-outlined">group</span>
      <span class="nav-label">Team</span>
    </a>

    <!-- SYSTEM -->
    <div class="sidebar-section-label px-4 pt-3 pb-1 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
      System
    </div>
    <a href="${p}dashboard/settings/billing.html"
       class="nav-item" data-nav-href="dashboard/settings/billing.html">
      <span class="material-symbols-outlined">payments</span>
      <span class="nav-label">Billing</span>
    </a>
    <a href="${p}dashboard/settings/index.html"
       class="nav-item" data-nav-href="dashboard/settings/index.html">
      <span class="material-symbols-outlined">settings</span>
      <span class="nav-label">Settings</span>
    </a>

  </nav>



</aside>
<div id="sidebar-overlay" class="hidden lg:hidden"></div>
`;
};

/* ---------- ACCORDION LOGIC ---------- */
window.QR.bindSidebarEvents = function () {
  const CURRENT = location.pathname.replace(/\\/g, '/');

  /* ── Mark active nav items ── */
  let exactMatchFound = false;
  const links = Array.from(document.querySelectorAll('[data-nav-href]'));
  
  // First pass: exact matches
  links.forEach(el => {
    const href = el.getAttribute('data-nav-href');
    if (!href) return;
    
    if (CURRENT.endsWith(href) || (href.endsWith('index.html') && CURRENT.endsWith(href.replace('index.html', '')))) {
      el.classList.add('nav-active');
      el.setAttribute('aria-current', 'page');
      exactMatchFound = true;
    }
  });

  // Second pass: if no exact match, fallback to folder matching (for sub-pages)
  if (!exactMatchFound) {
    links.forEach(el => {
      const href = el.getAttribute('data-nav-href');
      if (!href) return;
      
      if (href.endsWith('index.html')) {
        const folderPath = href.replace('index.html', '');
        // Do not fallback match the root dashboard/
        if (folderPath !== 'dashboard/' && CURRENT.includes(folderPath)) {
          el.classList.add('nav-active');
          el.setAttribute('aria-current', 'page');
        }
      }
    });
  }

  /* ── Accordion groups ── */
  document.querySelectorAll('.nav-group-trigger').forEach(trigger => {
    const subnavId = trigger.getAttribute('aria-controls');
    const subnav   = document.getElementById(subnavId);
    if (!subnav) return;

    // Auto-open if current page is within this group
    const groupPaths = (trigger.getAttribute('data-group-paths') || '').trim().split(/\s+/);
    const isGroupActive = groupPaths.some(gp => gp && CURRENT.includes(gp));

    if (isGroupActive) {
      trigger.classList.add('open', 'group-active');
      subnav.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }

    trigger.addEventListener('click', () => {
      const isOpen = subnav.classList.contains('open');
      // Close all other groups first
      document.querySelectorAll('.nav-subitems.open').forEach(other => {
        if (other !== subnav) {
          other.classList.remove('open');
          const otherTrigger = document.querySelector(`[aria-controls="${other.id}"]`);
          otherTrigger && otherTrigger.classList.remove('open');
          otherTrigger && otherTrigger.setAttribute('aria-expanded', 'false');
        }
      });
      // Toggle this group
      subnav.classList.toggle('open', !isOpen);
      trigger.classList.toggle('open', !isOpen);
      trigger.setAttribute('aria-expanded', String(!isOpen));
    });
  });
};

/* ---------- TOPBAR ---------- */
window.QR.topbarHTML = function (pageTitle) {
  const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
  const kbdHint = isMac ? '⌘K' : 'Ctrl+K';
  const p = window.QR.getAssetPrefix();

  return /* html */ `
<header id="topbar">
  <div class="topbar-left gap-4">
    <button id="btn-sidebar-open"
      class="btn-ghost flex lg:hidden flex-shrink-0 hover:bg-gray-100 hover:text-gray-900 rounded-xl w-10 h-10 items-center justify-center">
      <span class="material-symbols-outlined transition-transform active:scale-95">menu</span>
    </button>

    <!-- Mobile Logo -->
    <div class="lg:hidden flex items-center">
      <img src="${p}assets/images/logo.png" alt="QuicReply"
           class="h-6 cursor-pointer hover:opacity-80 transition-opacity"
           onclick="location.href='${p}dashboard/index.html'" />
    </div>

    <!-- Page Title (Desktop) -->
    <div class="hidden lg:flex items-center pl-2">
      <div class="w-1 h-5 bg-gradient-to-b from-[#ba0031] to-rose-400 rounded-full mr-4 opacity-80 shadow-sm"></div>
      <h2 class="text-[12px] font-black text-gray-800 uppercase tracking-[0.15em] truncate max-w-[300px]">${pageTitle}</h2>
    </div>
  </div>

  <div class="topbar-right gap-3 lg:gap-4">
    <!-- Search (Desktop) -->
    <button class="hidden lg:flex items-center gap-16 h-9 px-3 bg-gray-50/80 hover:bg-gray-100
                   border border-gray-200/80 hover:border-gray-300 rounded-xl transition-all
                   text-left text-gray-500 group shadow-sm hover:shadow">
      <div class="flex items-center gap-2">
        <span class="material-symbols-outlined text-[18px] text-gray-400 group-hover:text-gray-600 transition-colors">search</span>
        <span class="text-[11px] font-semibold">Quick Search...</span>
      </div>
      <span class="text-[9px] font-extrabold text-gray-400 bg-white border border-gray-200/80
                   px-1.5 py-0.5 rounded shadow-sm">${kbdHint}</span>
    </button>

    <!-- Search Icon (Mobile) -->
    <button class="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl text-gray-500
                   hover:bg-gray-100 hover:text-gray-900 transition-colors">
      <span class="material-symbols-outlined text-[20px]">search</span>
    </button>

    <div class="w-px h-6 bg-gray-200 hidden sm:block mx-1"></div>

    <!-- Notifications -->
    <div class="relative">
      <button id="notif-trigger"
        class="w-10 h-10 flex items-center justify-center rounded-xl text-gray-500
               hover:bg-rose-50 hover:text-[#ba0031] transition-all relative group">
        <span class="material-symbols-outlined text-[20px] transition-transform
                     group-hover:scale-110 group-active:scale-95">notifications</span>
        <span class="absolute top-2 right-2 w-2 h-2 bg-[#ba0031] shadow-[0_0_0_2px_white]
                     rounded-full animate-pulse"></span>
      </button>

      <div id="notif-panel"
        class="hidden absolute right-0 mt-2 w-80 bg-white border border-gray-100 rounded-2xl
               shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden origin-top-right z-50">
        <div class="px-4 py-3 flex justify-between items-center border-b border-gray-50 bg-gray-50/50">
          <span class="text-[10px] font-black text-gray-900 uppercase tracking-widest">Notifications</span>
          <button class="text-[10px] font-bold text-blue-600 hover:underline">Mark all read</button>
        </div>
        <div class="max-h-80 overflow-y-auto p-2 space-y-1">
          <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
            <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0 border border-blue-100">
              <span class="material-symbols-outlined text-[16px]">sensors</span>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-[11px] font-bold text-gray-900 truncate">Broadcast "Flash Sale" Completed</p>
              <p class="text-[10px] text-gray-500 mt-0.5 leading-snug">Sent to 12.5k recipients with 94% delivery rate.</p>
              <p class="text-[9px] font-bold text-gray-400 mt-1.5 uppercase tracking-widest">10 min ago</p>
            </div>
          </div>
          <div class="flex items-start gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
            <div class="w-8 h-8 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center flex-shrink-0 border border-rose-100">
              <span class="material-symbols-outlined text-[16px]">payments</span>
            </div>
            <div class="min-w-0 flex-1">
              <p class="text-[11px] font-bold text-gray-900 truncate">Invoice Paid Automatically</p>
              <p class="text-[10px] text-gray-500 mt-0.5 leading-snug">Monthly standard subscription ($99.00) renewed.</p>
              <p class="text-[9px] font-bold text-gray-400 mt-1.5 uppercase tracking-widest">2 hours ago</p>
            </div>
          </div>
        </div>
        <div class="p-2 border-t border-gray-50 bg-gray-50/50">
          <button class="w-full py-2 text-center text-[10px] font-black text-gray-600
                         hover:text-gray-900 uppercase tracking-widest rounded-lg hover:bg-gray-100">
            View All Updates
          </button>
        </div>
      </div>
    </div>

    <!-- Profile Dropdown -->
    <div class="relative pl-1">
      <button id="profile-trigger"
        class="flex items-center gap-3 p-1 pr-3 rounded-full hover:bg-gray-50
               border border-transparent hover:border-gray-200 transition-all
               select-none group focus:outline-none focus:ring-2 focus:ring-rose-100">
        <div class="relative">
          <div class="w-8 h-8 rounded-full bg-gradient-to-br from-gray-800 to-gray-900 text-white
                      font-black text-[11px] flex items-center justify-center shadow-sm
                      group-hover:shadow group-hover:scale-105 transition-all">JD</div>
          <span class="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 rounded-full border-2 border-white shadow-sm"></span>
        </div>
        <div class="hidden md:flex flex-col items-start translate-y-[1px]">
          <span class="text-[12px] font-black text-gray-900 leading-none group-hover:text-[#ba0031] transition-colors">John Doe</span>
          <span class="text-[9px] font-bold text-gray-500 mt-1 leading-none uppercase tracking-widest">Workspace Admin</span>
        </div>
        <span class="material-symbols-outlined text-[18px] text-gray-400 hidden md:block group-hover:text-[#ba0031] transition-colors">expand_more</span>
      </button>

      <div id="profile-panel"
        class="hidden absolute right-0 mt-2 w-60 bg-white border border-gray-100 rounded-2xl
               shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] overflow-hidden origin-top-right z-50">
        <div class="px-4 py-3 border-b border-gray-50 bg-gray-50/50">
          <p class="text-xs font-black text-gray-900">John Doe</p>
          <p class="text-[10px] font-medium text-gray-500 truncate mt-0.5">john@acme.com</p>
        </div>
        <div class="p-2 space-y-0.5">
          <a href="${p}dashboard/settings/index.html"
             class="flex items-center gap-3 px-3 py-2 text-[11px] font-bold text-gray-700
                    hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all">
            <div class="w-6 h-6 rounded bg-gray-100 flex items-center justify-center">
              <span class="material-symbols-outlined text-[16px] text-gray-500">account_circle</span>
            </div>
            My Profile
          </a>
          <a href="${p}dashboard/settings/billing.html"
             class="flex items-center gap-3 px-3 py-2 text-[11px] font-bold text-gray-700
                    hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all">
            <div class="w-6 h-6 rounded bg-gray-100 flex items-center justify-center">
              <span class="material-symbols-outlined text-[16px] text-gray-500">workspace_premium</span>
            </div>
            Billing &amp; Plans
          </a>
          <a href="#"
             class="flex items-center gap-3 px-3 py-2 text-[11px] font-bold text-gray-700
                    hover:text-gray-900 hover:bg-gray-50 rounded-xl transition-all">
            <div class="w-6 h-6 rounded bg-gray-100 flex items-center justify-center">
              <span class="material-symbols-outlined text-[16px] text-gray-500">help</span>
            </div>
            Support Center
          </a>
        </div>
        <div class="p-2 border-t border-gray-100 bg-gray-50/50">
          <a href="${p}login.html"
             class="flex items-center gap-3 px-3 py-2 text-[11px] font-bold text-rose-600
                    hover:text-rose-700 hover:bg-rose-50 rounded-xl transition-all">
            <div class="w-6 h-6 rounded bg-rose-100 flex items-center justify-center">
              <span class="material-symbols-outlined text-[16px] text-rose-600">logout</span>
            </div>
            Secure Sign Out
          </a>
        </div>
      </div>
    </div>
  </div>
</header>
`;
};

/* ---------- FOOTER ---------- */
window.QR.footerHTML = function (isSimple = false) {
  const p = window.QR.getAssetPrefix();
  return /* html */ `
<footer class="py-10 text-center border-t border-gray-50 bg-white">
  <div class="max-w-7xl mx-auto px-8">
    <div class="flex flex-col md:flex-row justify-between items-center gap-4
                text-[10px] font-black text-gray-400 uppercase tracking-widest">
      <p>© 2026 QuicReply. All rights reserved.</p>
      <div class="flex gap-8">
        <a href="#" class="hover:text-[#ba0031] transition-colors">Privacy Policy</a>
        <a href="#" class="hover:text-[#ba0031] transition-colors">Terms of Service</a>
        <a href="#" class="hover:text-[#ba0031] transition-colors">API Docs</a>
      </div>
    </div>
  </div>
</footer>
`;
};

/* ---------- INJECT ON DOM READY ---------- */
function initSidebar() {
  const sidebarMount = document.getElementById('sidebar-mount');
  const pathName = location.pathname.replace(/\\/g, '/');
  const skipSidebar = pathName.includes('/onboarding/');

  if (sidebarMount && !skipSidebar) {
    const wrapper = document.createElement('div');
    wrapper.id = 'sidebar-wrapper';
    wrapper.innerHTML = window.QR.getSidebarHTML();
    sidebarMount.parentNode.insertBefore(wrapper, sidebarMount.nextSibling);
    sidebarMount.remove();
    window.QR.bindSidebarEvents && window.QR.bindSidebarEvents();
  } else if (document.getElementById('sidebar-wrapper')) {
    document.getElementById('sidebar-wrapper').innerHTML = window.QR.getSidebarHTML();
    window.QR.bindSidebarEvents && window.QR.bindSidebarEvents();
  }
}

document.addEventListener('DOMContentLoaded', () => {
  initSidebar();

  const topbarMount = document.getElementById('topbar-mount');
  if (topbarMount) {
    const title = topbarMount.getAttribute('data-title') || 'Dashboard';
    topbarMount.insertAdjacentHTML('afterend', window.QR.topbarHTML(title));
    topbarMount.remove();
  }

  const footerMount = document.getElementById('footer-mount');
  if (footerMount) {
    const isSimple = footerMount.hasAttribute('data-simple');
    footerMount.insertAdjacentHTML('afterend', window.QR.footerHTML(isSimple));
    footerMount.remove();
  }

  window.addEventListener('SalesOSStateChange', () => {
    initSidebar();
  });
});
