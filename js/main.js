import { initTodo } from "./todo.js";
import { initHamburger, initTheme } from "./admin.js";
import { initCalculator } from "./calculator.js";
import { initStudentGradeSystem } from "./student.js";
import { initAgeCalculator } from "./age.js"; // if you added the age calculator
import { initATM } from "./atm.js"; // <-- Import ATM
import { initTableGenerator } from "./table.js";

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

    // Apply current theme to loaded content
    const theme = document.body.className || "light";
    container.classList.remove("light", "dark");
    container.classList.add(theme);

    // Initialize page-specific JS
    if (url.includes("calculator.html")) initCalculator();
    else if (url.includes("todo.html")) initTodo();
    else if (url.includes("student.html")) initStudentGradeSystem();
    else if (url.includes("age.html")) initAgeCalculator(); // if you have age calculator page
    else if (url.includes("atm.html")) initATM();
    else if (url.includes("table.html")) initTableGenerator();
  } catch (err) {
    console.error("Failed to load page:", err);
    container.innerHTML = `<p style="color:red; text-align:center; margin-top:20px;">Failed to load page.</p>`;
  }
};

// Load last visited page or default
window.addEventListener("DOMContentLoaded", () => {
  const lastPage = localStorage.getItem("currentPage") || "pages/calculator.html";
  loadPage(lastPage);
});
