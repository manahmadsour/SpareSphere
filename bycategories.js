
    let slideIndex = 0;

    function showSlide(sliderId) {
        const slides = document.querySelector(`#${sliderId} .slides`);
        const totalSlides = slides.children.length;
        const cardsToShow = window.innerWidth <= 600 ? 1 : 3; 
        if (slideIndex >= totalSlides) {
            slideIndex = 0;
        } else if (slideIndex < 0) {
            slideIndex = totalSlides - 2;
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
        showSlide('cpu-slider');
        showSlide('gpu-slider');
        showSlide('motherboard-slider');
        showSlide('ram-slider');
        showSlide('accessories-slider');
    };

    window.onresize = function() {
        showSlide('cpu-slider');
        showSlide('gpu-slider');
        showSlide('motherboard-slider');
        showSlide('ram-slider');
        showSlide('accessories-slider');
    };
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