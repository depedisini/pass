document.getElementById("assignmentForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value;
    let deadline = parseInt(document.getElementById("deadline").value);
    let assignmentType = parseInt(document.getElementById("assignmentType").value);
    let difficulty = parseInt(document.getElementById("difficulty").value);
    let impact = parseInt(document.getElementById("impact").value);

    let score = ((((deadline * 5)+(difficulty * 5)+(assignmentType * 5)+(impact * 3))/72)*10);
    score = score.toFixed(1);

    let assignment = { name, score };
    let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
    assignments.push(assignment);

    assignments.sort((a, b) => b.score - a.score);

    localStorage.setItem("assignments", JSON.stringify(assignments));

    displayAssignments();
    document.getElementById("assignmentForm").reset();
});

function displayAssignments() {
    let assignmentList = document.getElementById("assignmentList");
    assignmentList.innerHTML = "";

    let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
    assignments.forEach((assignment, index) => {
        let row = document.createElement("tr");

        row.innerHTML = `
            <td class="assignment-name">${assignment.name}</td>
            <td class="assignment-score">${assignment.score}</td>
            <td><button class="delete-btn" onclick="deleteAssignment(${index})">❌</button></td>
        `;

        assignmentList.appendChild(row);
    });
}


function deleteAssignment(index) {
    let confirmDelete = confirm("Are you sure you want to delete/done this assignment?");
    if (confirmDelete) {
        let assignments = JSON.parse(localStorage.getItem("assignments")) || [];
        assignments.splice(index, 1);
        localStorage.setItem("assignments", JSON.stringify(assignments));
        displayAssignments();
    }
}


// Load assignments saat halaman dimuat
displayAssignments();
