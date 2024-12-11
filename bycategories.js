let slideIndices = {};

function initializeSlideIndex(sliderId) {
    slideIndices[sliderId] = 0;
}

function showSlide(sliderId) {
    let slider = document.querySelector(`#${sliderId}`);
    let slides = slider.querySelector('.slides');
    let totalSlides = slides.children.length;
    let cardsToShow = window.innerWidth <= 600 ? 1 : 3;


    let slideIndex = slideIndices[sliderId];

    if (slideIndex > totalSlides - cardsToShow) {
        slideIndices[sliderId] = 0;
    } else if (slideIndex < 0) {
        slideIndices[sliderId] = totalSlides - cardsToShow;
    }

    slideIndex = slideIndices[sliderId];

    slides.style.transform = `translateX(-${slideIndex * (100 / cardsToShow)}%)`;
}

function nextSlide(sliderId) {
    slideIndices[sliderId]++;
    showSlide(sliderId);
}

function prevSlide(sliderId) {
    slideIndices[sliderId]--;
    showSlide(sliderId);
}

window.onload = function () {
    let sliderIds = ['cpu-slider', 'gpu-slider', 'motherboard-slider', 'ram-slider', 'accessories-slider'];

    sliderIds.forEach(sliderId => {
        initializeSlideIndex(sliderId);
        showSlide(sliderId);
    });
};

window.onresize = function () {
    let sliderIds = ['cpu-slider', 'gpu-slider', 'motherboard-slider', 'ram-slider', 'accessories-slider'];

    sliderIds.forEach(sliderId => showSlide(sliderId));
};
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
    
        // Fade out the alert after 1 second
        setTimeout(() => {
            alertContainer.style.opacity = '0';
            setTimeout(() => {
                alertContainer.remove(); // Remove the alert from the DOM after it fades out
            }, 500); // After fade-out completes
        }, 1000); // Alert stays for 1 second
    }
    themeSelector.addEventListener("change", () => {
        document.body.className = themeSelector.value + "-theme";
    });