// Dark mode
const themeBtn = document.getElementById('theme-toggle');
themeBtn.addEventListener('click', toggleTheme);

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
}

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('show');
});


