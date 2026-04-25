
/* ============================================================
   QuicReply Sales OS — Shared Shell Logic
   ============================================================ */

(function () {
  "use strict";

  /* ---------- Onboarding gate ---------- */
/* ---------- Sales OS State Manager ---------- */
window.SalesOS = (function() {
  const STATE_KEY = "sales_os_state";
  const DEFAULT_STATE = {
    user_mode: "sales",          // sales | broadcast
    whatsapp_mode: "qr",         // qr | api | both
    usage_profile: "inbox_heavy",// inbox_heavy | campaign_heavy
    api_status: "none",          // none | pending | approved
    kyc_status: "none",          // none | submitted | verified
    plan: "starter",             // starter | growth | pro
    onboarded: true
  };

  let state = JSON.parse(localStorage.getItem(STATE_KEY)) || DEFAULT_STATE;
  // Force onboarded for development to prevent redirect loops
  if (state.onboarded === false) { state.onboarded = true; localStorage.setItem(STATE_KEY, JSON.stringify(state)); }

  function save() {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
    applyStateToUI();
    // Dispatch event for components to listen to
    window.dispatchEvent(new CustomEvent('SalesOSStateChange', { detail: state }));
  }

  function applyStateToUI() {
    const body = document.body;
    // Set data attributes for CSS reactivity
    Object.keys(state).forEach(key => {
      body.setAttribute(`data-os-${key.replace(/_/g, '-')}`, state[key]);
    });

    // Handle Conditional Visibility
    document.querySelectorAll('[data-os-show-if]').forEach(el => {
      const condition = el.getAttribute('data-os-show-if'); // e.g. "plan=pro"
      const [key, val] = condition.split('=');
      el.classList.toggle('hidden', state[key] !== val);
    });

    document.querySelectorAll('[data-os-hide-if]').forEach(el => {
      const condition = el.getAttribute('data-os-hide-if');
      const [key, val] = condition.split('=');
      el.classList.toggle('hidden', state[key] === val);
    });

    // Update dynamic text elements
    document.querySelectorAll('[data-os-text]').forEach(el => {
      const key = el.getAttribute('data-os-text');
      if (state[key]) el.textContent = state[key].charAt(0).toUpperCase() + state[key].slice(1);
    });

    // Handle plan badges
    document.querySelectorAll('.os-plan-badge').forEach(el => {
      el.textContent = `${state.plan.charAt(0).toUpperCase() + state.plan.slice(1)} Plan`;
    });
  }

  return {
    get state() { return state; },
    update(updates) {
      state = { ...state, ...updates };
      save();
    },
    init() {
      applyStateToUI();
    }
  };
})();

// Legacy QR wrappers for backward compatibility
window.QR = window.QR || {};
window.QR.isOnboarded = () => window.SalesOS.state.onboarded;
window.QR.markOnboarded = () => window.SalesOS.update({ onboarded: true });
window.QR.setWhatsAppState = (ws) => window.SalesOS.update(ws);
window.QR.finishOnboarding = () => {
  window.QR.markOnboarded();
  const path = location.pathname.includes("/onboarding/") ? "../index.html" : "index.html";
  location.href = path;
};

  /* Guard: if not onboarded, send all dashboard pages → onboarding */
  const CURRENT_PAGE = location.pathname.replace(/\\/g, "/");
  const IS_ONBOARDING_FLOW = CURRENT_PAGE.includes("/onboarding/") || CURRENT_PAGE.includes("api-setup.html");

  if (CURRENT_PAGE.includes("/dashboard/") && !IS_ONBOARDING_FLOW && !window.SalesOS.state.onboarded) {
    // Determine path to onboarding relative to current depth within dashboard
    const parts = CURRENT_PAGE.split('/');
    const dashboardIndex = parts.indexOf('dashboard');
    const depth = parts.length - 1 - dashboardIndex;
    // If sitting in /dashboard/, depth is 1. We need 0 dots.
    // If sitting in /dashboard/pipeline/, depth is 2. We need 1 dot.
    const prefix = "../".repeat(Math.max(0, depth - 1));
    location.replace(prefix + "onboarding/index.html");
    return;
  }

  /* ---------- DOM ready ---------- */
  document.addEventListener("DOMContentLoaded", () => {
    window.SalesOS.init();
    initSidebar();
    initOnboardingMode();
    initTopbar();
    initSearch();
    markActive();
    initModals();
    initDropdowns();
  });

  /* ---------- Sidebar toggle ---------- */
  function initSidebar() {
    const sidebar  = document.getElementById("sidebar");
    const overlay  = document.getElementById("sidebar-overlay");
    const btnOpen  = document.getElementById("btn-sidebar-open");
    const btnClose = document.getElementById("btn-sidebar-close");
    if (!sidebar) return;

    const COLLAPSED_KEY = "qr_sidebar_collapsed";
    // Restore state on desktop
    if (window.innerWidth >= 1024 && localStorage.getItem(COLLAPSED_KEY) === "true") {
      sidebar.classList.add("sidebar-collapsed");
    }

    function openSidebar() {
      sidebar.classList.add("mobile-open");
      overlay && overlay.classList.remove("hidden");
      document.body.classList.add("sidebar-open");
    }
    function closeSidebar() {
      sidebar.classList.remove("mobile-open");
      overlay && overlay.classList.add("hidden");
      document.body.classList.remove("sidebar-open");
    }
    function toggleCollapse() {
      sidebar.classList.toggle("sidebar-collapsed");
      localStorage.setItem(COLLAPSED_KEY, sidebar.classList.contains("sidebar-collapsed"));
    }

    btnOpen  && btnOpen.addEventListener("click",  openSidebar);
    btnClose && btnClose.addEventListener("click",  closeSidebar);
    overlay  && overlay.addEventListener("click",  closeSidebar);

    const btnCollapse = document.getElementById("btn-sidebar-collapse");
    btnCollapse && btnCollapse.addEventListener("click", toggleCollapse);
  }

  /* ---------- Topbar: notifications & profile dropdown ---------- */
  function initTopbar() {
    const notifBtn   = document.getElementById("notif-trigger");
    const notifPanel = document.getElementById("notif-panel");
    const profileBtn = document.getElementById("profile-trigger");
    const profilePanel = document.getElementById("profile-panel");
    const quickBtn   = document.getElementById("quick-action-trigger");
    const quickPanel = document.getElementById("quick-action-panel");

    function closeAll() {
      notifPanel  && notifPanel.classList.add("hidden");
      profilePanel && profilePanel.classList.add("hidden");
      quickPanel   && quickPanel.classList.add("hidden");
    }

    notifBtn && notifBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isHidden = notifPanel.classList.contains("hidden");
      closeAll();
      if (isHidden) notifPanel.classList.remove("hidden");
    });
    profileBtn && profileBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isHidden = profilePanel.classList.contains("hidden");
      closeAll();
      if (isHidden) profilePanel.classList.remove("hidden");
    });
    quickBtn && quickBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      const isHidden = quickPanel.classList.contains("hidden");
      closeAll();
      if (isHidden) quickPanel.classList.remove("hidden");
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest('.dropdown-menu')) {
        closeAll();
      }
    });
  }

  /* ---------- Search Keyboard Shortcut ---------- */
  function initSearch() {
    const searchInput = document.getElementById("global-search-input");
    if (!searchInput) return;

    document.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        searchInput.focus();
      }
    });
  }

  /* ---------- Onboarding Mode Switcher ---------- */
  function initOnboardingMode() {
    if (CURRENT_PAGE.includes("/onboarding/")) {
      document.body.classList.add("onboarding-mode");
    } else {
      document.body.classList.remove("onboarding-mode");
    }
  }

  /* ---------- Active nav link ---------- */
  function markActive() {
    // bindSidebarEvents in sidebar.js already handles active marking — skip if present
    if (window.QR.bindSidebarEvents) return;

    const links = document.querySelectorAll('[data-nav-href]');
    links.forEach((link) => {
      const href = link.getAttribute('data-nav-href');
      if (!href) return;
      if (CURRENT_PAGE.endsWith(href) || CURRENT_PAGE.includes(href.replace(/index\.html$/, '').replace(/\.html$/, ''))) {
        link.classList.add('nav-active');
        link.setAttribute('aria-current', 'page');
      }
    });
  }


  /* ---------- Modal system ---------- */
  function initModals() {
    // Open triggers
    document.querySelectorAll("[data-modal-open]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-modal-open");
        openModal(id);
      });
    });
    // Close triggers
    document.querySelectorAll("[data-modal-close]").forEach((btn) => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-modal-close");
        closeModal(id);
      });
    });
    // Backdrop close
    document.querySelectorAll(".modal-backdrop").forEach((el) => {
      el.addEventListener("click", (e) => {
        if (e.target === el) closeModal(el.id);
      });
    });
    // ESC close
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        document.querySelectorAll(".modal-backdrop:not(.hidden)").forEach((el) => closeModal(el.id));
      }
    });
  }

  function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove("hidden");
  }
  function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add("hidden");
  }
  window.QR.openModal  = openModal;
  window.QR.closeModal = closeModal;

  /* ---------- Generic dropdown ---------- */
  function initDropdowns() {
    document.querySelectorAll("[data-dropdown-toggle]").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const id = btn.getAttribute("data-dropdown-toggle");
        const panel = document.getElementById(id);
        if (!panel) return;
        // Close others
        document.querySelectorAll(".dropdown-panel:not(#" + id + ")").forEach((p) => p.classList.add("hidden"));
        panel.classList.toggle("hidden");
      });
    });
    document.addEventListener("click", () => {
      document.querySelectorAll(".dropdown-panel").forEach((p) => p.classList.add("hidden"));
    });
  }

  /* ---------- Toast system ---------- */
  let toastContainer = null;
  function getToastContainer() {
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.id = "toast-container";
      toastContainer.className = "fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none";
      document.body.appendChild(toastContainer);
    }
    return toastContainer;
  }

  function showToast(message, type = "success", duration = 3500) {
    const colors = {
      success: "bg-[#ba0031]",
      error:   "bg-red-600",
      info:    "bg-blue-600",
      warning: "bg-amber-500",
    };
    const icons = {
      success: "check_circle",
      error:   "error",
      info:    "info",
      warning: "warning",
    };
    const container = getToastContainer();
    const toast = document.createElement("div");
    toast.className = `pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-xl text-white text-sm font-medium shadow-2xl ${colors[type] || colors.info} translate-x-12 opacity-0 transition-all duration-300 ease-out`;
    toast.innerHTML = `<span class="material-symbols-outlined text-lg">${icons[type] || "info"}</span><span>${message}</span>`;
    container.appendChild(toast);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        toast.classList.remove("translate-x-12", "opacity-0");
      });
    });
    setTimeout(() => {
      toast.classList.add("translate-x-12", "opacity-0");
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
  window.QR.showToast = showToast;

})();
