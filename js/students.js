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

let students = JSON.parse(localStorage.getItem("students")) || [];

const addBtn = document.getElementById("add-student-btn");
const modal = document.getElementById("student-modal");
const form = document.getElementById("student-form");
const closeBtn = document.getElementById("close-modal");
const studentsList = document.getElementById("students-table-body");

if (addBtn && modal && closeBtn) {
    addBtn.addEventListener("click", () => {
        modal.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            modal.style.display = "none";
        }
    });
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    addStudent();
    form.reset(); // reset input sau khi thêm
    modal.style.display = "none"; // đóng modal thêm
});

function addStudent() {
    let name = document.getElementById("student-name").value.trim();
    let email = document.getElementById("student-email").value.trim();
    let phone = document.getElementById("student-phone").value.trim();
    let enrollNumber = document.getElementById("student-enroll").value.trim();
    let dateOfAdmission = document.getElementById("student-date").value.trim();

    if (name && email && phone && enrollNumber && dateOfAdmission) {
        students.push({
            name,
            email,
            phone,
            enrollNumber,
            dateOfAdmission,
            photo: "/assets/images/Dashboard/avatar-info.png"
        });

        // Lưu lại danh sách sinh viên mới vào localStorage
        localStorage.setItem("students", JSON.stringify(students));

        renderStudents();
    }
}

function renderStudents() {
    let html = "";

    students.forEach((stu, index) => {
        html += `
            <tr class="student-row">
                <td class="student-id">${index + 1}</td>
                <td class="student-photo"><img src="${stu.photo}" alt="Student Photo"></td>
                <td class="student-name">${stu.name}</td>
                <td class="student-email">${stu.email}</td>
                <td class="student-phone">${stu.phone}</td>
                <td class="student-enroll">${stu.enrollNumber}</td>
                <td class="student-date">${stu.dateOfAdmission}</td>
                <td class="student-actions">
                    <i class="fa-solid fa-pen icon-edit" onclick="editStudent(${index})"></i>
                    <i class="fa-solid fa-trash icon-delete" onclick="removeStudent(${index})"></i>
                </td>
            </tr>
            `;
    });

    studentsList.innerHTML = html;
}

let boxEditStudent = document.getElementById("edit-student-modal-wrapper");
let currentEditIndex = null;

document.getElementById("close-edit-modal").addEventListener("click", () => {
    boxEditStudent.style.display = "none";
});

// Mở hộp sửa + đổ dữ liệu vào input
function editStudent(index) {
    currentEditIndex = index;

    boxEditStudent.style.display = "flex";

    document.getElementById("edit-name").value = students[index].name;
    document.getElementById("edit-email").value = students[index].email;
    document.getElementById("edit-phone").value = students[index].phone;
    document.getElementById("edit-enroll").value = students[index].enrollNumber;
    document.getElementById("edit-date").value = students[index].dateOfAdmission;
}

// Xử lý lưu lại khi submit form sửa
document.getElementById("edit-student-form").addEventListener("submit", function (e) {
    e.preventDefault(); // tránh reload trang

    const name = document.getElementById("edit-name").value.trim();
    const email = document.getElementById("edit-email").value.trim();
    const phone = document.getElementById("edit-phone").value.trim();
    const enrollNumber = document.getElementById("edit-enroll").value.trim();
    const dateOfAdmission = document.getElementById("edit-date").value;

    students[currentEditIndex] = {
        ...students[currentEditIndex], // giữ nguyên ảnh hoặc các giá trị khác
        name,
        email,
        phone,
        enrollNumber,
        dateOfAdmission
    };

    localStorage.setItem("students", JSON.stringify(students));
    renderStudents();
    boxEditStudent.style.display = "none";
});

function removeStudent(index) {
    const confirmDelete = confirm("Bạn có chắc chắn muốn xoá sinh viên này không?");
    if (!confirmDelete) return;

    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    renderStudents();
}
let isNameAscending = true;
function sortByName() {
    if (isNameAscending) {
        students.sort((a, b) => a.name.localeCompare(b.name));
    } else {
        students.sort((a, b) => b.name.localeCompare(a.name));
    }

    isNameAscending = !isNameAscending; 
    localStorage.setItem("students", JSON.stringify(students));
    renderStudents(); 
}

// Nút bấm SORT
document.getElementById("sort-toggle").addEventListener("click", () => {
    sortByName();
});

// Gọi hàm để hiển thị danh sách sinh viên ngay khi tải
renderStudents();
const currentPage = window.location.pathname.split("/").pop().replace(".html", "");
const navItem = document.querySelector(`.nav-item.${currentPage}`);
if (navItem) navItem.classList.add("active");
