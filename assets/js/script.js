
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


// *************************** Contact Form Quantity  ***************************** //
/*
function changeQuantity(amount) {
    const input = document.getElementById('quantity');
    let current = parseInt(input.value);

    if (isNaN(current)) {
        current = 1;
    }

    const newValue = Math.max(1, current + amount);
    input.value = newValue;
}*/

// *************************** Contact Form  ***************************** //
/*
function changeQuantity(amount) {
    const input = document.getElementById('quantity');
    let current = parseInt(input.value) || 1;
    input.value = Math.max(1, current + amount);
}

function placeOrder() {
    const name = document.getElementById("fullName").value.trim();
    const phone = document.getElementById("phoneNumber").value.trim();
    const email = document.getElementById("email").value.trim();
    const address = document.getElementById("address").value.trim();
    const quantity = document.getElementById("quantity").value;

    const packageSize = document.querySelector('input[name="packageSize"]:checked').value;

    const termsChecked = document.getElementById("terms").checked;

    if (!name || !phone || !address || !termsChecked) {
        alert("Please fill all required fields and agree to the terms.");
        return;
    }

    const message = `*New Order Request*%0A
👤 *Name:* ${name}%0A
📞 *Phone:* ${phone}%0A
📧 *Email:* ${email || 'N/A'}%0A
🏠 *Address:* ${address}%0A
📦 *Package:* ${packageSize}%0A
🔢 *Quantity:* ${quantity}%0A
✅ *Agreed to Terms:* Yes`;

    // WhatsApp number (India format)
    const phoneNumber = "918838554879";

    // Open WhatsApp
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
}
    */