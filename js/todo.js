export function initTodo() {
  const todoInput = document.getElementById("todoInput");
  const addBtn = document.getElementById("addBtn");
  const todoList = document.getElementById("todoList");
  const toast = document.getElementById("toast");
  const deleteModal = document.getElementById("deleteModal");
  const confirmDelete = document.getElementById("confirmDelete");
  const cancelDelete = document.getElementById("cancelDelete");

  let editTaskId = null;
  let deleteTaskId = null;

  // Load tasks from localStorage
  let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  function showToast(message) {
    toast.textContent = message;
    toast.style.display = "block";
    setTimeout(() => (toast.style.display = "none"), 2000);
  }

  function renderTasks() {
    todoList.innerHTML = "";
    tasks.forEach((task) => createTaskElement(task));
  }

  function createTaskElement(task) {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) li.classList.add("completed");
    li.appendChild(span);
    li.dataset.id = task.id;

    // Buttons container
    const buttons = document.createElement("div");
    buttons.classList.add("task-buttons");

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.innerHTML = `<i class="fas fa-pen"></i>`;
    editBtn.title = "Edit";
    editBtn.style.color = "blue";
    editBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      todoInput.value = task.text;
      addBtn.textContent = "Update";
      editTaskId = task.id;
    });

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    delBtn.title = "Delete";
    delBtn.style.color = "red";
    delBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      deleteTaskId = task.id;
      deleteModal.style.display = "flex";
    });

    buttons.appendChild(editBtn);
    buttons.appendChild(delBtn);
    li.appendChild(buttons);

    // Toggle completed
    li.addEventListener("click", () => {
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    todoList.appendChild(li);
  }

  addBtn.addEventListener("click", () => {
    const text = todoInput.value.trim();
    if (!text) return;

    if (editTaskId) {
      const task = tasks.find((t) => t.id === editTaskId);
      if (task) {
        task.text = text;
        showToast("Task updated!");
      }
      editTaskId = null;
      addBtn.textContent = "Add";
    } else {
      const task = { id: Date.now(), text, completed: false };
      tasks.push(task);
      showToast("Task added!");
    }

    saveTasks();
    todoInput.value = "";
    renderTasks();
  });

  todoInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") addBtn.click();
  });

  confirmDelete.addEventListener("click", () => {
    tasks = tasks.filter((t) => t.id !== deleteTaskId);
    deleteTaskId = null;
    deleteModal.style.display = "none";
    saveTasks();
    renderTasks();
    showToast("Task deleted!");
  });

  cancelDelete.addEventListener("click", () => {
    deleteTaskId = null;
    deleteModal.style.display = "none";
  });

  renderTasks();
}
