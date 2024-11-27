
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
