// หากไม่มี ข้อมูลเด้งกลับหน้า Login
if(!localStorage.getItem("currentUser")){
    window.location.href = "index.html";
}
// ชื่อของผู้ใช้งาน
    let user = localStorage.getItem("currentUser");
    document.getElementById("welcome").textContent = "Welcome: "+ user;

// Logout
function logout(){
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
    // function  เพิ่มข้อมูล POST
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
        fetch("http://localhost:3000/posts")
            .then(res => res.json())
            .then(data => console.log(data));
    }
    // Function editPost
    function editPost(button){
        let div = button.parentElement;

        let title = div.querySelector("h3").textContent;
        let body = div.querySelector("p").textContent;

        document.getElementById("title").value = title;
        document.getElementById("body").value = body;

        div.remove();//ลบของเก่า
    }
    // Function ลบข้อมูล POST
    function deletePost(button){
        if(confirm("ต้องการลบใช่ไหม?")){
            button.parentElement.remove();
        }
        /* let div = button.parentElement;
        div.remove(); */
    }