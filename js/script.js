document.addEventListener('DOMContentLoaded', function () {
    // Move top button functionality
    const moveTopButton = document.getElementById("movetop");

    function toggleMoveTopButton() {
        moveTopButton.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none";
    }

    window.addEventListener('scroll', toggleMoveTopButton);
    moveTopButton.addEventListener('click', () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });

    // Typing text effect
    const typedTextSpan = document.querySelector(".typed-text");
    const cursorSpan = document.querySelector(".cursor");
    const textArray = ["Data Analyst", "AI Researcher", "Web Developer", "FullStack Developer", "Comp. Science Master"];
    const typingDelay = 200;
    const erasingDelay = 10;
    const newTextDelay = 100;
    let textArrayIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            cursorSpan.classList.add("typing");
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            setTimeout(erase, newTextDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            cursorSpan.classList.remove("typing");
            textArrayIndex = (textArrayIndex + 1) % textArray.length;
            setTimeout(type, typingDelay);
        }
    }

    if (textArray.length) {
        setTimeout(type, newTextDelay + 250);
    }

    // SwiperJS setup
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        margin: 30,
        nav: false,
        responsiveClass: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        breakpoints: {
            0: { slidesPerView: 1 },
            480: { slidesPerView: 1 },
            700: { slidesPerView: 2 },
            1090: { slidesPerView: 3 }
        }
    });

    // Modal image functionality
    function changeModalImage(imageSrc) {
        const modalImage = document.getElementById('modal-image');
        if (modalImage) {
            modalImage.src = imageSrc;
        }
    }

    document.addEventListener('click', function (event) {
        if (event.target.matches('a.read')) {
            const imageSrc = event.target.getAttribute('data-image');
            if (imageSrc) {
                changeModalImage(imageSrc);
            }
        }

        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarToggler && navbarCollapse && navbarCollapse.classList.contains('show')) {
            if (event.target.matches('.nav-link:not(.dropdown-toggle), .dropdown-item')) {
                navbarToggler.click();
            }
        }
    });
});
