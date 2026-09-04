document.addEventListener("DOMContentLoaded", () => {
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();

  const navLinks = document.querySelectorAll(".nav-link");
  const current = location.pathname.split("/").pop() || "index.html";
  navLinks.forEach(link => {
    const href = link.getAttribute("href");
    if (href === current) link.classList.add("active");
  });

  document.querySelectorAll(".menu-filter button").forEach(button => {
    button.addEventListener("click", () => {
      document.querySelectorAll(".menu-filter button").forEach(b => b.classList.remove("active"));
      button.classList.add("active");
      const category = button.dataset.filter;
      document.querySelectorAll(".menu-item").forEach(item => {
        item.classList.toggle("hide", category !== "all" && item.dataset.category !== category);
      });
    });
  });

  const reservationForm = document.querySelector("#reservationForm");
  if (reservationForm) {
    reservationForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.querySelector("#name").value.trim();
      const date = document.querySelector("#date").value;
      const guests = document.querySelector("#guests").value;
      if (!name || !date || !guests) return;
      showMessage(`Thank you, ${name}! Your reservation request for ${guests} guest(s) has been received.`);
      reservationForm.reset();
    });
  }

  const contactForm = document.querySelector("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", e => {
      e.preventDefault();
      const name = document.querySelector("#contactName").value.trim();
      showMessage(`Thanks ${name || "there"}! Your message has been sent successfully.`);
      contactForm.reset();
    });
  }

  const newsletter = document.querySelector("#newsletterForm");
  if (newsletter) {
    newsletter.addEventListener("submit", e => {
      e.preventDefault();
      showMessage("You're subscribed to Yuba Café updates!");
      newsletter.reset();
    });
  }

  const dateInput = document.querySelector("#date");
  if (dateInput) dateInput.min = new Date().toISOString().split("T")[0];
});

function showMessage(message) {
  const box = document.querySelector("#siteToast");
  const text = document.querySelector("#toastText");
  if (!box || !text) {
    alert(message);
    return;
  }
  text.textContent = message;
  bootstrap.Toast.getOrCreateInstance(box).show();
}
