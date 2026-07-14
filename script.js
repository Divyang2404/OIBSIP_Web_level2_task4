// ----------------------
// REGISTER
// ----------------------

const registerForm = document.getElementById("registerForm");

if(registerForm){

    registerForm.addEventListener("submit",function(e){

        e.preventDefault();

        const name=document.getElementById("name").value.trim();
        const email=document.getElementById("email").value.trim();
        const password=document.getElementById("password").value;
        const confirm=document.getElementById("confirmPassword").value;

        if(password!==confirm){

            alert("Passwords do not match.");
            return;

        }

        let users=JSON.parse(localStorage.getItem("users")) || [];

        const exists=users.find(user=>user.email===email);

        if(exists){

            alert("User already exists.");
            return;

        }

        users.push({

            name,
            email,
            password

        });

        localStorage.setItem("users",JSON.stringify(users));

        alert("Registration successful!");

        window.location.href="index.html";

    });

}

// ----------------------
// LOGIN
// ----------------------

const loginForm=document.getElementById("loginForm");

if(loginForm){

    loginForm.addEventListener("submit",function(e){

        e.preventDefault();

        const email=document.getElementById("loginEmail").value.trim();
        const password=document.getElementById("loginPassword").value;

        let users=JSON.parse(localStorage.getItem("users")) || [];

        const user=users.find(user=>user.email===email && user.password===password);

        if(!user){

            alert("Invalid email or password.");
            return;

        }

        localStorage.setItem("loggedInUser",JSON.stringify(user));

        window.location.href="dashboard.html";

    });

}

// ----------------------
// DASHBOARD
// ----------------------

if(window.location.pathname.includes("dashboard.html")){

    const user=JSON.parse(localStorage.getItem("loggedInUser"));

    if(!user){

        window.location.href="index.html";

    }
    else{

        document.getElementById("welcome").textContent=
        `Welcome, ${user.name}! 👋`;

        document.getElementById("userName").textContent=user.name;

        document.getElementById("userEmail").textContent=user.email;

    }

}

// ----------------------
// LOGOUT
// ----------------------

const logoutBtn=document.getElementById("logoutBtn");

if(logoutBtn){

    logoutBtn.addEventListener("click",function(e){

        e.preventDefault();

        localStorage.removeItem("loggedInUser");

        window.location.href="index.html";

    });

}