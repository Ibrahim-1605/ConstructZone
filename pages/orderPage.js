// Function to validate email
function findValidEmail(email) {
    const specialCharacter = email.indexOf('@');
    if (specialCharacter === -1) {
      return false;
    }
    let front = email.slice(0, specialCharacter);
    let back = email.slice(specialCharacter + 4);
    if (!front || !back) {
      return false;
    }
    if (back.indexOf('.') === -1) {
      return false;
    }
    const validity = /^[a-zA-Z0-9._-]+$/;
    return validity.test(front) && validity.test(back);
}

// Give the validation for the form
function validation() {
   let email = document.getElementById("email").value;
   let name = document.getElementById("name").value;
   let product = document.getElementById("product").value;
   let quantity= document.getElementById("quantity").value;
   let number= document.getElementById("number").value;
   let address = document.getElementById("address").value;
   let city = document.getElementById("city").value;
   let message = document.getElementById("message").value;
   let nameError = document.getElementById("nameError");
   let emailError = document.getElementById("emailError");
   let productError = document.getElementById("productError");
   let quantityError = document.getElementById("quantityError");
   let numberError = document.getElementById("numberError");
   let addressError = document.getElementById("addressError");
   let cityError = document.getElementById("cityError");
   let messageError = document.getElementById("messageError");
  
   let isValid = true;
  

   // Validate the name
   if (name.trim() === "") {
       nameError.textContent = "Please enter your name.";
       isValid = false;
   }
   // Check if name contains numbers or special characters
   else if (/[^A-Za-z\s]/.test(name)) {
       nameError.textContent = "Please enter a valid name without numbers or special characters.";
       isValid = false;
   }
   // Check if name has leading/trailing spaces
   else if (/^\s|\s$/.test(name)) {
       nameError.textContent = "Name cannot start or end with spaces.";
       isValid = false;
   }
   // Name should be between 3 and 20 characters
   else if (name.length < 3 || name.length > 20) {
       nameError.textContent = "Name must be between 3 and 20 characters.";
       isValid = false;
   } else {
       nameError.textContent = "";  
   }
  
   // Validate email
   if (!findValidEmail(email)) {
       emailError.textContent = "Please enter a valid email address.";
       isValid = false;
   } else {
       emailError.textContent = "";  
   }

   //Validate product name
   if(product.trim() === ""){
       productError.textContent = "Please enter the product name.";
       isValid = false;
   }// Check if product has leading/trailing spaces
   else if (/^\s|\s$/.test(product)) {
       productError.textContent = "Product name cannot start or end with spaces.";
       isValid = false;
   }// Name should be between 3 and 100 characters
   else if (product.length < 3 || product.length > 100) {
       productError.textContent = "Product name must be between 3 and 100 characters.";
       isValid = false;
   }//Entering the valid product name without numbers only.
   else if (/^\d+$/.test(product)) {
       productError.textContent = "Please enter the valid product name.";
       isValid = false;
   }//Entering a valid product name without special character only.
   else if (/^[^a-zA-Z0-9]*$/.test(product)) {
       productError.textContent = "Please enter the product name.";
       isValid = false;
   }
   else{
       productError.textContent = "";
   }

   //Validate quantity
   if(quantity.trim() === ""){
       quantityError.textContent = "Please enter the quantity of the product.";
       isValid = false;
   }//Enter the prduct quantity contain without numbers only.
   else if (/^[^a-zA-Z0-9]*$/.test(quantity)) {
        quantityError.textContent = "Please enter the valid product quantity.";
        isValid = false;
   }
    else{
       quantityError.textContent = "";
   }

   let firstNum = number[0];
   //Validate Phone number
   if(number.trim() === ""){
       numberError.textContent = "Please enter your number.";
       isValid = false;
   }else if(/[^0-9]/.test(number)){
       numberError.textContent = "Please enter your valid mobile number.";
       isValid = false;
   }else if(number.length<10||number.length>10){
       numberError.textContent = "Please enter the valid mobile number.";
   }else if(firstNum==="0"||firstNum==="1"||firstNum==="2"||firstNum==="3"||firstNum==="4"||firstNum==="5"){
       numberError.textContent = "Number should not start with zero to five."
   }else{
       numberError.textContent = "";
   }

   //Validate address
   if(address.trim() === ""){
       addressError.textContent = "Please enter your address.";
       isValid = false;
   }//Enter a valid address without nubers and special character.
   else if (/^[^a-zA-Z0-9]*$/.test(address)) {
       addressError.textContent = "Please enter a valid address.";
       isValid = false;
   }else{
       addressError.textContent = "";
   }

   //Validate city
   if(city.trim()===""){
       cityError.textContent = "Please enter the city name";
       isValid = false;
   }//Enter a valid city name without nubers and special character.
   else if (/[^a-zA-Z]/.test(city)) {
        cityError.textContent = "Please enter a valid city name without numbers or special characters.";
        isValid = false;
   }//Name cannot start ot end with spaces
   else if (/^\s|\s$/.test(name)) {
        cityError.textContent = "Name cannot start or end with spaces.";
        isValid = false;
   }
    else{
       cityError.textContent = "";
   }

   // Validate message
   if (message.trim() === "") {
       messageError.textContent = "Please enter your description/expectation about the product.";
       isValid = false;
   } else {
       messageError.textContent = "";  
   }

   if(nameError.textContent === "" && emailError.textContent === "" && productError.textContent === "" && quantityError.textContent === "" && numberError.textContent === "" && addressError.textContent === "" && cityError.textContent === "" && messageError.textContent === ""){
    return isValid;
   } 
}

// //function for sending the email
// function sendEmail(){
// 	let email = document.getElementById("email").value;
//     let name = document.getElementById("name").value;
//     let product = document.getElementById("product").value;
//     let quantity= document.getElementById("quantity").value;
//     let number= document.getElementById("number").value;
//     let address = document.getElementById("address").value;
//     let city = document.getElementById("city").value;
//     let message = document.getElementById("message").value;
// 	var templateParams = {
//         email: email,
//         to_name: name,
// 		message: message,
//         product: product,
//         quantity: quantity,
//         number: number,
//         address: address,
//         city: city
//       };
//       emailjs.send('service_2opabqr', 'template_obi2kve', templateParams)
//   .then(function(response) {
//      console.log('SUCCESS!', response.status, response.text);
//   })     
// }


function showOrderSuccess(event) {
    event.preventDefault()
    // Create the order success overlay
    let orderSuccess = document.createElement("div");
    orderSuccess.classList.add("orderSuccessOverlay");
    orderSuccess.innerHTML = `
      <div class="orderSuccessDiv">
        <span class="exit-btn">&times;</span>
        <img src="../assests/images/constructZone_logo.png" alt="construct zone logo"/>
        <h2>Construct<span>Zone</span> will contact you within 16 to 24 hours.</h2>
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
        // sendEmail()
        showOrderSuccess(event)
    }
  });