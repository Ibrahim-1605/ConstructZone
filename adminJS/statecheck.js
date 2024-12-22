import { getAuth, onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

const logOutBtn = document.getElementById('logOut');
const logIn = document.getElementById('logIn');

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    logOutBtn.style.display = 'block';
    logIn.style.display = 'none';
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/auth.user
    const uid = user.uid;
    // ...
  } else {
    logOutBtn.style.display = 'none';
    logIn.style.display = 'block';
    // User is signed out
    // ...
  }
});