document.querySelector("button").addEventListener("click", function (event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    let usernameError = document.getElementById("usernameError");
    let passwordError = document.getElementById("passwordError");

    // reset ก่อน
    usernameError.textContent = "";
    passwordError.textContent = "";

    // Error ถ้า Email  ไม่กรอก @
    /* if(!email.includes("@")) {
    emailError.textContent = "Email ไม่ถูกต้อง";
    } */
    if(username === ""){
        usernameError.textContent = "กรุณากรอก Username";
        document.getElementById("username").style.borderColor = 'red';
    }else if(password === ""){
        passwordError.textContent = "กรุณากรอก Password";
        document.getElementById("password").style.borderColor = 'red';
    }else if(password.length < 6){
        passwordError.textContent = "กรุณากรอก Password อย่างน้อย 6 ตัว";
        document.getElementById("password").style.borderColor = 'red';
    }else{
        alert("เข้าสู่ระบบเสร็จสิ้น");
    }

});
