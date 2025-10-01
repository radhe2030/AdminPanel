export function initATM() {
  const checkBalanceBtn = document.getElementById("checkBalanceBtn");
  const depositBtn = document.getElementById("depositBtn");
  const withdrawBtn = document.getElementById("withdrawBtn");
  const actionDiv = document.querySelector(".atm-action");
  const resultDiv = document.getElementById("atmResult");
  const toast = document.getElementById("atmToast"); // Toast container

  let balance = parseFloat(localStorage.getItem("atmBalance")) || 0;

  function updateBalance(amount) {
    balance = amount;
    localStorage.setItem("atmBalance", balance);
  }

  function showToast(message, type = "success") {
    toast.textContent = message;
    toast.className = "atm-toast"; // reset classes
    toast.classList.add(type);
    toast.style.display = "block";
    setTimeout(() => (toast.style.display = "none"), 2000);
  }

  function clearAction() {
    actionDiv.innerHTML = "";
    resultDiv.textContent = "";
  }

  checkBalanceBtn.addEventListener("click", () => {
    clearAction();
    resultDiv.textContent = `Current Balance: $${balance.toFixed(2)}`;
    showToast("Balance checked", "info");
  });

  depositBtn.addEventListener("click", () => {
    clearAction();
    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = "Enter amount";
    const submit = document.createElement("button");
    submit.textContent = "Deposit";

    submit.addEventListener("click", () => {
      const amount = parseFloat(input.value);
      if (isNaN(amount) || amount <= 0) {
        showToast("Enter a valid amount!", "error");
        return;
      }
      updateBalance(balance + amount);
      resultDiv.textContent = `Deposited: $${amount.toFixed(2)} | Balance: $${balance.toFixed(2)}`;
      showToast(`Deposited $${amount.toFixed(2)}`, "success");
      input.value = "";
    });

    actionDiv.appendChild(input);
    actionDiv.appendChild(submit);
  });

  withdrawBtn.addEventListener("click", () => {
    clearAction();
    const input = document.createElement("input");
    input.type = "number";
    input.placeholder = "Enter amount";
    const submit = document.createElement("button");
    submit.textContent = "Withdraw";

    submit.addEventListener("click", () => {
      const amount = parseFloat(input.value);
      if (isNaN(amount) || amount <= 0) {
        showToast("Enter a valid amount!", "error");
        return;
      }
      if (amount > balance) {
        showToast("Insufficient balance!", "error");
        return;
      }
      updateBalance(balance - amount);
      resultDiv.textContent = `Withdrawn: $${amount.toFixed(2)} | Balance: $${balance.toFixed(2)}`;
      showToast(`Withdrawn $${amount.toFixed(2)}`, "success");
      input.value = "";
    });

    actionDiv.appendChild(input);
    actionDiv.appendChild(submit);
  });
}
