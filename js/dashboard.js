// หากไม่มี ข้อมูลเด้งกลับหน้า Login
if(!localStorage.getItem("username")){
    window.href.href = "index.html";
}
// ชื่อของผู้ใช้งาน
    let user = localStorage.getItem("username");
    document.getElementById("welcome").textContent = "Welcome: "+ user;

// Logout
function logout(){
    localStorage.clear();
    window.location.href = "index.html";
}