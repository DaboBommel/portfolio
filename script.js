document.addEventListener('DOMContentLoaded', () => {

    // --- LANGUAGE TOGGLE LOGIC ---

    const langToggle = document.getElementById('lang-toggle');
    const translatableElements = document.querySelectorAll('[data-en], [data-cz]');
    
    // Special CV page elements
    const cvEmbedEN = document.getElementById('cv-pdf-en');
    const cvEmbedCZ = document.getElementById('cv-pdf-cz');

    const setLanguage = (lang) => {
        // 1. Set lang attribute on <html>
        document.documentElement.lang = lang;
        
        // 2. Update all text elements
        translatableElements.forEach(el => {
            const text = el.getAttribute(`data-${lang}`);
            if (text) {
                // Check for placeholder attributes
                if (el.hasAttribute('data-en-placeholder') || el.hasAttribute('data-cz-placeholder')) {
                    const placeholderText = el.getAttribute(`data-${lang}-placeholder`) || el.getAttribute(`data-${lang}`);
                    el.placeholder = placeholderText;
                } 
                // All other elements
                else {
                    el.textContent = text;
                }
            }
        });

        // 3. Update toggle button text
        if (langToggle) {
            langToggle.textContent = (lang === 'en') ? 'CZ' : 'EN';
        }
        
        // 4. Toggle CV visibility
        if (cvEmbedEN && cvEmbedCZ) {
            cvEmbedEN.style.display = (lang === 'en') ? 'block' : 'none';
            cvEmbedCZ.style.display = (lang === 'cz') ? 'block' : 'none';
        }

        // 5. Save preference
        localStorage.setItem('portfolioLang', lang);

        // 6. Update active nav link (since text content changed)
        updateActiveNavLink();
    };

    // Update active nav link
    const updateActiveNavLink = () => {
        const navLinks = document.querySelectorAll('nav ul li a');
        const currentPath = window.location.pathname.split('/').pop();
        
        navLinks.forEach(link => {
            const linkPath = link.getAttribute('href').split('/').pop();
            
            // Handle index.html root
            if ( (currentPath === '' || currentPath === 'index.html') && (linkPath === '' || linkPath === 'index.html') ) {
                link.classList.add('active');
            }
            // Other pages
            else if (linkPath === currentPath && currentPath !== '') {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    };

    // Toggle button click event
    if (langToggle) {
        langToggle.addEventListener('click', () => {
            const currentLang = document.documentElement.lang || 'en';
            const newLang = (currentLang === 'en') ? 'cz' : 'en';
            setLanguage(newLang);
        });
    }

    // Initial load: Check for saved language or default to 'en'
    const savedLang = localStorage.getItem('portfolioLang') || 'en';
    setLanguage(savedLang);
    // updateActiveNavLink() is called inside setLanguage()


    // --- FADE-IN ANIMATION LOGIC ---

    const fadeElements = document.querySelectorAll('.fade-in');

    if ("IntersectionObserver" in window) {
        const observerOptions = {
            root: null, // relative to the viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% of the item must be visible
        };

        const observerCallback = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Stop observing once it's visible
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);

        fadeElements.forEach(el => {
            observer.observe(el);
        });
    } else {
        // Fallback for very old browsers
        fadeElements.forEach(el => {
            el.classList.add('visible');
        });
    }

});