// หากไม่มี ข้อมูลเด้งกลับหน้า Login
if(!localStorage.getItem("username")){
    window.location.href = "index.html";
}
// Fake API and Loading
let loading = document.getElementById("loading");
let container = document.getElementById("posts");
loading.style.display = "block";
fetch("https://jsonplaceholder.typicode.com/posts")
    .then(response =>{
        if(!response.ok){
            throw new Error("API error");
        }
        return response.json();
    })
    .then(data => {
        loading.style.display = "none"; //ซ่อน Loading
        data.slice(0,10).forEach(post => {
            let div = document.createElement("div");
            div.innerHTML = `<h3>${post.title}</h3><p>${post.body}</p>`;
            container.appendChild(div);
        });
    })
    .catch(error => {
            loading.style.display = "block"; //ซ่อน Loading
            loading.textContent = "โหลดข้อมูลไม่สำเร็จ";
            console.error(error);//debug
    });

// ชื่อของผู้ใช้งาน
    let user = localStorage.getItem("username");
    document.getElementById("welcome").textContent = "Welcome: "+ user;

// Logout
function logout(){
    localStorage.clear();
    window.location.href = "index.html";
}