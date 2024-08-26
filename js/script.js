jQuery.noConflict();
jQuery(document).ready(function($) {
	// Move top button functionality
	function toggleMoveTopButton() {
		const moveTopButton = document.getElementById("movetop");
		moveTopButton.style.display = (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) ? "block" : "none";
	}

	window.onscroll = toggleMoveTopButton;

	document.getElementById("movetop").onclick = function() {
		document.body.scrollTop = 0;
		document.documentElement.scrollTop = 0;
	};

	// Typing text effect
	const typedTextSpan = document.querySelector(".typed-text");
	const cursorSpan = document.querySelector(".cursor");
	const textArray = ["Web Developer", "FullStack Developer", "Master in Computer Science"];
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

	if (textArray.length) setTimeout(type, newTextDelay + 250);

	// Owl Carousel setup
	$('.owl-two').owlCarousel({
		loop: true,
		margin: 30,
		nav: false,
		responsiveClass: true,
		autoplay: false,
		autoplayTimeout: 5000,
		autoplaySpeed: 1000,
		autoplayHoverPause: false,
		responsive: {
			0: { items: 1 },
			480: { items: 1 },
			700: { items: 1 },
			1090: { items: 3 }
		}
	});

	function changeModalImage(imageSrc) {
		document.getElementById('modal-image').src = imageSrc;
	}

});
