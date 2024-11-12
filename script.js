function toggleNav() {
    const nav = document.querySelector('nav');
    nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
}
let popularIndex = 0;
let offersIndex = 0;

function scrollCarousel(section, direction) {
    const grid = document.querySelector(`.${section}-grid`);
    const items = grid.children;
    const maxIndex = items.length - 1;

    if (section === 'popular') {
        popularIndex = Math.max(0, Math.min(popularIndex + direction, maxIndex));
        grid.style.transform = `translateX(-${popularIndex * 100}%)`;
    } else if (section === 'offers') {
        offersIndex = Math.max(0, Math.min(offersIndex + direction, maxIndex));
        grid.style.transform = `translateX(-${offersIndex * 100}%)`;
    }
}

