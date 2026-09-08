// Falaq Holdings Ltd.
// Admin Authentication

const SUPABASE_URL = "https://vhktiuhkvpvwugpibxbh.supabase.co";

// Paste your admin_web Publishable Key between the quotes below.
const SUPABASE_PUBLISHABLE_KEY = "PASTE_YOUR_ADMIN_WEB_KEY_HERE";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_PUBLISHABLE_KEY
);

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const loginMessage = document.getElementById("loginMessage");

  if (!loginForm) return;

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;

    loginMessage.textContent = "Signing in...";

    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password
    });

    if (error) {
      loginMessage.textContent = error.message;
      return;
    }

    if (!data.user) {
      loginMessage.textContent = "Login failed.";
      return;
    }

    window.location.href = "dashboard.html";
  });
});
