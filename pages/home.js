// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getAuth, signOut ,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import { getUserDetailsByEmail } from "../adminJS/users.js";
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

//Naming the element
let productsItem = document.getElementById("products");

//Merging the JSON
fetch("../data/productsDashboard.json")
.then(res=>res.json())
.then((data)=>{
    for(let product of data){
        let productDiv = document.createElement("div");
        productDiv.classList.add("product-item");
        
        productDiv.addEventListener("click", function(e){
          e.preventDefault();
          window.location.href=`./productItem.html?id=${product.id}`;
      });
        productDiv.innerHTML=`<img src="${product.image}"/>
        <h3>${product.name}</h3>
    <h1>₹${product.price}<span class="quantity_limit">${product.unit}</span></h1>
    <p class="rating">Rating: <span class="ratingNumber">${product.rating}</span></p>`;
        productsItem.appendChild(productDiv);
    }
});

//this is code for the log out function
const logOutBtn = document.getElementById('logOut');
logOutBtn.addEventListener('click',function(e){
    e.preventDefault();
    if(confirm('Are you sure you are leaving the ConstructZone?')){
        signOut(auth).then(() => {
            alert('Thank you for visiting ConstructZone.')
            window.location.href="../index.html"
          }).catch((error) => {
            alert('Error while logout')
          });
    }
}); 

//this is code for the user name getting in the home page
onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in
    // Fetch user details after login using email as the document ID
    getUserDetailsByEmail(user.email)
      .then((userDetails) => {
        if (userDetails) {
          // Display user details on the profile page
          userDetails.firstName = userDetails.firstName[0].toUpperCase()+userDetails.firstName.substring(1)
          document.getElementById('userName').textContent = `${userDetails.firstName} ${userDetails.lastName}`;
        }
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }
});


//This is the code for the ssearch bar function
document.getElementById('search').addEventListener('keyup', function() {
  const query = this.value.toLowerCase();
  fetch("../data/productsDashboard.json")
    .then(res => res.json())
    .then((data) => {
      const filteredProducts = data.filter(product => {
        return product.name.toLowerCase().includes(query) || product.brand.toLowerCase().includes(query);
      });
      displayProducts(filteredProducts);
    });
});

// Function to display products
function displayProducts(products) {
  let productsItem = document.getElementById("products");
  productsItem.innerHTML = '';
  if (products.length === 0) {
    productsItem.innerHTML = '<p>No products found.</p>';
  } else {
    for (let product of products) {
      let productDiv = document.createElement("div");
      productDiv.classList.add("product-item");

      productDiv.addEventListener("click", function(e) {
        e.preventDefault();
        window.location.href = `./productItem.html?id=${product.id}`;
      });
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}"/>
        <h3>${product.name}</h3>
        <h1>₹${product.price}<span class="quantity_limit">${product.unit}</span></h1>
        <p class="rating">Rating: <span class="ratingNumber">${product.rating}</span></p>
      `;
      productsItem.appendChild(productDiv);
    }
  }
}
