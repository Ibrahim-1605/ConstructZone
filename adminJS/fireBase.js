// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
import { getFirestore, addDoc,collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js";

// Firebase configuration (replace with your own config)

// Initialize Firebase
// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAxwTaDl4OakGDqYk8faRbHW1czCAtl7ME",
    authDomain: "e-commerce-cd8a5.firebaseapp.com",
    projectId: "e-commerce-cd8a5",
    storageBucket: "e-commerce-cd8a5.firebasestorage.app",
    messagingSenderId: "507959584187",
    appId: "1:507959584187:web:ba1d6e514d2f9a5238509e"
  };
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Move db initialization outside of try block

// async function fetchAndDisplayFeaturedProducts() {
//     const featuredProductsCollection = collection(db, "constructProducts");
//     const querySnapshot = await getDocs(query(featuredProductsCollection, where("categories", "array-contains", "featuredProduct")));
    
//     const container = document.querySelector('.product-container');
//     const heading = document.createElement('h1');
//     heading.textContent = "Featured Products"
//     container.appendChild(heading);
//     const featuredProducts = [];
//     querySnapshot.forEach((doc) => {
//       featuredProducts.push(doc.data());
//     });
  
//     // Assuming you have an HTML element with the ID "hero-section"
//     const featuredContainer = document.querySelector(".scroll-container");
  
//     // Clear the hero section before adding new products
  
//     featuredProducts.forEach((product) => {
//       const productCard = document.createElement("div");
//       productCard.classList.add("product-card");
      
//       // Add product details to the card (customize as needed)
//       productCard.innerHTML = `
//       <div class="image-div">
//         <img src="${product.image}" alt="${product.product_name}">
//       </div>
//       <div class="details-div">
//         <h2>${product.product_name}</h2>
//         <p>₹${product.price}</p>
//         <p>${product.description}</p>
//       </div>
//       `; 
//       featuredContainer.appendChild(productCard);
//     });
//   }
  
//   // Call the function to fetch and display featured products
//   fetchAndDisplayFeaturedProducts();

  async function uploadProductsFromJson() {
    const collectionName = "constructProducts";
    const jsonUrl = "../data/products.json";
    const collectionRef = collection(db, collectionName);

    try {
      // Check if the collection is empty
      const snapshot = await getDocs(collectionRef);
      if (snapshot.empty) {
        console.log(`Collection '${collectionName}' is empty or does not exist. Creating collection...`);
        const response = await fetch(jsonUrl);
        if (!response.ok) {
          throw new Error(`Failed to fetch product.json: ${response.statusText}`);
        }
    
        const productsData = await response.json();
    
        // Loop through each product and add to Firestore, checking for duplicates
        for (const product of productsData) {
            await addDoc(collectionRef, product)
              .then((docRef) => {
                console.log(`Product added with ID: ${docRef.id}`);
              })
              .catch((error) => {
                console.error(`Error adding product: ${error.message}`);
              });
        }
      } else {
        console.log(`Collection '${collectionName}' already exists. Adding data...`);
      }
  
      // Fetch JSON data from the hosted product.json URL
  
      console.log("Products uploaded to Firestore successfully.");
    } catch (error) {
      console.error("Error uploading products:", error);
    }
  }
// Run the function
uploadProductsFromJson();