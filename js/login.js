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
        let users = JSON.parse(localStorage.getItem("users")) || []

        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
    
    let foundUser = users.find(u => u.username === username);
    // 3. Main Logic
    if(!foundUser){
        //Register
        users.push({
            username: username,
            password: password
        });
        localStorage.setItem("users",JSON.stringify(users));
        alert("สมัครสำเร็จ!"); 
        button.textContent = 'Sign In';
    }else{
        //Login
        if(foundUser.password == password){
            // สำเร็จ
            alert("Login สำเร็จ!");
            localStorage.setItem("currentUser",username);
            window.location.href = "dashboard.html";
        }else{
            //ไม่สำเร็จ
            alert("Password ไม่ถูกต้อง");
        }
    }
});