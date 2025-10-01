export function initAgeCalculator() {
  const byear = document.getElementById("byear");
  const bmonth = document.getElementById("bmonth");
  const pyear = document.getElementById("pyear");
  const pmonth = document.getElementById("pmonth");
  const calculateBtn = document.getElementById("calculateBtn");
  const resultsContainer = document.getElementById("resultsContainer");

  // Populate years
  function populateYears(select) {
    const currentYear = new Date().getFullYear();
    for (let y = currentYear; y >= 1900; y--) {
      const option = document.createElement("option");
      option.value = y;
      option.textContent = y;
      select.appendChild(option);
    }
  }

  // Populate months
  function populateMonths(select) {
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    months.forEach((m, i) => {
      const option = document.createElement("option");
      option.value = i + 1;
      option.textContent = m;
      select.appendChild(option);
    });
  }

  [byear, pyear].forEach(populateYears);
  [bmonth, pmonth].forEach(populateMonths);

  // Calculate Age
  calculateBtn.addEventListener("click", () => {
    const birthYear = parseInt(byear.value);
    const birthMonth = parseInt(bmonth.value);
    const currentYear = parseInt(pyear.value);
    const currentMonth = parseInt(pmonth.value);

    if (!birthYear || !birthMonth || !currentYear || !currentMonth) return;

    let years = currentYear - birthYear;
    let months;
    if (currentMonth >= birthMonth) {
      months = currentMonth - birthMonth;
    } else {
      years -= 1;
      months = 12 - birthMonth + currentMonth;
    }

    const totalMonths = years * 12 + months;
    const totalWeeks = Math.floor(totalMonths * 4.345); // avg weeks
    const totalDays = Math.floor(totalMonths * 30.44); // avg days

    // Clear previous results
    resultsContainer.innerHTML = "";

    const results = [
      { label: "Years", value: years },
      { label: "Months", value: months },
      { label: "Total Months", value: totalMonths },
      { label: "Weeks", value: totalWeeks },
      { label: "Days", value: totalDays },
    ];

    results.forEach((r) => {
      const div = document.createElement("div");
      div.innerHTML = `<strong>${r.label}</strong><span>${r.value}</span>`;
      resultsContainer.appendChild(div);
    });
  });
}

// Automatically initialize
