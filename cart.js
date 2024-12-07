
function toggleNav() {
   let nav = document.querySelector('nav');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

let slideIndex = 0;

function showSlide(sliderId) {
   let slides = document.querySelector(`#${sliderId} .slides`);
   let totalSlides = slides.children.length-2;
   let cardsToShow = window.innerWidth <= 600 ? 1 : 3; 

  
    if (slideIndex >= totalSlides) {
        slideIndex = 0; 
    } else if (slideIndex < 0) {
        slideIndex = totalSlides - 1;
    }

  
    slides.style.transform = `translateX(-${(slideIndex * (100 / cardsToShow))}%)`;
}

function nextSlide(sliderId) {
    slideIndex++;
    showSlide(sliderId);
}

function prevSlide(sliderId) {
    slideIndex--;
    showSlide(sliderId);
}

window.onload = function() {
    showSlide('popular-slider');
};
window.onresize = function() {
    showSlide('popular-slider');
};

function addToCart(itemId, itemName, itemPrice, itemPic) {
   let cart = JSON.parse(localStorage.getItem('cart')) || [];

   let existingItem = cart.find(item => item.id === itemId);

    if (existingItem) {
        existingItem.quantity += 1; 
    } else {
     
        cart.push({ id: itemId, Pic:itemPic,  name: itemName, price: itemPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`Added ${itemName} to the cart.`);
    updateCartCount();
    displayCart()
}
document.addEventListener('DOMContentLoaded', () => {
   let cartButtons = document.querySelectorAll('.cart-btn');

    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
           let itemId = button.getAttribute('data-id');
           let itemName = button.getAttribute('data-name');
           let itemPrice = parseFloat(button.getAttribute('data-price'));
           let itemPic = button.getAttribute('data-pic');
            addToCart(itemId, itemName, itemPrice,itemPic);
        });
    });
});
function displayCart() {
   let cartItemsContainer = document.getElementById('cart-items');
   let totalPriceElement = document.getElementById("total-price");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItemsContainer.innerHTML = ""; 

    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity; 
       let row = document.createElement('tr');
        row.setAttribute('data-item-id', item.id);
        row.innerHTML = `
            <td><img src="${item.pic}" alt="${item.name}" class="cart-item-image" width="50"></td>
            <td>${item.name}</td>
            <td>$${item.price}</td>
            <td>
                <input type="number" value="${item.quantity}" min="1" class="quantity-input" data-id="${item.id}">
            </td>
            <td class="total-price">$${(item.price * item.quantity).toFixed(2)}</td>
            <td><button class="remove-item" data-id="${item.id}">Remove</button></td>
        `;
        cartItemsContainer.appendChild(row);
    });

    totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Update cart when quantity changes
document.addEventListener('change', function(event) {
    if (event.target.classList.contains('quantity-input')) {
       let itemId = event.target.getAttribute('data-id');
       let newQuantity = parseInt(event.target.value);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
       let item = cart.find(item => item.id == itemId);

        if (item) {
            item.quantity = newQuantity;
            // Update localStorage with the updated cart
            localStorage.setItem("cart", JSON.stringify(cart));
            displayCart();  // Update the cart display
        }
    }
});

// Remove item from cart
document.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-item')) {
       let itemId = event.target.getAttribute('data-id');
        
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        // Remove the item from the cart
        cart = cart.filter(item => item.id != itemId);
        
        // Update localStorage with the updated cart
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();  // Update the cart display
    }
});

document.addEventListener('DOMContentLoaded', () => {
    displayCart();

   let cartButtons = document.querySelectorAll('.cart-btn');
    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            addToCart(button);
        });
    });
});
// Function to clear the cart with confirmation
function clearCart() {
    // Ask the user for confirmation before clearing the cart
   let userConfirmed = confirm('Are you sure you want to clear the cart?');

    if (userConfirmed) {
        // Remove cart data from localStorage
        localStorage.removeItem('cart');
        // Update the cart display
        displayCart();
        alert('Cart has been cleared!');
    } else {
        // Do nothing if user cancels
        alert('Cart clearing was canceled.');
    }
}


document.getElementById('clear-cart').addEventListener('click', clearCart);

document.addEventListener('DOMContentLoaded', () => {
    displayCart();
    
   let cartButtons = document.querySelectorAll('.cart-btn');
    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
           let itemId = button.getAttribute('data-id');
           let itemName = button.getAttribute('data-name');
           let itemPrice = parseFloat(button.getAttribute('data-price'));
           let itemPic = button.getAttribute('data-pic');
            addToCart(itemId, itemName, itemPrice, itemPic);
        });
    });
});

