let button = document.querySelector("button");
    // 1. ตั้งค่าปุ่มตอนโหลด
    if(!localStorage.getItem("username")){
        button.textContent = 'Register';
    }else{
        button.textContent = 'Login';
    }
    // 2. event
    button.addEventListener("click",function(event){
        event.preventDefault();
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;

        let saveUsername = localStorage.getItem("username");
        let savePassword = localStorage.getItem("password");

    // 3. Main Logic
    if(!saveUsername){
        //Register
        localStorage.setItem("username",username);
        localStorage.setItem("password",password);
        alert("Sign up Successfully!");
        button.textContent = 'Sign In';
    }else{
        //Login
        if(username === saveUsername && password === savePassword){
            window.location.href = "dashboard.html"
        }else{
            alert("Username หรือ Password ไม่ถูกต้อง")
        }
    }
    });
    function logout(){
        localStorage.clear();
        alert("Logout Successfully!");
        let logoutButton = document.getElementById("logout").value;
        logoutButton.textContent = "Logout";
        window.location.href = "index.html";
    }
    // ชื่อของผู้ใช้งาน
    let user = localStorage.getItem("username");
    document.getElementById("welcome").textContent = "Welcome: "+ user;