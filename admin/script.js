/* =====================================================
   FALAQ HOLDINGS LTD.
   Secure Supabase Authentication
   ===================================================== */

const SUPABASE_URL =
    "https://vhktiuhkvpvwugpibxbh.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_F1lBNaoYiI0nX45r1a4ItQ_fjq991lC";


/* ==============================
   LOAD SUPABASE
   ============================== */

const supabaseScript = document.createElement("script");

supabaseScript.src =
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js";

supabaseScript.onload = function () {

    const supabaseClient =
        window.supabase.createClient(
            SUPABASE_URL,
            SUPABASE_KEY
        );


    /* ==============================
       LOGIN PAGE
       ============================== */

    const loginForm =
        document.getElementById("loginForm");

    if (loginForm) {

        const passwordInput =
            document.getElementById("password");

        const togglePassword =
            document.getElementById("togglePassword");

        const loginMessage =
            document.getElementById("loginMessage");

        const rememberCheckbox =
            document.getElementById("remember");

        const emailInput =
            document.getElementById("email");


        /* Show / Hide Password */

        if (togglePassword && passwordInput) {

            togglePassword.addEventListener(
                "click",
                function () {

                    if (
                        passwordInput.type ===
                        "password"
                    ) {

                        passwordInput.type =
                            "text";

                        togglePassword.textContent =
                            "Hide";

                    } else {

                        passwordInput.type =
                            "password";

                        togglePassword.textContent =
                            "Show";
                    }

                }
            );
        }


        /* Remember Email */

        const savedEmail =
            localStorage.getItem(
                "falaq_admin_email"
            );

        if (savedEmail && emailInput) {

            emailInput.value =
                savedEmail;

            if (rememberCheckbox) {
                rememberCheckbox.checked = true;
            }
        }


        /* Login */

        loginForm.addEventListener(
            "submit",
            async function (event) {

                event.preventDefault();

                const email =
                    emailInput.value.trim();

                const password =
                    passwordInput.value;


                if (!email || !password) {

                    loginMessage.textContent =
                        "Please enter your email and password.";

                    loginMessage.className =
                        "login-message error";

                    return;
                }


                loginMessage.textContent =
                    "Signing in...";

                loginMessage.className =
                    "login-message";


                const { data, error } =
                    await supabaseClient.auth
                        .signInWithPassword({
                            email: email,
                            password: password
                        });


                if (error) {

                    loginMessage.textContent =
                        "Invalid email or password.";

                    loginMessage.className =
                        "login-message error";

                    return;
                }


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


                loginMessage.textContent =
                    "Login successful. Opening dashboard...";

                loginMessage.className =
                    "login-message success";


                setTimeout(function () {

                    window.location.href =
                        "dashboard.html";

                }, 700);

            }
        );


        /* Forgot Password */

        const forgotPassword =
            document.querySelector(
                ".forgot-password"
            );

        if (forgotPassword) {

            forgotPassword.addEventListener(
                "click",
                async function (event) {

                    event.preventDefault();

                    const email =
                        emailInput.value.trim();

                    if (!email) {

                        loginMessage.textContent =
                            "Enter your email address first.";

                        loginMessage.className =
                            "login-message error";

                        return;
                    }


                    const { error } =
                        await supabaseClient.auth
                            .resetPasswordForEmail(
                                email,
                                {
                                    redirectTo:
                                        window.location
                                            .origin +
                                        "/admin/index.html"
                                }
                            );


                    if (error) {

                        loginMessage.textContent =
                            "Unable to send password reset email.";

                        loginMessage.className =
                            "login-message error";

                    } else {

                        loginMessage.textContent =
                            "Password reset email sent.";

                        loginMessage.className =
                            "login-message success";
                    }

                }
            );
        }
    }


    /* ==============================
       DASHBOARD PROTECTION
       ============================== */

    const dashboard =
        document.querySelector(".dashboard");

    if (dashboard) {

        supabaseClient.auth
            .getSession()
            .then(function (result) {

                const session =
                    result.data.session;

                if (!session) {

                    window.location.href =
                        "index.html";

                }

            });


        /* Sign Out */

        const logoutButton =
            document.getElementById(
                "logoutButton"
            );

        if (logoutButton) {

            logoutButton.addEventListener(
                "click",
                async function () {

                    await supabaseClient.auth
                        .signOut();

                    window.location.href =
                        "index.html";

                }
            );
        }
    }

};

document.head.appendChild(
    supabaseScript
);
