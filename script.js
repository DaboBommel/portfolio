document.addEventListener('DOMContentLoaded', () => {
    // --- Language Toggle Logic ---
    // Handles switching between English and Czech content
    const langToggleBtn = document.getElementById('lang-toggle');
    const elementsToTranslate = document.querySelectorAll('[data-en], [data-en-placeholder]');

    // Helper to get query param
    const getQueryParam = (param) => {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    };

    // Check URL first, then localStorage, then default to 'en'
    let currentLang = getQueryParam('lang') || localStorage.getItem('preferredLang') || 'en';

    // Function to update links
    function updateLinks(lang) {
        document.querySelectorAll('a').forEach(link => {
            const href = link.getAttribute('href');
            // Skip external links, anchors, and non-html links
            if (!href || href.startsWith('http') || href.startsWith('#') || href.startsWith('mailto:')) return;

            // Remove existing lang param and append new one
            const cleanHref = href.split('?')[0];
            link.setAttribute('href', `${cleanHref}?lang=${lang}`);
        });
    }

    // Function to update CV page specific elements
    // Toggles between English and Czech PDF embeds and download buttons
    function updateCVPage(lang) {
        const cvPdfEn = document.getElementById('cv-pdf-en');
        const cvPdfCz = document.getElementById('cv-pdf-cz');
        const downloadBtn = document.getElementById('download-cv-btn');

        if (cvPdfEn && cvPdfCz) {
            if (lang === 'en') {
                cvPdfEn.style.display = 'block';
                cvPdfCz.style.display = 'none';
                if (downloadBtn) downloadBtn.href = 'assets/pdfs/CV_EN.pdf';
            } else {
                cvPdfEn.style.display = 'none';
                cvPdfCz.style.display = 'block';
                if (downloadBtn) downloadBtn.href = 'assets/pdfs/CV_CZ.pdf';
            }
        }
    }

    // Function to update text content based on language
    function updateLanguage(lang) {
        elementsToTranslate.forEach(el => {
            if (el.hasAttribute(`data-${lang}`)) {
                el.textContent = el.getAttribute(`data-${lang}`);
            }
            if (el.hasAttribute(`data-${lang}-placeholder`)) {
                el.placeholder = el.getAttribute(`data-${lang}-placeholder`);
            }
            // Handle title attributes for tooltips
            if (el.hasAttribute(`data-${lang}-title`)) {
                el.title = el.getAttribute(`data-${lang}-title`);
            }
        });
        if (langToggleBtn) {
            langToggleBtn.textContent = lang === 'en' ? 'CZ' : 'EN';
        }
        document.documentElement.lang = lang;

        // Update URL without reloading
        const newUrl = new URL(window.location);
        newUrl.searchParams.set('lang', lang);
        window.history.replaceState({}, '', newUrl);

        // Update all navigation links
        updateLinks(lang);

        // Update CV specific elements
        updateCVPage(lang);
    }

    // Initial update
    updateLanguage(currentLang);

    // Toggle event listener
    if (langToggleBtn) {
        langToggleBtn.addEventListener('click', () => {
            currentLang = currentLang === 'en' ? 'cz' : 'en';
            localStorage.setItem('preferredLang', currentLang);
            updateLanguage(currentLang);
        });
    }

    // --- Fade-in Animation on Scroll ---
    // Uses IntersectionObserver to trigger animations when elements scroll into view
    const fadeElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => {
        observer.observe(el);
    });

    // --- Back to Top Button Logic ---
    // Creates and manages the visibility of the 'Back to Top' button
    // Create the button element dynamically
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'back-to-top';
    backToTopBtn.innerHTML = '&#8679;'; // Up arrow character
    backToTopBtn.title = 'Go to top';
    backToTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(backToTopBtn);

    // Show/Hide button on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // --- Contact Form Handling ---
    // Handles form submission via fetch API and displays success message
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');
    const backToFormBtn = document.getElementById('back-to-form');

    if (contactForm && successMessage) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);

            fetch('/', {
                method: 'POST',
                headers: { "Content-Type": "application/x-www-form-urlencoded" },
                body: new URLSearchParams(formData).toString()
            })
                .then(() => {
                    contactForm.classList.add('hidden');
                    successMessage.classList.remove('hidden');
                    contactForm.reset();
                })
                .catch((error) => {
                    alert('Error sending message. Please try again later.');
                    console.error('Form submission error:', error);
                });
        });

        if (backToFormBtn) {
            backToFormBtn.addEventListener('click', () => {
                successMessage.classList.add('hidden');
                contactForm.classList.remove('hidden');
            });
        }
    }
    // --- Essay Filtering Logic ---
    const searchBar = document.getElementById('search-bar');
    const semesterFilter = document.getElementById('semester-filter');
    const subjectFilter = document.getElementById('subject-filter');
    const essayItems = document.querySelectorAll('.portfolio-item');

    function filterEssays() {
        if (!searchBar || !semesterFilter || !subjectFilter) return;

        const searchText = searchBar.value.toLowerCase();
        const semesterValue = semesterFilter.value;
        const subjectValue = subjectFilter.value;

        essayItems.forEach(item => {
            const title = (item.getAttribute('data-title') || '').toLowerCase();
            const semester = item.getAttribute('data-semester');
            const subject = item.getAttribute('data-subject');

            const matchesSearch = title.includes(searchText);
            const matchesSemester = semesterValue === 'all' || semester === semesterValue;
            const matchesSubject = subjectValue === 'all' || subject === subjectValue;

            if (matchesSearch && matchesSemester && matchesSubject) {
                item.style.display = 'flex'; // Restore display
                item.classList.add('visible'); // Ensure fade-in visible if applicable
            } else {
                item.style.display = 'none';
            }
        });
    }

    if (searchBar && semesterFilter && subjectFilter) {
        searchBar.addEventListener('input', filterEssays);
        semesterFilter.addEventListener('change', filterEssays);
        subjectFilter.addEventListener('change', filterEssays);
    }
});