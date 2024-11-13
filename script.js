function toggleNav() {
    const nav = document.querySelector('nav');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}

let slideIndex = 0;

function showSlide(sliderId) {
    const slides = document.querySelector(`#${sliderId} .slides`);
    const totalSlides = slides.children.length;
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