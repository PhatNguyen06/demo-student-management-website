//Đăng nhập
const currentUser = JSON.parse(localStorage.getItem("currentUser"));
if (!currentUser) {
    window.location.href = "signin.html";
}

const students = JSON.parse(localStorage.getItem("students")) || [];

const studentCardValue = document.getElementById("student-count");
if (studentCardValue) {
    studentCardValue.textContent = students.length;
}


// Highlight menu đang active
const currentPage = window.location.pathname.split("/").pop().replace(".html", "");
const navItem = document.querySelector(`.nav-item.${currentPage}`);
if (navItem) navItem.classList.add("active");

const logoutBtn = document.querySelector(".logout-button");

//đăng xuất
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        const confirmLogout = confirm("Bạn có chắc muốn đăng xuất không?");
        if (confirmLogout) {
            localStorage.removeItem("currentUser");
            window.location.href = "signin.html";
        }
    });
}
