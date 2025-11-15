/* ============= MOBILE MENU ============= */
document.getElementById("menu-toggle").addEventListener("click", () => {
  document.querySelector(".nav-links").classList.toggle("active");
  document.querySelector(".nav-actions").classList.toggle("active");
});

/* ============= LOAD PROFILE FROM STORAGE ============= */
function loadProfile() {
  const saved = localStorage.getItem("userProfile");
  if (!saved) return;

  const p = JSON.parse(saved);

  // Fill view fields
  document.getElementById("v_fullName").textContent = p.fullName;
  document.getElementById("v_email").textContent = p.email;
  document.getElementById("v_phone").textContent = p.phone;
  document.getElementById("v_gender").textContent = p.gender;
  document.getElementById("v_dob").textContent = p.dob;
  document.getElementById("v_address").textContent = p.address;
  document.getElementById("v_city").textContent = p.city;
  document.getElementById("v_state").textContent = p.state;
  document.getElementById("v_pincode").textContent = p.pincode;
  document.getElementById("v_idType").textContent = p.idType;
  document.getElementById("v_idNumber").textContent = p.idNumber;
  document.getElementById("v_emergencyContact").textContent = p.emergencyContact;
  document.getElementById("v_emergencyPhone").textContent = p.emergencyPhone;

  // Fill header
  document.getElementById("displayName").textContent = p.fullName;
  document.getElementById("displayEmail").textContent = p.email;

  // Fill form fields
  Object.keys(p).forEach(key => {
    const el = document.getElementById(key);
    if (el) el.value = p[key];
  });
}

loadProfile();

/* ============= SWITCH TO EDIT MODE ============= */
document.getElementById("editBtn").addEventListener("click", () => {
  document.getElementById("profileView").style.display = "none";
  document.getElementById("profileForm").style.display = "block";
});

/* ============= SAVE PROFILE ============= */
document.getElementById("profileForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const p = {
    fullName: fullName.value,
    email: email.value,
    phone: phone.value,
    gender: gender.value,
    dob: dob.value,
    address: address.value,
    city: city.value,
    state: state.value,
    pincode: pincode.value,
    idType: idType.value,
    idNumber: idNumber.value,
    emergencyContact: emergencyContact.value,
    emergencyPhone: emergencyPhone.value
  };

  // Save
  localStorage.setItem("userProfile", JSON.stringify(p));

  alert("Profile Updated!");

  // Reload page to show view mode again
  location.reload();
});
