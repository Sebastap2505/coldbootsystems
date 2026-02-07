
const toggleBtn = document.getElementById("theme-toggle");
if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("light");
        toggleBtn.textContent = document.body.classList.contains("light") ? "🌞" : "🌙";
    });
}

const reveals = document.querySelectorAll(".reveal");
function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    reveals.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            el.classList.add("active");
        }
    });
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

if (typeof particlesJS !== 'undefined') {
    particlesJS("particles-js", {
        "particles": { "number": { "value": 60, "density": { "enable": true, "value_area": 800 } }, "color": { "value": "#ffffff" }, "shape": { "type": "circle" }, "opacity": { "value": 0.5, "random": true }, "size": { "value": 3, "random": true }, "line_linked": { "enable": true, "distance": 150, "color": "#d4af37", "opacity": 0.3, "width": 1 }, "move": { "enable": true, "speed": 1.5 } },
        "interactivity": { "detect_on": "canvas", "events": { "onhover": { "enable": true, "mode": "grab" } }, "modes": { "grab": { "distance": 140, "line_linked": { "opacity": 1 } } } }
    });
}

const menuBtn = document.getElementById("menuBtn");
const menu = document.getElementById("menu");
const closeMenuBtn = document.getElementById("closeMenuBtn");
const menuLinks = document.querySelectorAll(".menu a:not(#menuFaq), .menu button:not(#menuServices)");

function toggleMenu() {
    menu.classList.toggle("active");
}

if (menuBtn) menuBtn.addEventListener("click", toggleMenu);
if (closeMenuBtn) closeMenuBtn.addEventListener("click", () => menu.classList.remove("active"));

menuLinks.forEach(link => {
    link.addEventListener("click", () => menu.classList.remove("active"));
});

const menuServices = document.getElementById("menuServices");
const servicesModal = document.getElementById("servicesModal");
const closeServices = document.getElementById("closeServices");

if (menuServices) {
    menuServices.addEventListener("click", () => {
        menu.classList.remove("active");
        servicesModal.classList.add("active");
    });
}
if (closeServices) closeServices.addEventListener("click", () => servicesModal.classList.remove("active"));

const menuGallery = document.getElementById("menuGallery");
const galleryPage = document.getElementById("galleryPage");
const closeGallery = document.getElementById("closeGallery");

if (menuGallery) {
    menuGallery.addEventListener("click", (e) => {
        e.preventDefault();
        menu.classList.remove("active");
        galleryPage.classList.add("active");
    });
}
if (closeGallery) closeGallery.addEventListener("click", () => galleryPage.classList.remove("active"));
const menuFaq = document.getElementById("menuFaq");
const faqSection = document.getElementById("faq");
const faqItems = document.querySelectorAll(".faq-item");

if (menuFaq && faqSection) {
    menuFaq.addEventListener("click", (e) => {
        e.preventDefault();
        menu.classList.remove("active");
        
        faqSection.classList.add("active");
        
        setTimeout(() => {
            faqSection.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
    });
}

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");
    if (question) {
        question.addEventListener("click", () => {
            faqItems.forEach(otherItem => {
                if (otherItem !== item) otherItem.classList.remove("active");
            });
            item.classList.toggle("active");
        });
    }
});

const menuContact = document.getElementById("menuContact");
const footer = document.getElementById("footer");

if (menuContact && footer) {
    menuContact.addEventListener("click", (e) => {
        e.preventDefault();
        menu.classList.remove("active");
        footer.scrollIntoView({ behavior: "smooth" });
    });
}
