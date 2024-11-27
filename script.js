
function toggleNav() {
    const nav = document.querySelector('nav');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

let slideIndex = 0;

function showSlide(sliderId) {
    const slides = document.querySelector(`#${sliderId} .slides`);
    const totalSlides = slides.children.length-2;
    const cardsToShow = window.innerWidth <= 600 ? 1 : 3; 

  
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

function addToCart(itemId, itemName, itemPrice,itemPic) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingItem = cart.find(item => item.id === itemId);

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
    const alertContainer = document.createElement('div');
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

    // Fade out the alert after 1 second
    setTimeout(() => {
        alertContainer.style.opacity = '0';
        setTimeout(() => {
            alertContainer.remove(); // Remove the alert from the DOM after it fades out
        }, 500); // After fade-out completes
    }, 1000); // Alert stays for 1 second
}

function displayCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById("total-price");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cartItemsContainer.innerHTML = "";

    let totalPrice = 0;

    cart.forEach(item => {
        totalPrice += item.price * item.quantity; 
        const row = document.createElement('tr');
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

document.addEventListener('change', function(event) {
    if (event.target.classList.contains('quantity-input')) {
        const itemId = event.target.getAttribute('data-id');
        const newQuantity = parseInt(event.target.value);

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        const item = cart.find(item => item.id == itemId);

        if (item) {
            item.quantity = newQuantity;

            localStorage.setItem("cart", JSON.stringify(cart));
            displayCart();
        }
    }
});

document.addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-item')) {
        const itemId = event.target.getAttribute('data-id');
        
        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart = cart.filter(item => item.id != itemId);
        
        localStorage.setItem("cart", JSON.stringify(cart));
        displayCart();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const cartButtons = document.querySelectorAll('.cart-btn');

    cartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemId = button.getAttribute('data-id');
            const itemName = button.getAttribute('data-name');
            const itemPrice = parseFloat(button.getAttribute('data-price'));
            const itemPic = button.getAttribute('data-pic');
            addToCart(itemId, itemName, itemPrice,itemPic);
        });
    });
});
