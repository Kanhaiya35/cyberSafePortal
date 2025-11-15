/* ==================== MOBILE MENU ==================== */
const mobileMenu = document.getElementById("mobile-menu");
const navLinks = document.querySelector(".nav-links");

mobileMenu?.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

/* ==================== SMOOTH SCROLL ==================== */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute("href"));
        target?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
});

/* ==================== COUNTER ANIMATION ==================== */
const counters = document.querySelectorAll(".counter");

const animateCounter = (counter) => {
    const target = +counter.dataset.target;
    let value = 0;
    const step = target / 200;

    const update = () => {
        value += step;
        if (value < target) {
            counter.textContent = Math.ceil(value);
            requestAnimationFrame(update);
        } else {
            counter.textContent = target.toLocaleString();
        }
    };
    update();
};

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(c => observer.observe(c));

/* ==================== NAVBAR SHADOW ==================== */
const navbar = document.querySelector(".navbar");
window.addEventListener("scroll", () => {
    navbar.style.boxShadow = window.scrollY > 50
        ? "0 4px 20px rgba(0,0,0,.1)"
        : "0 4px 6px rgba(0,0,0,.1)";
});
