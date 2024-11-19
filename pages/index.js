// Naming the elements
let productsItem = document.getElementById("products");

//merging the JSON

fetch("../data/products.json")
.then(res => res.json())
.then((data) => {
    for(let product of data){
        let productDiv = document.createElement('div');
        productDiv.classList.add("product-item");
        // redirecting to the log in page when click the json objects
        productDiv.addEventListener("click", function(){
        window.location.href="../pages/login.html";
        });
    productDiv.innerHTML=`<img src="${product.product_image}"/>
    <h3>${product.product_name}</h3>
    <p>Description: ${product.product_description}</p>
    <p class="rating">Rating: <span class="ratingNumber">${product.rating}</span></p>`;
    productsItem.appendChild(productDiv);
    }
});
