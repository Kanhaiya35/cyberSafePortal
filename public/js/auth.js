const loginForm = document.getElementById("loginForm");
const toast = document.getElementById("toast");
const toastMessage = document.getElementById("toastMessage");

// Show Toast
function showToast(msg, success = true) {
    toastMessage.innerText = msg;
    toast.style.background = success ? "#16a34a" : "#dc2626";
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2500);
}

// Toggle password
document.getElementById("togglePassword").addEventListener("click", () => {
    const password = document.getElementById("password");
    const icon = document.querySelector("#togglePassword i");

    if (password.type === "password") {
        password.type = "text";
        icon.classList.remove("fa-eye");
        icon.classList.add("fa-eye-slash");
    } else {
        password.type = "password";
        icon.classList.remove("fa-eye-slash");
        icon.classList.add("fa-eye");
    }
});

// Login Logic
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim();
    const role = document.querySelector("input[name='role']:checked").value;

    if (!email.includes("@") || password.length < 4) {
        showToast("Invalid Email or Password", false);
        return;
    }

    // Demo hardcoded login | replace with API later
    if (role === "admin") {
        if (email === "admin@cybersafe.com" && password === "admin123") {
            showToast("Admin Login Successful!");
            setTimeout(() => {
                window.location.href = "admin/dashboard.html";
            }, 1200);
        } else {
            showToast("Admin credentials incorrect", false);
        }
    } else {
        if (email === "user@cybersafe.com" && password === "user123") {
            showToast("User Login Successful!");
            setTimeout(() => {
                window.location.href = "user/dashboard.html";
            }, 1200);
        } else {
            showToast("User credentials incorrect", false);
        }
    }
});
