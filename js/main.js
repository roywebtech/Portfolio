document.addEventListener('DOMContentLoaded', function() {
    // --- PRELOADER ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            gsap.to(preloader, {
                duration: 0.5,
                opacity: 0,
                onComplete: () => {
                    preloader.style.display = 'none';
                }
            });
        });
    }

    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // --- TYPED.JS INITIALIZATION ---
    if (document.getElementById('typed-text')) {
        var options = {
            strings: ["Android Developer", "Flutter Enthusiast", "Tech Innovator"],
            typeSpeed: 50,
            backSpeed: 50,
            backDelay: 2000,
            loop: true
        };
        var typed = new Typed("#typed-text", options);
    }

    // --- SMOOTH SCROLL & CLOSE MOBILE NAV ON CLICK ---
    const navLinks = document.querySelectorAll('.nav-link');
    const navCollapse = document.querySelector('.navbar-collapse');
    const navToggler = document.querySelector('.navbar-toggler');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId && targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    gsap.to(window, {
                        duration: 0,
                        scrollTo: { y: targetElement, offsetY: 70 },
                        ease: 'none'
                    });
                    // Close the navbar on click
                    if (navCollapse.classList.contains('show')) {
                        navToggler.click();
                    }
                }
            }
        });
    });
    
    // --- HERO SECTION ANIMATION ---
    const homeTl = gsap.timeline({ delay: 0.5 });
    homeTl.from('#home h1', { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' })
          .from('#home .lead', { opacity: 0, y: 30, duration: 0.8, ease: 'power3.out' }, "-=0.6")
          .from('#home .d-md-flex', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out' }, "-=0.6");

    // --- GENERAL SECTION REVEAL ---
    const revealSections = gsap.utils.toArray('.section-padding');
    revealSections.forEach(section => {
        const sectionTl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none none'
            }
        });

        const sectionTitle = section.querySelector('.section-title h2');
        const sectionContent = section.querySelectorAll('.row > *');

        if (sectionTitle) {
            sectionTl.from(sectionTitle, { opacity: 0, y: 50, duration: 0.8, ease: 'power3.out' });
        }
        if (sectionContent.length > 0) {
            sectionTl.from(sectionContent, { opacity: 0, y: 50, duration: 0.8, stagger: 0.2, ease: 'power3.out' }, "-=0.5");
        }
    });


    // --- TIMELINE LINE ANIMATION ---
    const timeline = document.querySelector('.timeline');
    if (timeline) {
        gsap.to('.timeline-line', {
            height: '100%',
            scrollTrigger: {
                trigger: '.timeline',
                start: 'top center',
                end: 'bottom center',
                scrub: 1
            }
        });
    }

    // --- TIMELINE ITEMS REVEAL ---
    const timelineItems = gsap.utils.toArray('#experience .timeline-item');
    timelineItems.forEach(item => {
        gsap.from(item, {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            opacity: 0,
            x: -50,
            duration: 0.8,
            ease: 'power3.out'
        });
    });
});
// Add scrollspy manually
var scrollSpy = new bootstrap.ScrollSpy(document.body, {
  target: '#navbar'
})