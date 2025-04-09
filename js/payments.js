document.addEventListener("DOMContentLoaded", () => {
    //Đăng nhập
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUser) {
        window.location.href = "signin.html";
    }

    //đăng xuất
    const logoutBtn = document.querySelector(".logout-button");
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            const confirmLogout = confirm("Bạn có chắc muốn đăng xuất không?");
            if (confirmLogout) {
                localStorage.removeItem("currentUser");
                window.location.href = "signin.html";
            }
        });
    }

    const currentPage = window.location.pathname.split("/").pop().replace(".html", "");
    const navItem = document.querySelector(`.nav-item.${currentPage}`);
    if (navItem) navItem.classList.add("active");
});
