// หากไม่มี ข้อมูลเด้งกลับหน้า Login
if(!localStorage.getItem("username")){
    window.location.href = "index.html";
}
// Fake API and Loading
/* let loading = document.getElementById("loading");
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
 */
// function POST
    function addPost(){
        let titleInput = document.getElementById("title");
        let bodyInput = document.getElementById("body");
        let addButton = document.getElementById("addData");
        let postLoading = document.getElementById("postLoading");

        let title = titleInput.value;
        let body = bodyInput.value;

        //เช็คค่าว่างของ Input Title Body
        if(title == "" || body == ""){
            alert("กรุณากรอกข้อมูลให้ครบ");
            titleInput.value = "";
            bodyInput.value = "";
            titleInput.focus();
            return;
        }
        // เริ่ม Loading ของ การเพิ่มข้อมูล
        postLoading.style.display = "block";
        addButton.disabled = true;
        fetch("https://jsonplaceholder.typicode.com/posts",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title,
                body: body
            })
        })
        .then(res => res.json())
        .then(data => {
            // ซ่อน postLoading
            postLoading.style.display = "none";
            addButton.disabled = false;

            let container = document.getElementById("posts");
            let div = document.createElement("div");
            div.innerHTML = `<h3>${data.title}</h3><p>${data.body}</p>`;
            container.prepend(div);
            alert("เพิ่มข้อมูลสำเร็จ!");
            //เคลี่ยค่า Input
            titleInput.value = "";
            bodyInput.value = "";
            //ให้เพิ่มไปยัง title (Focus)
            titleInput.focus();
            console.log(data);
        })
        .catch(err => {
            postLoading.style.display = "none";
            addButton.disabled = false;
            alert("เกิดข้อผิดพลาด");
            console.error(err);
        });
    }
// ชื่อของผู้ใช้งาน
    let user = localStorage.getItem("username");
    document.getElementById("welcome").textContent = "Welcome: "+ user;

// Logout
function logout(){
    localStorage.clear();
    window.location.href = "index.html";
}