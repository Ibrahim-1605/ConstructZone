// Naming the elements
let productsItem = document.getElementById("products");

//merging the JSON

fetch("../data/products.json")
.then(res => res.json())
.then((data) => {
    for(let product of data){
        let productDiv = document.createElement('div');
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
            <div class="closeContact">
                <div><a href="../pages/login.html">Contact</a></div>
                <div><button class="close-button">Close</button></div>
            </div>
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
