// const hamburger = document.querySelector(".hamburger");
// const navMenu = document.querySelector(".nav-menu");

// hamburger.addEventListener("click", () => {
//     hamburger.classList.toggle("active");
//     navMenu.classList.toggle("active");
// });

// document.querySelectorAll(".nav-link").forEach( n => n.addEventListener("click", () => {
//     hamburger.classList.remove("active");
//     navMenu.classList.remove("active");
// }))

// Ser till att hela sidan har laddats helt innan js-koden koden körs
document.addEventListener('DOMContentLoaded', function() {
    
});


// fetch anrop till server
async function getData() {
    try {
        const response = await fetch('https://webbutveckling.miun.se/files/ramschema_ht23.json');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}

async function readData() {
    const data = await getData();
    console.log(data);
}

readData();