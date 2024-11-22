
let themeSelector = document.getElementById("themeSelector");

themeSelector.addEventListener("change", (event) => {
    let selectedTheme = event.target.value;
    
    document.body.className = selectedTheme + '-theme'; 
});