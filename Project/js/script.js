document.addEventListener('DOMContentLoaded', () => {
    // 1. Ładowanie nawigacji
    const navPlaceholder = document.getElementById('nav-placeholder');
    
    fetch('components/nav.html')
        .then(response => response.text())
        .then(data => {
            navPlaceholder.innerHTML = data;
            
            // Dopiero teraz elementy istnieją w DOM, więc inicjujemy funkcje
            initThemeToggle();
            initMobileMenu(); 
        })
        .catch(err => console.error('Error loading nav:', err));
});

// --- Obsługa Trybu Ciemnego ---
function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Sprawdzenie zapisanego motywu
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        updateIcon(toggleBtn, currentTheme);
    }

    toggleBtn.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            updateIcon(toggleBtn, 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            updateIcon(toggleBtn, 'dark');
        }
    });
}

function updateIcon(btn, theme) {
    btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// --- Obsługa Menu Mobilnego (Burger) ---
function initMobileMenu() {
    const burger = document.getElementById('burger');
    const nav = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    if (burger && nav) {
        burger.addEventListener('click', () => {
            // Przełącz klasę pokazującą menu
            nav.classList.toggle('nav-active');
            
            // Animacja burgera (zamiana w X)
            burger.classList.toggle('toggle');
        });

        // Zamykanie menu po kliknięciu w link (UX)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('nav-active');
                burger.classList.remove('toggle');
            });
        });
    }
}