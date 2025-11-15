// Load admin data from localStorage
function loadAdminProfile() {
    const saved = localStorage.getItem("adminProfile");
    if (!saved) return;

    const admin = JSON.parse(saved);

    // Fill form
    Object.keys(admin).forEach(key => {
        const field = document.getElementById(key);
        if (field) field.value = admin[key];
    });

    // Display header
    document.getElementById("adminDisplayName").textContent = admin.adminName;
    document.getElementById("adminDisplayEmail").textContent = admin.adminEmail;

    // Statistics
    document.getElementById("statAssigned").textContent = admin.assignedCases;
    document.getElementById("statResolved").textContent = admin.resolvedCases;
    document.getElementById("statLogin").textContent = admin.lastLogin;

    // Profile photo
    if (admin.photo) {
        document.getElementById("profilePreview").src = admin.photo;
    }
}

loadAdminProfile();


// Preview profile image
document.getElementById("profilePicture").addEventListener("change", function () {
    const file = this.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function () {
        document.getElementById("profilePreview").src = reader.result;

        const saved = localStorage.getItem("adminProfile");
        if (saved) {
            let admin = JSON.parse(saved);
            admin.photo = reader.result;
            localStorage.setItem("adminProfile", JSON.stringify(admin));
        }
    };
    reader.readAsDataURL(file);
});


// Save profile
document.getElementById("adminProfileForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const admin = {
        adminName: adminName.value,
        adminEmail: adminEmail.value,
        adminPhone: adminPhone.value,
        designation: designation.value,
        department: department.value,
        adminId: adminId.value,
        assignedCases: assignedCases.value,
        resolvedCases: resolvedCases.value,
        lastLogin: lastLogin.value,
        photo: document.getElementById("profilePreview").src
    };

    localStorage.setItem("adminProfile", JSON.stringify(admin));
    alert("Profile Updated Successfully!");

    loadAdminProfile();
});
