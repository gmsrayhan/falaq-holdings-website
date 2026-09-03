/* =====================================================
   FALAQ HOLDINGS LTD.
   Admin Panel JavaScript
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* ==============================
       LOGIN ELEMENTS
       ============================== */

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

    const savedEmail =
        localStorage.getItem("falaq_admin_email");

    if (savedEmail) {

        const emailInput =
            document.getElementById("email");

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

            const emailInput =
                document.getElementById("email");

            const email =
                emailInput.value.trim();

            const password =
                passwordInput.value.trim();


            /* Clear previous message */

            if (loginMessage) {

                loginMessage.textContent = "";
                loginMessage.className =
                    "login-message";

            }


            /* Check empty fields */

            if (!email || !password) {

                if (loginMessage) {

                    loginMessage.textContent =
                        "Please enter your email address and password.";

                    loginMessage.classList.add("error");

                }

                return;

            }


            /* Remember email */

            if (
                rememberCheckbox &&
                rememberCheckbox.checked
            ) {

                localStorage.setItem(
                    "falaq_admin_email",
                    email
                );

            } else {

                localStorage.removeItem(
                    "falaq_admin_email"
                );

            }


            /* Temporary login message */

            if (loginMessage) {

                loginMessage.textContent =
                    "Login system is being prepared.";

                loginMessage.classList.add("success");

            }


            /*
             * IMPORTANT:
             *
             * This is currently a static GitHub Pages website.
             *
             * Real admin authentication will be connected later
             * using a secure authentication/backend system.
             *
             * Never store a real admin password in this JavaScript file.
             */

        });

    }


    /* ==============================
       FORGOT PASSWORD
       ============================== */

    const forgotPassword =
        document.querySelector(".forgot-password");

    if (forgotPassword) {

        forgotPassword.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                if (loginMessage) {

                    loginMessage.textContent =
                        "Password recovery will be available after the secure authentication system is connected.";

                    loginMessage.className =
                        "login-message";

                }

            }
        );

    }


    /* ==============================
       DASHBOARD SIGN OUT
       ============================== */

    const logoutButton =
        document.getElementById("logoutButton");

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                /*
                 * Remove temporary admin session data
                 * when secure authentication is connected.
                 */

                localStorage.removeItem(
                    "falaq_admin_session"
                );

                window.location.href =
                    "index.html";

            }
        );

    }

});
