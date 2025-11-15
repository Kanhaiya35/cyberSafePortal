/* ==================== LOAD USER NAME ==================== */
// If you store login info in localStorage (recommended):
const username = localStorage.getItem("userName");

// If username exists, update dashboard title
if (username) {
    const title = document.querySelector("main h1");
    if (title) {
        title.innerHTML = `Welcome, ${username}`;
    }
}


/* ==================== LOGOUT ==================== */
const logoutBtn = document.querySelector(".btn-outline[href='../index.html']");

if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.clear();    // clear tokens / user data
        window.location.href = "../index.html";
    });
}


/* ==================== MOBILE MENU TOGGLE ==================== */
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.querySelector(".nav-links");
const navActions = document.querySelector(".nav-actions");

if (menuToggle) {
    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        navActions.classList.toggle("active");
    });
}


/* ==================== FORM VALIDATION ==================== */
const incidentForm = document.querySelector("#reportIncidentForm form");

if (incidentForm) {
    incidentForm.addEventListener("submit", (e) => {

        const incidentType = document.getElementById("incidentType").value;
        const incidentDesc = document.getElementById("incidentDesc").value.trim();
        const contactEmail = document.getElementById("contactEmail").value;

        if (!incidentType || incidentDesc === "" || !contactEmail) {
            alert("Please complete all required fields!");
            e.preventDefault();
        }
    });
}


/* ==================== FILE UPLOAD LIMIT ==================== */
const fileInput = document.getElementById("incidentFiles");

if (fileInput) {
    fileInput.addEventListener("change", function () {
        if (this.files.length > 5) {
            alert("You can upload a maximum of 5 files.");
            this.value = "";
        }
    });
}


/* ==================== IMAGE PREVIEW (Optional) ==================== */
if (fileInput) {
    fileInput.addEventListener("change", function () {

        // Remove old preview div (if exists)
        const oldPreview = document.getElementById("file-preview");
        if (oldPreview) oldPreview.remove();

        const preview = document.createElement("div");
        preview.id = "file-preview";
        preview.style.marginTop = "15px";
        preview.innerHTML = "<strong>Preview:</strong><br>";

        [...this.files].forEach(file => {
            if (file.type.startsWith("image/")) {
                const img = document.createElement("img");
                img.src = URL.createObjectURL(file);
                img.style.width = "110px";
                img.style.margin = "10px";
                img.style.borderRadius = "8px";
                img.style.boxShadow = "0 2px 6px rgba(0,0,0,.1)";
                preview.appendChild(img);
            }
        });

        this.insertAdjacentElement("afterend", preview);
    });
}
