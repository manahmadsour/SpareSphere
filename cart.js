let cartCount = 0;
function updateCartCount() {
    let cartCountElement = document.getElementById("cart-count");
    cartCountElement.textContent = cartCount;
}

document.querySelectorAll(".cart-btn").forEach(button => {
    button.addEventListener("click", function(event) {
        event.preventDefault();  
        cartCount++;             
        updateCartCount();     
    });
});


document.querySelectorAll(".heart-btn").forEach(heart => {
    heart.addEventListener("click", function(event) {
        event.preventDefault();
        heart.classList.toggle("filled");
    });
});
updateCartCount();
