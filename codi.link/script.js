document.addEventListener("DOMContentLoaded", () => {
  const html = document.documentElement;
  const darkToggle = document.getElementById("darkToggle");
  const darkIcon = document.getElementById("darkIcon");

  /* ===== MODO OSCURO ===== */
  const enableDark = () => {
    html.classList.add("dark-mode");
    html.setAttribute("data-bs-theme", "dark");
    darkIcon.classList.replace("fa-moon", "fa-sun");
  };

  const disableDark = () => {
    html.classList.remove("dark-mode");
    html.setAttribute("data-bs-theme", "light");
    darkIcon.classList.replace("fa-sun", "fa-moon");
  };

  const savedTheme = localStorage.getItem("theme");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    enableDark();
  } else {
    disableDark();
  }

  darkToggle.addEventListener("click", () => {
    const isDark = html.classList.contains("dark-mode");
    if (isDark) {
      disableDark();
      localStorage.setItem("theme", "light");
    } else {
      enableDark();
      localStorage.setItem("theme", "dark");
    }
  });

  /* ===== SCROLL SUAVE COMPENSANDO LA NAVBAR ===== */
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const hash = link.getAttribute("href");
      if (hash.length <= 1) return;

      const target = document.querySelector(hash);
      if (target) {
        event.preventDefault();
        target.scrollIntoView({ behavior: "smooth" });

        const openCollapse = document.querySelector(".navbar-collapse.show");
        if (openCollapse) {
          bootstrap.Collapse.getOrCreateInstance(openCollapse).hide();
        }
      }
    });
  });

  /* ===== RESALTAR ENLACE ACTIVO EN LA NAVBAR ===== */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

  const highlightActive = () => {
    let currentId = sections[0] ? sections[0].id : "";
    sections.forEach((section) => {
      if (window.scrollY >= section.offsetTop - 100) {
        currentId = section.id;
      }
    });
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === "#" + currentId);
    });
  };

  window.addEventListener("scroll", highlightActive);
  highlightActive();

  /* ===== SIMULACIÓN DE ENVÍO DEL FORMULARIO ===== */
  const form = document.getElementById("contactForm");
  const formAlert = document.getElementById("formAlert");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    event.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    form.classList.remove("was-validated");
    form.reset();
    formAlert.classList.remove("d-none");

    setTimeout(() => {
      formAlert.classList.add("d-none");
    }, 5000);
  });

  /* ===== AÑO DINÁMICO DEL FOOTER ===== */
  document.getElementById("year").textContent = new Date().getFullYear();
});