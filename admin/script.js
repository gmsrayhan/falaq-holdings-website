/* =====================================================
   FALAQ HOLDINGS LTD.
   Admin Login JavaScript
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");
    const loginMessage = document.getElementById("loginMessage");
    const rememberCheckbox = document.getElementById("remember");


    /* ==============================
       SHOW / HIDE PASSWORD
       ============================== */

    if (togglePassword && passwordInput) {

        togglePassword.addEventListener("click", function () {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";
                togglePassword.textContent = "Hide";

            } else {

                passwordInput.type = "password";
                togglePassword.textContent = "Show";

            }

        });

    }


    /* ==============================
       REMEMBER ME
       ============================== */

    const savedEmail = localStorage.getItem("falaq_admin_email");

    if (savedEmail) {

        const emailInput = document.getElementById("email");

        if (emailInput) {
            emailInput.value = savedEmail;
        }

        if (rememberCheckbox) {
            rememberCheckbox.checked = true;
        }

    }


    /* ==============================
       LOGIN FORM
       ============================== */

    if (loginForm) {

        loginForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const emailInput = document.getElementById("email");

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();


            /* Clear previous message */

            loginMessage.textContent = "";
            loginMessage.className = "login-message";


            /* Check empty fields */

            if (!email || !password) {

                loginMessage.textContent =
                    "Please enter your email address and password.";

                loginMessage.classList.add("error");

                return;
            }


            /* Remember email */

            if (rememberCheckbox && rememberCheckbox.checked) {

                localStorage.setItem(
                    "falaq_admin_email",
                    email
                );

            } else {

                localStorage.removeItem("falaq_admin_email");

            }


            /* Temporary login message */

            loginMessage.textContent =
                "Login system is being prepared.";

            loginMessage.classList.add("success");


            /*
             * IMPORTANT:
             *
             * This website is currently hosted on GitHub Pages.
             * GitHub Pages cannot securely handle real admin
             * authentication or passwords.
             *
             * Real authentication will be connected later
             * with a secure backend/authentication service.
             */

        });

    }


    /* ==============================
       FORGOT PASSWORD
       ============================== */

    const forgotPassword =
        document.querySelector(".forgot-password");

    if (forgotPassword) {

        forgotPassword.addEventListener("click", function (event) {

            event.preventDefault();

            loginMessage.textContent =
                "Password recovery will be available after the secure authentication system is connected.";

            loginMessage.className =
                "login-message";

        });

    }

});
