// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { saveUserDetails } from "../adminJS/users.js";
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
}
// Validation for numbers or special characters (excluding spaces and letters)
else if (/[^A-Za-z\s]/.test(firstName)) {
  firstNameError.textContent = "Please enter a valid first name without numbers or special characters.";
}
// Check if first name starts or ends with spaces
else if (/\s/.test(firstName)) {
  firstNameError.textContent = "The first 3 characters of your first name cannot contain spaces.";
}
// First name should be between 3 and 20 characters
else if (firstName.length < 3 || firstName.length > 20) {
  firstNameError.textContent = "First name must be between 3 and 20 characters.";
}
else {
  // No error, proceed with valid first name
  firstNameError.textContent = "";  // Clear any previous error
}

// // Validate last name
// if (lastName.trim() === "") {
//   lastNameError.textContent = "Please enter your last name.";
// }
// //last name should be minimum 3 chracter and maximum 20 character
// else if (lastName.length < 3 || lastName.length > 20) {
//   lastNameError.textContent = "Last name must be between 3 and 20 characters.";
// } 
// //validation for the number do not come in the last name
// else if (/\d/.test(lastName) || /[^a-zA-Z0-9\s]/.test(lastName)) {
//   lastNameError.textContent = "Please enter a valid last name.";
// }
// //validation for the spaces comes between the names
// else if (/\s/.test(lastName.substring(0, 3))) {
//   lastNameError.textContent = "The first 3 characters of your last name cannot contain spaces.";
// }
// //validation for the last name for the special character
// else if (/[^A-Za-z\s]/.test(lastName)) {
//   lastNameError.textContent = "Please enter a valid name without using special characters.";
// }
// Validate last name
if (lastName.trim() === "") {
  lastNameError.textContent = "Please enter your last name.";
}
// Validation for numbers or special characters (excluding spaces and letters)
else if (/[^A-Za-z\s]/.test(lastName)) {
  lastNameError.textContent = "Please enter a valid last name without numbers or special characters.";
}
// Check if last name starts or ends with spaces
else if (/\s/.test(lastName)) {
  lastNameError.textContent = "The first 3 characters of your last name cannot contain spaces.";
}
// Last name should be between 3 and 20 characters
else if (lastName.length < 3 || lastName.length > 20) {
  lastNameError.textContent = "Last name must be between 3 and 20 characters.";
}
else {
  lastNameError.textContent = "";
}

  // Validate email
  if (!findValidEmail(email)) {
    emailError.textContent = "Please enter a valid email address.";
  }

  // Validate password
  if(password.trim() === ""){
    passwordError.textContent = "Please enter the password."
  }else if(/[A-Z]/.test(password)==false){
    passwordError.textContent="Password must contain an uppercase letter."
  }else if(/[a-z]/.test(password)==false){
    passwordError.textContent="Password must contain an lowercase letter."
  }else if(/[0-9]/.test(password)==false){
    passwordError.textContent="Password must contain a number."
  }else if(/[@$!%*?&]/.test(password)==false){
    passwordError.textContent="Password must contain a special character."
  }else if(password.length < 8){
    passwordError.textContent="Password must be at least 8 characters long."
  }

  // If all validations pass, create the user
  if (firstNameError.textContent === "" && emailError.textContent === "" && passwordError.textContent === "") {
    lastNameError.textContent = "";
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Save user details after successful registration
        saveUserDetails(firstName, lastName, user.email)
          .then(() => {
            alert('Registered successfully! Logging in...');
            window.location.href = '/';  // Redirect to homepage or another page
          })
          .catch((error) => {
            console.error('Error saving user details: ', error);
          });
        // Account created successfully
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

// Function to validate email
function findValidEmail(email) {
  const specialCharacter = email.indexOf('@');
  if (specialCharacter === -1) {
    return false;
  }
  let front = email.slice(0, specialCharacter);
  let back = email.slice(specialCharacter + 4);
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
