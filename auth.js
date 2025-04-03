import { loadTodos } from "./todo.js";


function saveUser(user) {
    return new Promise((resolve) => {
        setTimeout(() => {
            let users = JSON.parse(localStorage.getItem("users")) || [];
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            resolve();
        }, 500);
    });
}


function getUsers() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(JSON.parse(localStorage.getItem("users")) || []);
        }, 500);
    });
}


// Show form 
function showForm(formId) {
    document.querySelectorAll(".form").forEach(form => form.style.display = "none");
    let formElement = document.getElementById(formId);
    if (formElement) {
        formElement.style.display = "block";
    } else {
        console.error(`Form with ID "${formId}" not found.`);
    }
}

// Validate form fields
function validateForm(formId) {
    const form = document.getElementById(formId);
    let valid = true;
    const email = form.querySelector("input[placeholder='Email']");
    const password = form.querySelector("input[placeholder='Password']");

    if (email && !/^\S+@\S+\.\S+$/.test(email.value.trim())) {
        alert("Enter a valid email address.");
        valid = false;
    }

    if (password && password.value.trim().length < 6) {
        alert("Password must be at least 6 characters long.");
        valid = false;
    }

    return valid;
}


// Signup function
function signupUser(event) {
    event.preventDefault();
    if (!validateForm("form1")) 
        return;

    const signupForm = document.getElementById("form1");
    let user = {
        name: `${signupForm[0].value} ${signupForm[1].value}`,
        email: signupForm[2].value,
        password: signupForm[3].value
    };

    saveUser(user).then(() => {
        alert("User registered");
        
        localStorage.setItem("loggedUser", JSON.stringify(user));

        signupForm.reset();
        document.getElementById("form1").style.display = "none";

        loadTodos(user.email);
        document.getElementById("taskContainer").style.display = "block";
    });
}

// Login function
function loginUser(event) {
    event.preventDefault();
    if (!validateForm("form2")) return;

    const loginForm = document.getElementById("form2");
    let email = loginForm[0].value;
    let password = loginForm[1].value;

    getUsers().then(users => {
        let user = users.find(u => u.email === email && u.password === password);
        if (user) {
           
            localStorage.setItem("loggedUser", JSON.stringify(user));
            alert("Login successful!");

            document.getElementById("form2").style.display = "none";
            loadTodos(user.email);
            document.getElementById("taskContainer").style.display = "block";
        } else {
            alert("Invalid credentials");
        }
    });

    loginForm.reset();
}

// Logout function
function logoutUser() {
    document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    localStorage.removeItem("loggedUser");
    document.getElementById("taskContainer").style.display = "none";
    alert("Logged out!");
}

export { showForm, signupUser, loginUser, logoutUser };
