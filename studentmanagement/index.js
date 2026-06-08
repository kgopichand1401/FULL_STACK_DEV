
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

function addStd() {
    event.preventDefault()

    var sname = document.getElementById("sname").value
    var sbranch = document.getElementById("sbranch").value
    var srno = document.getElementById("srno").value
    var scgpa = document.getElementById("scgpa").value

    const std = { sname, sbranch, srno, scgpa }

    var existing = JSON.parse(localStorage.getItem('students')) || []
    existing.push(std);

    localStorage.setItem('students', JSON.stringify(existing))
    console.log(JSON.stringify(localStorage.getItem('students')))

    window.location.href = "viewstd.html"
}

function handleLogout() {
    localStorage.removeItem('entry')
}