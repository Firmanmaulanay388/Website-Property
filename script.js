// ------------------- AUTH -------------------
function login() {
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const storedUsers = JSON.parse(localStorage.getItem("users")) || [];

  const foundUser = storedUsers.find(u => u.username === user && u.password === pass);

  if (foundUser) {
    localStorage.setItem("loggedIn", "true");
    window.location.href = "index.html";
  } else {
    document.getElementById("error-message").innerText = "Username atau password salah!";
  }
}

function register() {
  const newUser = document.getElementById("newUsername").value;
  const newPass = document.getElementById("newPassword").value;

  if (newUser === "" || newPass === "") {
    document.getElementById("register-message").innerText = "Isi semua kolom!";
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.find(u => u.username === newUser)) {
    document.getElementById("register-message").innerText = "Username sudah terdaftar!";
    return;
  }

  users.push({ username: newUser, password: newPass });
  localStorage.setItem("users", JSON.stringify(users));
  document.getElementById("register-message").style.color = "green";
  document.getElementById("register-message").innerText = "Akun berhasil dibuat! Silakan login.";
}

function resetPassword() {
  const username = document.getElementById("forgotUsername").value;
  const newPassword = document.getElementById("newPassword").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];
  const index = users.findIndex(u => u.username === username);

  if (index === -1) {
    document.getElementById("forgot-message").innerText = "Username tidak ditemukan!";
    return;
  }

  users[index].password = newPassword;
  localStorage.setItem("users", JSON.stringify(users));
  document.getElementById("forgot-message").style.color = "green";
  document.getElementById("forgot-message").innerText = "Password berhasil direset!";
}

// ------------------- MAIN PAGE -------------------
function checkLogin() {
  const loggedIn = localStorage.getItem("loggedIn");
  if (!loggedIn) window.location.href = "login.html";
}

function logout(event) {
  event.preventDefault();
  const yakin = confirm("Apakah Anda yakin ingin keluar?");
  if (yakin) {
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
  }
}


function showSection(sectionId) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.querySelector(`#${sectionId}`).classList.add("active");

  document.querySelectorAll(".navbar nav a").forEach(a => a.classList.remove("active"));
  document.querySelector(`nav a[onclick="showSection('${sectionId}')"]`).classList.add("active");
}

// Tombol WhatsApp
function contactWA(propertyName) {
  const phone = "081211922590"; // Ganti nomor kamu
  const message = `Halo, saya tertarik dengan properti ${propertyName}. Apakah masih tersedia?`;
  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// Slider banner otomatis
let slideIndex = 0;
function showSlides() {
  let slides = document.getElementsByClassName("slide");
  for (let i = 0; i < slides.length; i++) slides[i].style.display = "none";
  slideIndex++;
  if (slideIndex > slides.length) slideIndex = 1;
  slides[slideIndex - 1].style.display = "block";
  setTimeout(showSlides, 4000);
}
showSlides();
// ------------------- FITUR SEARCH -------------------
function searchProperty() {
  const input = document.getElementById("searchInput").value.toLowerCase();
  const cards = document.querySelectorAll(".property-card");

  cards.forEach(card => {
    const name = card.getAttribute("data-name").toLowerCase();
    const location = card.getAttribute("data-location").toLowerCase();

    if (name.includes(input) || location.includes(input)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
}
// ------------------- LIHAT LOKASI MAP -------------------
function openMap(url) {
  window.open(url, '_blank');
}
