// Fetch student data from the server
async function fetchStudents() {
    try {
        const response = await fetch('http://localhost:3000/students');
        const students = await response.json();
        return students;
    } catch (error) {
        console.error('Error fetching student data:', error);
    }
}
// Render the student table with the provided data
function renderTable(data) {
    const tableBody = document.querySelector("#studentTable tbody");
    tableBody.innerHTML = "";

    data.forEach((student, index) => {
        const row = document.createElement("tr");
        // Add each student property to the table row
        Object.values(student).forEach(value => {
            const cell = document.createElement("td");
            cell.textContent = value;
            row.appendChild(cell);
        });
        // Add  Edit and Remove buttons to the table row
        const actionsCell = document.createElement("td");
        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "button";
        editButton.onclick = () => editRow(index);

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "button";
        removeButton.onclick = () => removeRow(index);

        actionsCell.appendChild(editButton);
        actionsCell.appendChild(removeButton);
        row.appendChild(actionsCell);

        tableBody.appendChild(row);
    });
}
// Edit a student row based on index
function editRow(index) {
    const student = students[index];
    const newFirstName = prompt("Edit First Name", student.firstName);
    const newLastName = prompt("Edit Last Name", student.lastName);
    const newDateOfBirth = prompt("Edit Date of Birth", student.dateOfBirth);
    const newGender = prompt("Edit Gender", student.gender);
    const newAdmissionNo = prompt("Edit Admission No", student.admissionNo);
    const newDateOfAdmission = prompt("Edit Date of Admission", student.dateOfAdmission);
    // Update the student object with new values or retain old values if none provided
    students[index] = {
        ...student,
        firstName: newFirstName || student.firstName,
        lastName: newLastName || student.lastName,
        dateOfBirth: newDateOfBirth || student.dateOfBirth,
        gender: newGender || student.gender,
        admissionNo: newAdmissionNo || student.admissionNo,
        dateOfAdmission: newDateOfAdmission || student.dateOfAdmission
    };

    renderTable(students);
}
// Remove a student row based on index
function removeRow(index) {
    students.splice(index, 1);
    renderTable(students);
}
// Filter and render the student table based on search input
document.getElementById('searchInput').addEventListener('input', async function() {
    const searchTerm = this.value.toLowerCase();
    const students = await fetchStudents();
    const filteredStudents = students.filter(student => 
        Object.values(student).some(value => 
            String(value).toLowerCase().includes(searchTerm)
        )
    );
    renderTable(filteredStudents);
});
// Add a new student from the form input and re-render the table
document.getElementById('addStudentForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const newStudent = {
         id: document.getElementById('newId').value,
        firstName: document.getElementById('newFirstName').value,
        lastName: document.getElementById('newLastName').value,
        dateOfBirth: document.getElementById('newDateOfBirth').value,
        gender: document.getElementById('newGender').value,
        admissionNo: document.getElementById('newAdmissionNo').value,
        dateOfAdmission: document.getElementById('newDateOfAdmission').value
    };

    students.push(newStudent);// Add new student to the array
    renderTable(students);// Re-render the table

    // Clear the form
    document.getElementById('addStudentForm').reset();
});
// Initialize the student table by fetching data and rendering it
async function initializeTable() {
    students = await fetchStudents();
    renderTable(students);
}

let students = [];// Initialize the students array
// Initial render
initializeTable();