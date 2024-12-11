themeSelector.addEventListener("change", () => {
    document.body.className = themeSelector.value + "-theme";
});
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

function addToCart(itemId, itemName, itemPrice,itemPic) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    let existingItem = cart.find(item => item.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1; 
    } else {
     
        cart.push({ id: itemId,pic: itemPic, name: itemName, price: itemPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    showAddToCartAlert(itemName);
    updateCartCount();
    displayCart()
}
function showAddToCartAlert(itemName) {
    let alertContainer = document.createElement('div');
    alertContainer.classList.add('cart-alert');
    alertContainer.textContent = `${itemName} has been added to your cart!`;

    
    alertContainer.style.position = 'fixed';
    alertContainer.style.top = '20px';
    alertContainer.style.left = '50%';
    alertContainer.style.transform = 'translateX(-50%)';
    alertContainer.style.padding = '10px 20px';
    alertContainer.style.backgroundColor = 'rgba(0, 123, 255, 0.8)';
    alertContainer.style.color = 'white';
    alertContainer.style.borderRadius = '5px';
    alertContainer.style.fontSize = '16px';
    alertContainer.style.zIndex = '9999';
    alertContainer.style.transition = 'opacity 0.5s ease-in-out';

    document.body.appendChild(alertContainer);

    
    setTimeout(() => {
        alertContainer.style.opacity = '0';
        setTimeout(() => {
            alertContainer.remove(); 
        }, 500); 
    }, 1000);
}