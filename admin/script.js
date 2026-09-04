/* =====================================================
   FALAQ HOLDINGS LTD.
   Supabase Authentication
   + Premium Admin Theme Toggle
   ===================================================== */

const SUPABASE_URL =
    "https://vhktiuhkvpvwugpibxbh.supabase.co";

const SUPABASE_KEY =
    "sb_publishable_nH65TTVD4rqYVtdsRfErYg_o2_v6J-V";


/* =====================================================
   THEME TOGGLE
   ===================================================== */

function setupThemeToggle() {

    const themeToggle =
        document.getElementById("themeToggle");

    if (!themeToggle) {
        return;
    }

    const savedTheme =
        localStorage.getItem("falaq_theme");

    if (savedTheme === "light") {

        document.body.classList.add("light-theme");
        themeToggle.textContent = "☾";

    } else {

        document.body.classList.remove("light-theme");
        themeToggle.textContent = "☀";

    }

    themeToggle.addEventListener(
        "click",
        function () {

            document.body.classList.toggle(
                "light-theme"
            );

            if (
                document.body.classList.contains(
                    "light-theme"
                )
            ) {

                localStorage.setItem(
                    "falaq_theme",
                    "light"
                );

                themeToggle.textContent = "☾";

            } else {

                localStorage.setItem(
                    "falaq_theme",
                    "dark"
                );

                themeToggle.textContent = "☀";

            }

        }
    );
}

setupThemeToggle();


/* =====================================================
   LOAD SUPABASE
   ===================================================== */

const supabaseScript =
    document.createElement("script");

supabaseScript.src =
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/dist/umd/supabase.min.js";

supabaseScript.onload =
    function () {

        const supabaseClient =
            window.supabase.createClient(
                SUPABASE_URL,
                SUPABASE_KEY
            );


        /* =================================================
           LOGIN PAGE
           ================================================= */

        const loginForm =
            document.getElementById("loginForm");

        if (loginForm) {

            const passwordInput =
                document.getElementById("password");

            const togglePassword =
                document.getElementById(
                    "togglePassword"
                );

            const loginMessage =
                document.getElementById(
                    "loginMessage"
                );

            const rememberCheckbox =
                document.getElementById(
                    "remember"
                );

            const emailInput =
                document.getElementById(
                    "email"
                );


            /* ---------------------------------------------
               SHOW / HIDE PASSWORD
               --------------------------------------------- */

            if (
                togglePassword &&
                passwordInput
            ) {

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


            /* ---------------------------------------------
               REMEMBER EMAIL
               --------------------------------------------- */

            const savedEmail =
                localStorage.getItem(
                    "falaq_admin_email"
                );

            if (
                savedEmail &&
                emailInput
            ) {

                emailInput.value =
                    savedEmail;

                if (rememberCheckbox) {

                    rememberCheckbox.checked =
                        true;

                }

            }


            /* ---------------------------------------------
               LOGIN
               --------------------------------------------- */

            loginForm.addEventListener(
                "submit",
                async function (event) {

                    event.preventDefault();

                    const email =
                        emailInput.value.trim();

                    const password =
                        passwordInput.value;

                    if (
                        !email ||
                        !password
                    ) {

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


                    const {
                        error
                    } =
                        await supabaseClient.auth
                            .signInWithPassword({

                                email: email,

                                password: password

                            });


                    if (error) {

                        console.error(
                            "Login Error:",
                            error
                        );

                        loginMessage.textContent =
                            "Invalid email or password.";

                        loginMessage.className =
                            "login-message error";

                        return;
                    }


                    /* Remember Email */

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


                    setTimeout(
                        function () {

                            window.location.href =
                                "dashboard.html";

                        },
                        700
                    );

                }
            );


            /* ---------------------------------------------
               FORGOT PASSWORD
               --------------------------------------------- */

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


                        loginMessage.textContent =
                            "Sending password reset email...";

                        loginMessage.className =
                            "login-message";


                        const redirectUrl =
                            window.location.origin +
                            "/admin/reset-password.html";


                        const {
                            error
                        } =
                            await supabaseClient.auth
                                .resetPasswordForEmail(
                                    email,
                                    {
                                        redirectTo:
                                            redirectUrl
                                    }
                                );


                        if (error) {

                            console.error(
                                "Password Reset Error:",
                                error
                            );

                            loginMessage.textContent =
                                "Reset error: " +
                                error.message;

                            loginMessage.className =
                                "login-message error";

                            return;
                        }


                        loginMessage.textContent =
                            "Password reset email sent. Please check your Gmail.";

                        loginMessage.className =
                            "login-message success";

                    }
                );
            }

        }


        /* =================================================
           DASHBOARD PROTECTION
           ================================================= */

        const dashboard =
            document.querySelector(
                ".dashboard"
            );

        if (dashboard) {

            supabaseClient.auth
                .getSession()
                .then(
                    function (result) {

                        const session =
                            result.data.session;

                        if (!session) {

                            window.location.href =
                                "index.html";

                        }

                    }
                );


            /* ---------------------------------------------
               SIGN OUT
               --------------------------------------------- */

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


/* =====================================================
   START SUPABASE SCRIPT
   ===================================================== */

document.head.appendChild(
    supabaseScript
);
