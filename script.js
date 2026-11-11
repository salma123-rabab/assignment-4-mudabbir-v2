/* =========================================
   PAGE ELEMENTS
========================================= */

const searchButton =
  document.getElementById("searchButton");

const searchPanel =
  document.getElementById("searchPanel");

const searchInput =
  document.getElementById("searchInput");

const notificationButton =
  document.getElementById("notificationButton");

const mobileMenuButton =
  document.getElementById("mobileMenuButton");

const sidebar =
  document.getElementById("sidebar");

const sidebarOverlay =
  document.getElementById("sidebarOverlay");

const toast =
  document.getElementById("toast");

/* =========================================
   SEARCH PANEL
========================================= */

if (searchButton && searchPanel && searchInput) {
  searchButton.addEventListener(
    "click",
    function (event) {
      event.stopPropagation();

      searchPanel.classList.toggle("open");

      if (searchPanel.classList.contains("open")) {
        searchInput.focus();
      }
    }
  );

  searchPanel.addEventListener(
    "click",
    function (event) {
      event.stopPropagation();
    }
  );

  document.addEventListener(
    "click",
    function () {
      searchPanel.classList.remove("open");
    }
  );
}

/* =========================================
   SEARCH TRANSACTIONS
========================================= */

if (searchInput) {
  searchInput.addEventListener(
    "input",
    function () {
      const searchText =
        searchInput.value
          .trim()
          .toLowerCase();

      const transactionRows =
        document.querySelectorAll(
          ".transaction-row"
        );

      transactionRows.forEach(
        function (row) {
          const rowText =
            row.textContent
              .trim()
              .toLowerCase();

          if (rowText.includes(searchText)) {
            row.style.display = "";
          } else {
            row.style.display = "none";
          }
        }
      );
    }
  );
}

/* =========================================
   PAYMENT CARDS
========================================= */

/*
  Desktop:
  The cards flip automatically with CSS hover.

  Mobile/tablet:
  Touch devices do not have a real hover state,
  so the cards flip when they are touched.
*/

const flipCards =
  document.querySelectorAll(".flip-card");

const isTouchDevice =
  window.matchMedia(
    "(hover: none), (pointer: coarse)"
  );

if (isTouchDevice.matches) {
  flipCards.forEach(function (card) {
    card.addEventListener(
      "click",
      function () {
        card.classList.toggle("touch-flipped");
      }
    );
  });
}

/* Keyboard accessibility */

flipCards.forEach(function (card) {
  card.addEventListener(
    "keydown",
    function (event) {
      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();

        card.classList.toggle("touch-flipped");
      }
    }
  );
});

/* =========================================
   MOBILE SIDEBAR
========================================= */

function openSidebar() {
  if (!sidebar || !sidebarOverlay) {
    return;
  }

  sidebar.classList.add("open");
  sidebarOverlay.classList.add("show");
}

function closeSidebar() {
  if (!sidebar || !sidebarOverlay) {
    return;
  }

  sidebar.classList.remove("open");
  sidebarOverlay.classList.remove("show");
}

if (mobileMenuButton) {
  mobileMenuButton.addEventListener(
    "click",
    function () {
      if (sidebar.classList.contains("open")) {
        closeSidebar();
      } else {
        openSidebar();
      }
    }
  );
}

if (sidebarOverlay) {
  sidebarOverlay.addEventListener(
    "click",
    closeSidebar
  );
}

/* =========================================
   ACTIVE NAVIGATION
========================================= */

const navigationLinks =
  document.querySelectorAll(
    ".navigation-link"
  );

navigationLinks.forEach(function (link) {
  link.addEventListener(
    "click",
    function () {
      navigationLinks.forEach(
        function (item) {
          item.classList.remove("active");
        }
      );

      link.classList.add("active");

      if (window.innerWidth <= 980) {
        closeSidebar();
      }
    }
  );
});

/* =========================================
   TOAST MESSAGE
========================================= */

let toastTimer;

function showToast(message) {
  if (!toast) {
    return;
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(
    function () {
      toast.classList.remove("show");
    },
    2300
  );
}

/* =========================================
   NOTIFICATIONS
========================================= */

if (notificationButton) {
  notificationButton.addEventListener(
    "click",
    function () {
      showToast("لديك إشعاران جديدان");
    }
  );
}

/* =========================================
   QUICK ACTIONS
========================================= */

const quickActionButtons =
  document.querySelectorAll(
    ".quick-action-button"
  );

quickActionButtons.forEach(
  function (button) {
    button.addEventListener(
      "click",
      function () {
        const actionName =
          button.textContent.trim();

        showToast(
          `تم اختيار: ${actionName}`
        );
      }
    );
  }
);

/* =========================================
   PANEL BUTTONS
========================================= */

const panelButtons =
  document.querySelectorAll(
    ".panel-link, .view-all-button"
  );

panelButtons.forEach(function (button) {
  button.addEventListener(
    "click",
    function () {
      showToast(
        "يمكن ربط هذا الزر بصفحة منفصلة"
      );
    }
  );
});

/* =========================================
   IMAGE ERROR HANDLING
========================================= */

const projectImages =
  document.querySelectorAll("img");

projectImages.forEach(function (image) {
  image.addEventListener(
    "error",
    function () {
      console.warn(
        "Image was not found:",
        image.getAttribute("src")
      );

      image.style.visibility = "hidden";
    }
  );
});

/* =========================================
   RESIZE
========================================= */

window.addEventListener(
  "resize",
  function () {
    if (window.innerWidth > 980) {
      closeSidebar();
    }
  }
);