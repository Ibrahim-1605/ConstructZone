 // Import the functions you need from the SDKs you need
 import { initializeApp} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
 import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
 import { getUserDetailsByEmail } from "../adminJS/users.js";
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
// const app = initializeApp(firebaseConfig);

let logIn = document.getElementById("submit");

logIn.addEventListener("click", function(event){
let password = document.getElementById("password").value;
let email = document.getElementById("email").value;
let mistakeError= document.getElementById("mistakeError");
const auth=getAuth();
signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    getUserDetailsByEmail(user.email)
      .then((userDetails) => {
        if (userDetails) {
          console.log(`First name : ${userDetails.firstName}\n lastname : ${userDetails.lastName}\nemail : ${userDetails.email}`)
          window.location.href="./home.html";
        }
      })
      .catch((error) => console.log('Error fetching user details:', error));
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // alert(errorCode,errorMessage);
    if(email=="" && password==""){
      mistakeError.textContent="";
    }else{
      mistakeError.textContent = "Please enter a valid email address and Password.";
    }
  });
});


//getting element:inputs
let logInBtn= document.getElementById("submit");
let emailError = document.getElementById("emailError");
let passwordError = document.getElementById("passwordError");

logInBtn.addEventListener("click", function(event){
  event.preventDefault();

  let email=document.getElementById("email").value;
  let password=document.getElementById("password").value;
  let mistakeError= document.getElementById("mistakeError").value;

  emailError.textContent = "";
  passwordError.textContent = "";

  //code for email validation
  if(findValidEmail(email)==false){
    emailError.textContent = "Please enter a valid email address.";
  }
  if(findValidEmail(email)==true){
    emailError.textContent = "";
  }

  //code for Password validation
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

  
});

//writing the function for the email validation
function findValidEmail(email){
  const specialCharecter = email.indexOf('@');
  if(specialCharecter===-1){
      return false
  }
  let front = email.slice(0,specialCharecter);
  let back = email.slice(specialCharecter+4);
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
});