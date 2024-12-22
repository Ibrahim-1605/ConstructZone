//get product ID from URL
const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
console.log(productId);
//fetching the element from the JSON
fetch("../data/productsDashboard.json")
.then(res=>res.json())
.then((data)=>{
    for(let product of data){
        if(product.id == productId){
          let filteredProducts = document.getElementById("product");
          filteredProducts.innerHTML=`
          <div class="product-description">
          <div><img src="${product.image}" alt="${product.name}"/></div>
          <div>
          <h1>${product.name}</h1>
          <p><span class="text">Product Name:</span> ${product.name}</p>
          <p><span class="text">Price:</span> ₹${product.price}<span class="quantity_limit">${product.unit}</span></p>
          <p><span class="text">Rating:</span> ${product.rating}</p>
          <p><span class="text">Minimum Order Quantity:</span> ${product.quantity}</p>
          <p><span class="text">Brand:</span> ${product.brand}</p>
          <p><span class="text">Material Used:</span> ${product.material}</p>
          <p><span class="text">Country of Orgin:</span> ${product.country_of_orgin}</p>
          <p><span class="text">Description:</span> ${product.description}</p>
          <div class="buttonBack">
          <div><a href="../pages/home.html"><button class="backButton">Back</button></a></div>
          <div><button class="orderButton">Order</button></div>
          </div>
          </div>
          </div>` 
          let orderButton = filteredProducts.querySelector('.orderButton');
            orderButton.addEventListener('click', function() {
                window.location.href="../pages/orderPage.html";
            });
        }
    }
});
