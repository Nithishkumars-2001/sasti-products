
//**************************** Select Sidenavbar  *****************************//

var sidenavbar = document.querySelector(".side-navbar")

function shownavbar() {
    sidenavbar.style.left = "0"
}
function closenavbar() {
    sidenavbar.style.left = "-100%"
}

// *************************** People Testimonial Slider ***************************** //

const testimonialWrapper = document.querySelector(".testimonial-wrapper");
const testimonialCarousel = document.querySelector(".testimonial-carousel");
const arrowBtns = document.querySelectorAll(".testimonial-wrapper i");
const firstCardWidth = testimonialCarousel.querySelector(".testimonial-card").offsetWidth;
const carouselChildren = [...testimonialCarousel.children];

let isDragging = false,
    startX, startScrollLeft, timeoutId;
let cardPerView = Math.round(testimonialCarousel.offsetWidth / firstCardWidth);

// Clone last cards and prepend them
carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    testimonialCarousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});

// Clone first cards and append them
carouselChildren.slice(0, cardPerView).forEach(card => {
    testimonialCarousel.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Adjust scroll position to the first original card (avoid jump effect)
testimonialCarousel.scrollLeft = firstCardWidth * cardPerView;

arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        testimonialCarousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

const dragStart = (e) => {
    isDragging = true;
    testimonialCarousel.classList.add("dragging");
    startX = e.pageX;
    startScrollLeft = testimonialCarousel.scrollLeft;
}

const dragging = (e) => {
    if (!isDragging) return;
    testimonialCarousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
    isDragging = false;
    testimonialCarousel.classList.remove("dragging");
}

const autoplay = () => {
    if (window.innerWidth < 800) return;
    timeoutId = setTimeout(() => testimonialCarousel.scrollLeft += firstCardWidth, 2000);
}
autoplay();

// Infinite loop effect when reaching cloned elements
const infiniteScroll = () => {
    if (testimonialCarousel.scrollLeft <= 0) {
        testimonialCarousel.classList.add("no-transition");
        testimonialCarousel.scrollLeft = testimonialCarousel.scrollWidth - (2 * testimonialCarousel.offsetWidth);
        testimonialCarousel.classList.remove("no-transition");

    } else if (testimonialCarousel.scrollLeft >= testimonialCarousel.scrollWidth - testimonialCarousel.offsetWidth) {
        testimonialCarousel.classList.add("no-transition");
        testimonialCarousel.scrollLeft = testimonialCarousel.offsetWidth;
        testimonialCarousel.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!testimonialWrapper.matches(":hover")) autoplay();
}

testimonialCarousel.addEventListener("mousedown", dragStart);
testimonialCarousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
testimonialCarousel.addEventListener("scroll", infiniteScroll);
testimonialWrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
testimonialWrapper.addEventListener("mouseleave", autoplay);