//Naming the element
let productsItem = document.getElementById("products");

//Merging the JSON

fetch("../data/productsDashboard.json")
.then(res=>res.json())
.then((data)=>{
    for(let product of data){
        let productDiv = document.createElement("div");
        productDiv.classList.add("product-item");
        productDiv.innerHTML=`<img src="${product.image}"/>
        <h3>${product.product_name}</h3>
        <p>Description: ${product.product_description}</p>
        <p class="rating">Rating: <span class="ratingNumber">${product.rating}</span></p>
        <h2 class="price">₹${product.price}</h2>`;
        productsItem.appendChild(productDiv);
    }
});