import { initTodo } from "./todo.js";
import { initHamburger, initTheme } from "./admin.js";
import { initCalculator } from "./calculator.js";
import { initStudentGradeSystem } from "./student.js";

// Initialize admin panel (hamburger & theme)
initHamburger();
initTheme();

// Function to load pages dynamically into main container
window.loadPage = async function (url) {
  const container = document.getElementById("mainContainer");
  if (!container) return;

  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("Page not found");
    const html = await res.text();

    container.innerHTML = html;

    // Save current page in localStorage
    localStorage.setItem("currentPage", url);

    // Apply current theme to container only
    const theme = document.body.className || "light";
    container.classList.remove("light", "dark");
    container.classList.add(theme);

    // Initialize page-specific JS
    if (url.includes("calculator.html")) initCalculator();
    else if (url.includes("todo.html")) initTodo();
    else if (url.includes("student.html")) initStudentGradeSystem();
  } catch (err) {
    console.error("Failed to load page:", err);
    container.innerHTML = `<p style="color:red;">Failed to load page.</p>`;
  }
};

// Load last visited page or default
window.addEventListener("DOMContentLoaded", () => {
  const lastPage = localStorage.getItem("currentPage") || "pages/calculator.html";
  loadPage(lastPage);
});
