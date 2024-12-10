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
        // redirecting to the product-details in page when click the json objects
        productDiv.addEventListener("click", function(){
          let productDetailsDiv=document.createElement("div");
          productDetailsDiv.classList.add("products-details");
          
          productDetailsDiv.innerHTML=`
          <div class="product-description">
          <div><img src="${product.image}" alt="${product.name}"/></div>
          <div>
          <h1>${product.name}</h1>
          <p><span class="text">Product Name:</span> ${product.name}</p>
          <p><span class="text">Price:</span> ₹${product.price}<span class="quantity_limit">${product.unit}</span></p>
          <p><span class="text">Rating:</span> ${product.rating}</p>
          <p><span class="text">Quantity:</span> ${product.quantity}</p>
          <p><span class="text">Brand:</span> ${product.brand}</p>
          <p><span class="text">Material Used:</span> ${product.material}</p>
          <p><span class="text">Country of Orgin:</span> ${product.country_of_orgin}</p>
          <p><span class="text">Description:</span> ${product.description}</p>
          <p><span class="text1">Contact :-</span></p>
          <p><span class="text">Address:</span> ${product.address}</p>
          <p><span class="text">Phone:</span> ${product.contact}</p>
          <button class="close-button">Close</button>
          </div>
          </div>`

          document.body.appendChild(productDetailsDiv);
          
          let closeButton = productDetailsDiv.querySelector('.close-button');
          closeButton.addEventListener('click', function() {
              productDetailsDiv.remove();
          });
      });
        productDiv.innerHTML=`<img src="${product.image}"/>
        <h3>${product.name}</h3>
    <h1>₹${product.price}<span class="quantity_limit">${product.unit}</span></h1>
    <p class="rating">Rating: <span class="ratingNumber">${product.rating}</span></p>`;
        productsItem.appendChild(productDiv);
    }
});
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

//write the code for the search function
function searchFunction(){
  const query = document.getElementById("search").value.toLowerCase();
  const searchedProducts = document.getElementById("products");
  // Clear previous results
  searchedProducts.innerHTML = '';
  searchedProducts.style.display = 'none'; // Hide container by default
  // If the input field is empty, exit the function
  if (query.trim() === "") {
      return;
  }
  // Filter the movies based on the search query
  const filterProducts = product.filter(products =>
      products.name.toLowerCase().includes(query) || products.brand.toLowerCase().includes(query)
  );
  if (filterProducts.length > 0) {
      // Display filtered productss
      searchedProducts.style.display = 'block'; // Show container
      filterProducts.forEach(products => {
          searchedProducts.innerHTML += `
              <a  href="products_details.html?id=${product.id}">
                <div class="products_name">${product.name}</div>
              </a>`;
      });
  } else {
      // Show "no results" message
      searchedProducts.style.display = 'block'; // Show container for "no results" message
      searchedProducts.style.color = 'white='
      searchedProducts.innerHTML = `<p > No movies found for "${query}".</p>`;
  }
}
 
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