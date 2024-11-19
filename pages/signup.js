// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxwTaDl4OakGDqYk8faRbHW1czCAtl7ME",
  authDomain: "e-commerce-cd8a5.firebaseapp.com",
  projectId: "e-commerce-cd8a5",
  storageBucket: "e-commerce-cd8a5.firebasestorage.app",
  messagingSenderId: "507959584187",
  appId: "1:507959584187:web:ba1d6e514d2f9a5238509e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

// Getting elements: inputs and error display areas
let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");
let firstNameError = document.getElementById("firstNameError");
let lastNameError = document.getElementById("lastNameError");

// Handle form submission
let signUpForm = document.getElementById("signup-form");

signUpForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission

  // Get the values inside the submit event listener to ensure you're getting the latest values
  let firstName = document.getElementById("first_name").value;
  let lastName = document.getElementById("last_name").value;
  let email = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // Clear previous error messages
  emailError.textContent = "";
  passwordError.textContent = "";
  firstNameError.textContent = "";
  lastNameError.textContent = "";

  // Validate first name
  if (firstName.trim() === "") {
    firstNameError.textContent = "Please enter your first name.";
  } else if (firstName.length < 3 || firstName.length > 20) {
    firstNameError.textContent = "First name must be between 3 and 20 characters.";
  } else if (/\d/.test(firstName)) {
    firstNameError.textContent = "Please enter a valid name";
  } 
  if(/\d/.test(lastName)){
    lastNameError.textContent = "Please enter a valid name";
  }

  // Validate email
  if (!findValidEmail(email)) {
    emailError.textContent = "Please enter a valid email address.";
  }

  // Validate password
  if (!findValidPassword(password)) {
    passwordError.textContent = `Password is invalid. It must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a number, and a special character.`;
  }

  // If all validations pass, create the user
  if (firstNameError.textContent === "" && emailError.textContent === "" && passwordError.textContent === "") {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Account created successfully
        const user = userCredential.user;
        alert("Account created successfully!");
        window.location.href = "./home.html"; // Redirect to home page after successful signup
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(`Error: ${errorMessage} (${errorCode})`);
         // Display the error code/message
         if (errorCode === "auth/email-already-in-use") {
          emailError.textContent = "Email is already in use. Please use a different email.";
        }
        if (errorCode === "auth/invalid-email") {
          emailError.textContent = "Invalid email address. Please enter a valid email.";
        }
      });
  }
});

// Function to validate password
function findValidPassword(password) {
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[@$!%*?&]/.test(password);
  const isLengthValid = password.length >= 8;

  return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLengthValid;
}

// Function to validate email
function findValidEmail(email) {
  const specialCharacter = email.indexOf('@');
  if (specialCharacter === -1) {
    return false;
  }
  let front = email.slice(0, specialCharacter);
  let back = email.slice(specialCharacter + 1);
  if (!front || !back) {
    return false;
  }
  if (back.indexOf('.') === -1) {
    return false;
  }
  const validity = /^[a-zA-Z0-9._-]+$/;
  return validity.test(front) && validity.test(back);
}

// Code for the password eye toggle
let eyeButton = document.querySelector(".right-icon");
eyeButton.addEventListener('click', (event) => {
  event.preventDefault();
  let password = document.getElementById("password");
  if (password.type === "password") {
    password.type = "text";
    eyeButton.classList.remove('fa-eye-slash');
    eyeButton.classList.add('fa-eye');
  } else {
    password.type = "password";
    eyeButton.classList.remove('fa-eye');
    eyeButton.classList.add('fa-eye-slash');
  }
});
