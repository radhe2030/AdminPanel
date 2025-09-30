import { initTodo } from "./todo.js";
import { initHamburger, initTheme } from "./admin.js";
import { initCalculator } from "./calculator.js";
import { initStudentGradeSystem } from "./student.js";

// Initialize admin panel
initHamburger();
initTheme();

// Function to load pages dynamically into main container
window.loadPage = function (url) {
  const container = document.getElementById("mainContainer");
  if (!container) return;

  fetch(url)
    .then((res) => {
      if (!res.ok) throw new Error("Page not found");
      return res.text();
    })
    .then((html) => {
      container.innerHTML = html;

      // Save current page in localStorage
      localStorage.setItem("currentPage", url);

      // Apply current theme to loaded content
      const theme = document.body.className || "light";
      container.querySelectorAll("*").forEach((el) => {
        el.classList.remove("light", "dark");
        el.classList.add(theme);
      });

      // Initialize page-specific JS
      if (url.includes("calculator.html")) initCalculator();
      if (url.includes("todo.html")) initTodo();
      if (url.includes("student.html")) initStudentGradeSystem();
    })
    .catch((err) => console.error("Failed to load page:", err));
};

// Load last visited page or default (calculator.html)
window.addEventListener("DOMContentLoaded", () => {
  const lastPage = localStorage.getItem("currentPage") || "pages/calculator.html";
  loadPage(lastPage);
});
