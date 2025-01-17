// Initialize Firestore and Firebase Auth
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getUserDetailsByEmail } from "../adminJS/users.js";
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

// Initialize Firestore and Auth
const auth = getAuth();

onAuthStateChanged(auth, (user) => {
  if (user) {
    // If the user is logged in, fetch their details from Firestore
    getUserDetailsByEmail(user.email)
      .then((userDetails) => {
        if (userDetails) {
          const name = document.getElementById("name");
          const email = document.getElementById("email");
          name.value = userDetails.firstName + userDetails.lastName;
          email.value = userDetails.email
          // name.setAttribute('readonly','readonly')
          // email.setAttribute('readonly','readonly')
        }
      })
      .catch((error) => console.log('Error fetching user details:', error));
  } else {
    console.log('No user is signed in.');
  }
});


function validation() {
  let email = document.getElementById("email").value;
  let name = document.getElementById("name").value;
  let message = document.getElementById("message").value;
  let nameError = document.getElementById("nameError");
  let emailError = document.getElementById("emailError");
  let messageError = document.getElementById("messageError");

  let isValid = true;

  // // Validate name
  // if (name.trim() === "") {
  //     nameError.textContent = "Please enter your name.";
  //     isValid = false;
  // }
  // // Check if name contains numbers or special characters
  // else if (/[^A-Za-z\s]/.test(name)) {
  //     nameError.textContent = "Please enter a valid name without numbers or special characters.";
  //     isValid = false;
  // }
  // // Check if name has leading/trailing spaces
  // else if (/^\s|\s$/.test(name)) {
  //     nameError.textContent = "Name cannot start or end with spaces.";
  //     isValid = false;
  // }
  // // Name should be between 3 and 20 characters
  // else if (name.length < 3 || name.length > 20) {
  //     nameError.textContent = "Name must be between 3 and 20 characters.";
  //     isValid = false;
  // } else {
  //     nameError.textContent = "";  
  // }

  // // Validate email
  // if (!findValidEmail(email)) {
  //     emailError.textContent = "Please enter a valid email address.";
  //     isValid = false;
  // } else {
  //     emailError.textContent = "";  
  // }

  // Validate message
  if (message.trim() === "") {
      messageError.textContent = "Please enter your feedback.";
      isValid = false;
  } else {
      messageError.textContent = "";  
  }

  return isValid;  
}

// // Function to validate email
// function findValidEmail(email) {
//   const specialCharacter = email.indexOf('@');
//   if (specialCharacter === -1) {
//     return false;
//   }
//   let front = email.slice(0, specialCharacter);
//   let back = email.slice(specialCharacter + 4);
//   if (!front || !back) {
//     return false;
//   }
//   if (back.indexOf('.') === -1) {
//     return false;
//   }
//   const validity = /^[a-zA-Z0-9._-]+$/;
//   return validity.test(front) && validity.test(back);
// }

function sendEmail() {
  var email = document.getElementById("email").value;
  var name = document.getElementById("name").value;
  var message = document.getElementById("message").value;
  
  var templateParams = {
      email: email,
      to_name: name,
      message: message
  };

  emailjs.send('service_sy7h9gd', 'template_yzfgfgk', templateParams)
      .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
      })
      .catch(function(error) {
          console.log('FAILED...', error);
          window.alert("An error occurred while sending the email.");
      });
}

function showOrderSuccess(event) {
   event.preventDefault()
   // Create the order success overlay
   let orderSuccess = document.createElement("div");
   orderSuccess.classList.add("feedbackSuccessOverlay");
   orderSuccess.innerHTML = `
     <div class="feedbackSuccessDiv">
       <span class="exit-btn">&times;</span>
       <img src="../assests/images/constructZone_logo.png" alt="construct zone logo"/>
       <h2>Your feedback will be taken by Construct<span>Zone</span> and used for future upgrades.</h2>
     </div>`;

   // Append the orderSuccess div to the body (or wherever you'd like to show it)
   document.body.appendChild(orderSuccess);

   // Close the overlay when the exit button is clicked
   const exitBtn = orderSuccess.querySelector(".exit-btn");
   exitBtn.addEventListener("click", function() {
     window.location.href="../pages/home.html"
   });
}

// Adding event listener to the button to trigger the function
document.getElementById("button").addEventListener("click", function(event){
  if(validation()){
      sendEmail()
      showOrderSuccess(event)
  }
});