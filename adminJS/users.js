// Initialize Firestore and Firebase Auth
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";

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
const db = getFirestore(app);
const auth = getAuth();

// Function to save user details to Firestore (called after sign-up)
async function saveUserDetails(firstName, lastName, email) {
  try {
    const userDocRef = doc(db, 'users', email); // Use email as document ID
    
    // Set the user details (will overwrite if the document already exists)
    await setDoc(userDocRef, {
      firstName: firstName,
      lastName: lastName,
      email: email,
    });

    console.log('User details saved successfully!');
  } catch (error) {
    console.error('Error saving user details: ', error);
  }
}

// Function to retrieve user details from Firestore by email (using email as document ID)
async function getUserDetailsByEmail(email) {
  try {
    const userDocRef = doc(db, 'users', email); // Use email as document ID
    const userDoc = await getDoc(userDocRef);

    if (userDoc.exists()) {
      // Return user data along with the document ID
      return { ...userDoc.data(), id: userDoc.id };
    } else {
      console.log('No user found with the provided email.');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user details: ', error);
  }
}

// Listen for authentication state change to fetch user data after login
onAuthStateChanged(auth, (user) => {
  if (user) {
    // If the user is logged in, fetch their details from Firestore
    getUserDetailsByEmail(user.email)
      .then((userDetails) => {
        if (userDetails) {
          console.log('User details fetched: ', userDetails);
        }
      })
      .catch((error) => console.log('Error fetching user details:', error));
  } else {
    console.log('No user is signed in.');
  }
});

export { saveUserDetails, getUserDetailsByEmail };
