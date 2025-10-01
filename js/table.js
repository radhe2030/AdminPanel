// table.js
export function initTableGenerator() {
  const tableForm = document.getElementById("tableForm");
  const tableOutput = document.getElementById("tableOutput");

  if (!tableForm || !tableOutput) return; // safeguard if page doesn't have these elements

  tableForm.addEventListener("submit", function (e) {
    e.preventDefault();
    tableOutput.innerHTML = "";

    let start = parseInt(document.getElementById("startNumber").value);
    let end = parseInt(document.getElementById("endNumber").value);

    if (isNaN(start) || isNaN(end)) return;

    if (start > end) [start, end] = [end, start];

    for (let i = start; i <= end; i++) {
      const tableDiv = document.createElement("div");
      tableDiv.classList.add("single-table");

      const tableTitle = document.createElement("h4");
      tableTitle.textContent = `Table of ${i}`;
      tableDiv.appendChild(tableTitle);

      for (let j = 1; j <= 10; j++) {
        const p = document.createElement("p");
        p.textContent = `${i} × ${j} = ${i * j}`;
        tableDiv.appendChild(p);
      }

      tableOutput.appendChild(tableDiv);
    }
  });
}
