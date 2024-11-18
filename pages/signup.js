// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxwTaDl4OakGDqYk8faRbHW1czCAtl7ME",
  authDomain: "e-commerce-cd8a5.firebaseapp.com",
  projectId: "e-commerce-cd8a5",
  storageBucket: "e-commerce-cd8a5.appspot.com",
  messagingSenderId: "507959584187",
  appId: "1:507959584187:web:ba1d6e514d2f9a5238509e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//getting Elements: inputs
let firstName = document.getElementById("first_name").value;
let lastName = document.getElementById("last_name").value;
let signUpform = document.getElementById("signup-form");
signUpform.addEventListener("submit" , function(e){
  e.preventDefault();
  let email=document.getElementById("email").value;
  let password=document.getElementById("password").value;
  let firstName = document.getElementById("first_name").value;

const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    if(findValidPassword(password)==true){
      alert("Account created");
      window.location.href = "./home.html";
    }
    // ...
    console.log("account created successfully")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    alert(errorCode)
  });
});

//getting element:inputs
let logInBtn= document.getElementById("submit");
let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");
let firstNameError = document.getElementById("firstNameError");

logInBtn.addEventListener("click", function(event){
  event.preventDefault();

  let email=document.getElementById("email").value;
  let password=document.getElementById("password").value;
  let firstName = document.getElementById("first_name").value;

  emailError.textContent = "";
  passwordError.textContent = "";
  firstNameError.textContent ="";

  //code for the first name
  if (firstName.trim() === "") {
    firstNameError.textContent = "Please enter your name.";
  } else if (firstName.length < 3 || firstName.length > 20) {
    firstNameError.textContent = "Name must be between 3 and 20 characters.";
  }
  
  //code for email validation
  if(findValidEmail(email)==false){
    emailError.textContent = "Please enter a valid email address.";
  }
  if(findValidEmail(email)==true){
    emailError.textContent = "";
  }
  //code for password validation
  if(findValidPassword(password)==false){
    passwordError.textContent = `Password is invalid. It must be at least 8 characters long, contain
     an uppercase letter, a lowercase letter, a number,
     and a special character.`
  }
  if(findValidPassword(password)==true){
    passwordError.textContent = "";
  }
});


//writing the function for the password validation
function findValidPassword(password){
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[@$!%*?&]/.test(password);
  const isLengthValid = password.length >= 8;

  return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isLengthValid;

}

//writing the function for the email validation
function findValidEmail(email){
  const specialCharecter = email.indexOf('@');
  if(specialCharecter===-1){
      return false
  }
  let front = email.slice(0,specialCharecter);
  let back = email.slice(specialCharecter+1);
  if(!front || !back){
      return false
  }
  if(back.indexOf('.')===-1){
      return false
  }
  const validity = /^[a-zA-Z0-9._-]+$/;
  if(validity.test(front) && validity.test(back)){
      return true
  }
  return false
}


//writing code for the password in eye and eye slash

let eyeButton = document.querySelector(".right-icon");
eyeButton.addEventListener('click', (eye)=>{
  eye.preventDefault();
  let password = document.getElementById("password");
  if(password.type ==="password"){
    password.type="text";
    eyeButton.classList.remove('fa-eye-slash');
    eyeButton.classList.add('fa-eye');
  }
  else{
    password.type = "password";
    eyeButton.classList.remove('fa-eye');
    eyeButton.classList.add('fa-eye-slash');
  }
})