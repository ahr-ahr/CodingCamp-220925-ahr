document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show-section");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  sections.forEach((sec) => {
    sec.classList.add("hidden-section");
    observer.observe(sec);
  });

  const modal = document.getElementById("nameModal");
  const submitBtn = document.getElementById("submitName");
  const inputName = document.getElementById("userNameInput");
  const welcomeSpan = document.getElementById("welcomeName");
  const formName = document.getElementById("msgName");

  modal.style.display = "flex";

  submitBtn.addEventListener("click", function () {
    const name = inputName.value.trim();
    if (name) {
      welcomeSpan.textContent = `Hi ${name}, `;

      formName.value = name;

      modal.style.display = "none";
    } else {
      alert("Please enter your name!");
    }
  });

  const hamburger = document.getElementById("hamburger");
  const navLinks = document.getElementById("nav-links");

  hamburger.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    hamburger.querySelector("i").classList.toggle("fa-bars");
    hamburger.querySelector("i").classList.toggle("fa-times");
  });

  document.querySelectorAll("#nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
      hamburger.querySelector("i").classList.add("fa-bars");
      hamburger.querySelector("i").classList.remove("fa-times");
      document.body.classList.toggle("no-scroll");
    });
  });
});

$(document).ready(function () {
  $(".portfolio-carousel").owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 4000,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 },
    },
  });
});

$(document).ready(function () {
  $(".offices-carousel").owlCarousel({
    loop: true,
    margin: 30,
    nav: true,
    dots: false,
    autoplay: true,
    autoplayTimeout: 4000,
    responsive: {
      0: { items: 1 },
      600: { items: 2 },
      1000: { items: 3 },
    },
  });
});

function validateForm() {
  const name = document.getElementById("msgName").value;
  const dob = document.getElementById("msgDOB").value;
  const gender = document.querySelector('input[name="gender"]:checked');
  const message = document.getElementById("msgContent").value;

  if (!name || !dob || !gender || !message) {
    alert("Semua field harus diisi!");
    return false;
  }

  const now = new Date();
  const outputDiv = document.getElementById("output");

  outputDiv.innerHTML = `
    <h3>Message Preview</h3>
    <p><b>Current time:</b> ${now}</p>
    <p><b>Nama:</b> ${name}</p>
    <p><b>Tanggal Lahir:</b> ${dob}</p>
    <p><b>Jenis Kelamin:</b> ${gender.value}</p>
    <p><b>Pesan:</b> ${message}</p>
  `;

  outputDiv.classList.add("show");

  const confirmModal = document.getElementById("confirmModal");
  setTimeout(() => {
    confirmModal.style.display = "flex";
  }, 3000);

  document.getElementById("confirmYes").onclick = function () {
    const form = document.getElementById("messageForm");
    const formData = new FormData(form);

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then((response) => {
        if (response.ok) {
          alert("Pesan berhasil dikirim ke email!");
          form.reset();
          outputDiv.classList.remove("show");
        } else {
          alert("Gagal mengirim pesan.");
        }
      })
      .catch((error) => {
        alert("Terjadi error: " + error);
      });

    confirmModal.style.display = "none";
  };

  document.getElementById("confirmNo").onclick = function () {
    confirmModal.style.display = "none";
  };

  return false;
}

const scrollBtn = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.style.display = "flex";
  } else {
    scrollBtn.style.display = "none";
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
