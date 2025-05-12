const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const arrowButons = document.querySelectorAll(".wrapper div");
const firstCardWidth = carousel.querySelector(".sitioTurist").offsetWidth;
const carouselChildren = [...carousel.children];


// Obtiene el numero de tarjetas que pueden estar al mismo tiempo
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);

// añade copias de los elementos al inicio para crear copias infinitas
carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// añade copias de los elementos al final para crear copias infinitas
carouselChildren.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeEnd", card.outerHTML);
});

// añade eventos para mover los elementos a la derecha o izquierda
arrowButons.forEach(btn => {
    btn.addEventListener("click", ()=> {
        carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    })
});

const autoPlay = () => {
    if(window.innerWidth < 625) return;
    // mueve los elementos luego de 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500)
} 
autoPlay();

const infiniteScroll = () => {
    // Si está al inicio hará scroll al final
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition")
        carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition")
    } 
    // Si está al final hará scroll al inicio
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition")
        carousel.scrollLeft = carousel.offsetWidth
        carousel.classList.remove("no-transition")
    }

    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover"))autoPlay();
} 

carousel.addEventListener("scroll", infiniteScroll)
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", () => autoPlay());