let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

// Toggling the menu and icon when clicked
menuIcon.onclick = () => {
    menuIcon.classList.toggle('fa-xmark'); 
    navbar.classList.toggle('active'); 
};

// Scroll Section Active Link
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    let top = window.scrollY;

    sections.forEach(sec => {
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        }
    });

    // Sticky Navbar
    let header = document.querySelector('header');
    header.classList.toggle('sticky', top > 100);
};



// remove toggle icon and navbar

menuIcon.classList.remove('fa-xmark');
navbar.classList.remove('active');


// scroll reveal
ScrollReveal({
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content , .headline', { origin: 'top' });
ScrollReveal().reveal('.home-img , .services-container , .projects-box , .contact form', { origin: 'button' });
ScrollReveal().reveal('.home-content h1 , .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p , .about-content ,', { origin: 'right' });

//  type.js
const typed = new Typed('.multiple-text', {
    strings: ['Full Stack Developer', 'Web Developer'],
    typeSpeed: 70,
    backSpeed: 70,
    backDelay: 1000,
    loop: true
});