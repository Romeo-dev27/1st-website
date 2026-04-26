const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const form = document.getElementById("contactForm");
const formFeedback = document.getElementById("formFeedback");
const revealItems = document.querySelectorAll(
  ".hero-card, .offer-card, .about-panel, .faq-list details, .contact-card, .contact-form",
);

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });
}

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const offer = document.getElementById("offer").value.trim();

    if (!name || !email || !offer) {
      formFeedback.textContent = "Merci de remplir les champs obligatoires.";
      formFeedback.style.color = "#ffb3b8";
      return;
    }

    formFeedback.textContent =
      "Message envoye. Pense a relier ce formulaire a ton email ou a un service comme Formspree.";
    formFeedback.style.color = "#1ec8a5";
    form.reset();
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.18 },
);

revealItems.forEach((item) => {
  item.classList.add("reveal");
  observer.observe(item);
});
