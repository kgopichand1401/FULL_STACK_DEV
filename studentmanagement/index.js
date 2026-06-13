async function register() {
    event.preventDefault()
    var rname = document.getElementById("rname").value;
    var remail = document.getElementById("rmail").value;
    var rpassword = document.getElementById("rpassword").value;
    var rcpassword = document.getElementById("rcpassword").value;

    if (rpassword != rcpassword) {
        alert("Pass MisMatch Re-Enter the password")
        return
    }
    let user = { username: rname, email: remail, password: rpassword, cpassword: rcpassword }

    let response1 = await fetch("http://localhost:3000/users", {
        method: "GET"
    })
    let users = await response1.json()
    if (users.find(e => e.email === remail)) {
        alert("Email ALready Exists")
        return
    }

    let existuser = users.some(e => e.email == remail)
    if (existuser) {
        alert("Mail Already Register Try Login")
        return
    }

    var response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    if (response) {
        window.location.href = "login.html"
    } else {
        alert("Server Error")
    }

}

async function validateLogin() {
    event.preventDefault()

    var lmail = document.getElementById("lemail").value;
    var lpass = document.getElementById("lpass").value

    const response = await fetch("http://localhost:3000/users", {
        method: "GET"
    })
    let Users = await response.json()
    console.log(Users);

    let existuser = Users.find(e => e.email === lmail)
    if (existuser) {
        if (lpass !== existuser.password) {
            alert("Invalid Password")
            return
        }
        window.location.href = "dashboard.html"
    } else {
        alert("Email Doesnot Exist")
        return
    }

}

async function addStd(event) {
    event.preventDefault()

    var sname = document.getElementById("sname").value
    var sbranch = document.getElementById("sbranch").value
    var srno = document.getElementById("srno").value
    var scgpa = document.getElementById("scgpa").value

    const std = { sname, sbranch, srno, scgpa }
    const response = await fetch("http://localhost:3000/students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(std)
    })
    if (response) {
        window.location.href = "viewstd.html"
    } else {
        alert("Server error")
    }
}

async function viewStudents() {
    var studentTableBody = document.getElementsByTagName("tbody")[0]

    if (!studentTableBody) return

    const response = await fetch("http://localhost:3000/students", {
        method: "GET"
    })
    let students = await response.json()

    if (students.length === 0) {
        var row = document.createElement("tr")
        var td = document.createElement("td")
        td.colSpan = 6
        td.style.color = "red"
        td.textContent = "No Students Available"

        row.appendChild(td)
        studentTableBody.appendChild(row)
        return
    }


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

async function loadSelectedStudent() {
    var nameInput = document.getElementById("sname")
    var rollNoInput = document.getElementById("srno")
    var branchInput = document.getElementById("sbranch")
    var cgpaInput = document.getElementById("scgpa")

    var selectedIndex = getSelectedStudentIndex()
    var response = await fetch("http://localhost:3000/students")
    let students = await response.json()
    var selectedStudent = students[selectedIndex]

    if (!selectedStudent) {
        return
    }

    nameInput.value = selectedStudent.sname
    rollNoInput.value = selectedStudent.srno
    branchInput.value = selectedStudent.sbranch
    cgpaInput.value = selectedStudent.scgpa
}

async function saveStudent(event) {
    event.preventDefault()

    var selectedIndex = getSelectedStudentIndex()
    const response = await fetch("http://localhost:3000/students", {
        method: "GET"
    })
    var students = await response.json()
    const std = students[selectedIndex]
    var crtstd = {
        sname: document.getElementById("sname").value,
        srno: document.getElementById("srno").value,
        sbranch: document.getElementById("sbranch").value,
        scgpa: document.getElementById("scgpa").value,
    }
    const res = await fetch(`http://localhost:3000/students/${std.id}`, {
        method: "PUT",
        body: JSON.stringify(crtstd)
    })
    if (res) {
        window.location.href = "viewstd.html"
    } else {
        console.log("error");
    }
}

async function deleteStudent(index) {
    var response = await fetch("http://localhost:3000/students")
    var students = await response.json()
    var delstd = students[index]
    console.log(delstd);

    await fetch(`http://localhost:3000/students/${delstd.id}`, {
        method: "DELETE"
    })
    window.location.reload()
}

function handleLogout() {
    localStorage.removeItem('entry')
}

document.addEventListener("DOMContentLoaded", viewStudents)
document.addEventListener("DOMContentLoaded", loadSelectedStudent)