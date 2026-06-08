
const students = []

function register() {
    event.preventDefault()
    var rname = document.getElementById("rname").value;
    var remail = document.getElementById("rmail").value;
    var rpassword = document.getElementById("rpassword").value;
    var rcpassword = document.getElementById("rcpassword").value;

    if (rpassword != rcpassword) {
        alert("Pass MisMatch Re-Enter the password")
        return
    }

    var entry = {
        rname, remail, rpassword, rcpassword
    }

    window.localStorage.setItem(`entry`, JSON.stringify(entry))


    window.location.href = "login.html"
}

function validateLogin() {
    event.preventDefault()

    var lmail = document.getElementById("lemail").value;
    var lpass = document.getElementById("lpass").value
    var entry = JSON.parse(window.localStorage.getItem('entry'))

    if (!entry) {
        alert("No User Found Register");
        window.location.href = "register.html";
        return
    }

    var remail = entry.remail
    var rpass = entry.rpassword

    if (lmail !== remail) {
        alert("Invalid Email")
        return
    }
    if (lpass !== rpass) {
        alert("Invalid Password")
        return
    }
    window.location.href = "dashboard.html"
}

function addStd(event) {
    event.preventDefault()

    var sname = document.getElementById("sname").value
    var sbranch = document.getElementById("sbranch").value
    var srno = document.getElementById("srno").value
    var scgpa = document.getElementById("scgpa").value

    const std = { sname, sbranch, srno, scgpa }

    var existing = JSON.parse(localStorage.getItem('students')) || []
    existing.push(std);

    localStorage.setItem('students', JSON.stringify(existing))

    window.location.href = "viewstd.html"
}

function viewStudents() {
    var studentTableBody = document.getElementsByTagName("tbody")[0]

    var students = JSON.parse(localStorage.getItem('students')) || []

    students.forEach(function (student, index) {
        var row = document.createElement("tr")

        var name = document.createElement("td")
        name.textContent = student.sname

        var rollNo = document.createElement("td")
        rollNo.textContent = student.srno

        var branch = document.createElement("td")
        branch.textContent = student.sbranch

        var cgpa = document.createElement("td")
        cgpa.textContent = student.scgpa

        var editCell = document.createElement("td")
        var editLink = document.createElement("a")
        editLink.href = "editstd.html?index=" + index
        editLink.textContent = "edit"
        editCell.appendChild(editLink)

        var deleteCell = document.createElement("td")
        var deleteButton = document.createElement("button")
        deleteButton.textContent = "delete"
        deleteButton.onclick = function () {
            deleteStudent(index)
        }
        deleteCell.appendChild(deleteButton)

        row.appendChild(name)
        row.appendChild(rollNo)
        row.appendChild(branch)
        row.appendChild(cgpa)
        row.appendChild(editCell)
        row.appendChild(deleteCell)

        studentTableBody.appendChild(row)
    })
}

function getSelectedStudentIndex() {
    var params = new URLSearchParams(window.location.search)
    return params.get("index")
}

function loadSelectedStudent() {
    var nameInput = document.getElementById("sname")
    var rollNoInput = document.getElementById("srno")
    var branchInput = document.getElementById("sbranch")
    var cgpaInput = document.getElementById("scgpa")

    var selectedIndex = getSelectedStudentIndex()
    var students = JSON.parse(localStorage.getItem('students')) || []
    var selectedStudent = students[selectedIndex]

    if (!selectedStudent) {
        alert("Student not found")
        window.location.href = "viewstd.html"
        return
    }

    nameInput.value = selectedStudent.sname
    rollNoInput.value = selectedStudent.srno
    branchInput.value = selectedStudent.sbranch
    cgpaInput.value = selectedStudent.scgpa
}

function saveStudent(event) {
    event.preventDefault()

    var selectedIndex = getSelectedStudentIndex()
    var students = JSON.parse(localStorage.getItem('students')) || []

    if (!students[selectedIndex]) {
        alert("Student not found")
        window.location.href = "viewstd.html"
        return
    }

    students[selectedIndex] = {
        sname: document.getElementById("sname").value,
        srno: document.getElementById("srno").value,
        sbranch: document.getElementById("sbranch").value,
        scgpa: document.getElementById("scgpa").value
    }

    localStorage.setItem('students', JSON.stringify(students))
    window.location.href = "viewstd.html"
}

function deleteStudent(index) {
    var students = JSON.parse(localStorage.getItem('students')) || []
    students.splice(index, 1)
    localStorage.setItem('students', JSON.stringify(students))
    window.location.reload()
}

function handleLogout() {
    localStorage.removeItem('entry')
}

document.addEventListener("DOMContentLoaded", viewStudents)
document.addEventListener("DOMContentLoaded", loadSelectedStudent)
