document.getElementById("assignmentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let deadline = parseInt(document.getElementById("deadline").value);
    let assignmentType = parseInt(document.getElementById("assignmentType").value);
    let difficulty = parseInt(document.getElementById("difficulty").value);
    let impact = parseInt(document.getElementById("impact").value);

    // Hitung skor
    let score = ((((deadline)+(difficulty)+(assignmentType)+(impact))/15)*10);
    score = score.toFixed(1);

    // Simpan tugas dalam array
    let assignment = { name, score };
    let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
    assignments.push(assignment);

    // Urutkan berdasarkan skor tertinggi
    assignments.sort((a, b) => b.score - a.score);

    // Simpan kembali ke localStorage
    localStorage.setItem("assignments", JSON.stringify(assignments));

    // Tampilkan tugas
    displayAssignments();
    document.getElementById("assignmentForm").reset();
});

function displayAssignments() {
    let assignmentList = document.getElementById("assignmentList");
    assignmentList.innerHTML = "";

    let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
    assignments.forEach((assignment, index) => {
        let li = document.createElement("li");
        li.innerHTML = `${assignment.name} - Score: <strong>${assignment.score}</strong> 
            <button class="delete-btn" onclick="deleteAssignment(${index})">❌</button>`;
        assignmentList.appendChild(li);
    });
}

function deleteAssignment(index) {
    let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
    assignments.splice(index, 1);
    localStorage.setItem("assignments", JSON.stringify(assignments));
    displayAssignments();
}

// Load assignments saat halaman dimuat
displayAssignments();
