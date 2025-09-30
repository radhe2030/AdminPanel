// Hamburger toggle
export function initHamburger() {
  const hamburger = document.querySelector(".hamburger-icon");
  const sidebar = document.getElementById("sidebar");

  // Toggle sidebar on hamburger click
  hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("show");
  });

  // Close sidebar when a menu link is clicked (mobile only)
  const sidebarLinks = sidebar.querySelectorAll("a");
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("show");
      }
    });
  });
}

// Theme toggle (applies to main & iframe pages)
export function initTheme() {
  const themeToggle = document.getElementById("themeToggle");
  const icon = themeToggle.querySelector("i");
  const body = document.body;

  // Load saved theme
  let theme = localStorage.getItem("theme") || "light";
  body.className = theme;
  icon.className = theme === "light" ? "fa-regular fa-sun" : "fa-regular fa-moon";

  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("light")) {
      body.classList.replace("light", "dark");
      icon.className = "fa-regular fa-moon";
      localStorage.setItem("theme", "dark");
    } else {
      body.classList.replace("dark", "light");
      icon.className = "fa-regular fa-sun";
      localStorage.setItem("theme", "light");
    }

    // Update iframe theme
    const iframe = document.getElementById("contentFrame");
    if (iframe && iframe.contentDocument) {
      iframe.contentDocument.body.className = body.className;
    }
  });
}
