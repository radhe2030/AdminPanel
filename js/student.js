export function initStudentGradeSystem() {
  const studentName = document.getElementById("fullName"); // Fixed ID
  const maths = document.getElementById("maths");
  const english = document.getElementById("english");
  const science = document.getElementById("science");
  const addBtn = document.getElementById("addStudentBtn");
  const studentList = document.getElementById("studentList");
  const toast = document.getElementById("toast");

  const deleteModal = document.getElementById("deleteModal");
  const confirmDelete = document.getElementById("confirmDelete");
  const cancelDelete = document.getElementById("cancelDelete");

  let editStudent = null;
  let deleteStudent = null;

  let students = JSON.parse(localStorage.getItem("students") || "[]");

  function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
  }

  function showToast(message, grade) {
    toast.textContent = message;
    const gradeColors = {
      A: "#2ecc71",
      B: "#3498db",
      C: "#e67e22",
      D: "#f1c40f",
      F: "#e74c3c",
      Pass: "#1abc9c",
    };
    toast.style.backgroundColor = gradeColors[grade] || "#17df49";
    toast.style.color = "#010101ff";
    toast.style.display = "block";
    setTimeout(() => (toast.style.display = "none"), 2000);
  }

  function calculateGrade(percentage) {
    if (percentage < 33) return "F";
    if (percentage >= 91) return "A";
    if (percentage >= 81) return "B";
    if (percentage >= 71) return "C";
    if (percentage >= 61) return "D";
    return "Pass";
  }

  function renderStudents() {
    studentList.innerHTML = "";
    students.forEach((student) => {
      const div = document.createElement("div");
      div.classList.add("student-record");

      const fields = [
        { label: "Name", value: student.name },
        { label: "Maths", value: student.maths },
        { label: "English", value: student.english },
        { label: "Science", value: student.science },
        { label: "Total", value: student.total },
        { label: "Percentage", value: student.percentage + "%" },
        { label: "Grade", value: student.grade },
      ];

      // Determine color once per student
      const gradeColor =
        student.grade === "A"
          ? "green"
          : student.grade === "B"
          ? "blue"
          : student.grade === "C"
          ? "orange"
          : student.grade === "D"
          ? "goldenrod"
          : student.grade === "F"
          ? "red"
          : "#1abc9c";

      fields.forEach((f) => {
        const fieldDiv = document.createElement("div");
        const labelSpan = document.createElement("span");
        const valueSpan = document.createElement("span");

        labelSpan.classList.add("label");
        labelSpan.textContent = f.label + " —";
        valueSpan.classList.add("value");
        valueSpan.textContent = f.value;

        // Apply grade color to all fields
        labelSpan.style.color = gradeColor;
        valueSpan.style.color = gradeColor;

        fieldDiv.appendChild(labelSpan);
        fieldDiv.appendChild(valueSpan);
        div.appendChild(fieldDiv);
      });

      // Actions
      const actionDiv = document.createElement("div");
      actionDiv.classList.add("actions");

      const editBtn = document.createElement("button");
      editBtn.innerHTML = `<i class="fas fa-pen"></i>`;
      editBtn.addEventListener("click", () => {
        studentName.value = student.name;
        maths.value = student.maths;
        english.value = student.english;
        science.value = student.science;
        addBtn.textContent = "Update";
        editStudent = student;
      });

      const delBtn = document.createElement("button");
      delBtn.innerHTML = `<i class="fas fa-trash"></i>`;
      delBtn.classList.add("delete");
      delBtn.addEventListener("click", () => {
        deleteStudent = student;
        deleteModal.style.display = "flex";
      });

      actionDiv.appendChild(editBtn);
      actionDiv.appendChild(delBtn);
      div.appendChild(actionDiv);

      studentList.appendChild(div);
    });
  }

  // Add / Update
  addBtn.addEventListener("click", () => {
    const name = studentName.value.trim();
    const m = parseFloat(maths.value);
    const e = parseFloat(english.value);
    const s = parseFloat(science.value);

    if (!name || isNaN(m) || isNaN(e) || isNaN(s)) return;

    const total = m + e + s;
    const percentage = ((total / 300) * 100).toFixed(2);
    const grade = calculateGrade(percentage);

    if (editStudent) {
      Object.assign(editStudent, { name, maths: m, english: e, science: s, total, percentage, grade });
      showToast(`Updated! Grade: ${grade}`, grade);
      addBtn.textContent = "Add";
      editStudent = null;
    } else {
      const student = { name, maths: m, english: e, science: s, total, percentage, grade };
      students.push(student);
      showToast(`Added! Grade: ${grade}`, grade);
    }

    saveStudents();
    renderStudents();
    studentName.value = maths.value = english.value = science.value = "";
  });

  // Delete
  confirmDelete.addEventListener("click", () => {
    if (deleteStudent) {
      students = students.filter((s) => s !== deleteStudent);
      saveStudents();
      renderStudents();
      deleteStudent = null;
      deleteModal.style.display = "none";
      showToast("Student record deleted", "F");
    }
  });
  cancelDelete.addEventListener("click", () => {
    deleteModal.style.display = "none";
    deleteStudent = null;
  });

  renderStudents();
}
