// Falaq Holdings Ltd.
// Admin Panel JavaScript

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");

  if (!loginForm) return;

  loginForm.addEventListener("submit", (event) => {
    event.preventDefault();

    loginMessage.textContent =
      "Authentication system is being connected.";
  });
});
