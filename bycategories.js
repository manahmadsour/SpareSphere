document.addEventListener('DOMContentLoaded', function () {
    const categoryLinks = document.querySelectorAll('.dropdown-content a');

    categoryLinks.forEach(function(link) {
        link.addEventListener('click', function(event) {
            const categoryId = event.target.getAttribute('href').split('#')[1];
            scrollToCategory(categoryId);
        });
    });

    function scrollToCategory(categoryId) {
        const categoryElement = document.getElementById(categoryId);
        if (categoryElement) {
            window.scrollTo({
                top: categoryElement.offsetTop - 50,
                behavior: 'smooth'
            });
        }
    }
});
