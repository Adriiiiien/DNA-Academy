// gère les effets visuels du header :
// ajout d'une classe "scrolled" quand on descend dans la page
// ouverture/fermeture du menu burger sur mobile
// ajoute ou retire la classe "scrolled" en fonction du scroll
function initScrollEffect() {
  const header = document.querySelector('.main-header');
  if (!header) return;

  // état initial au chargement de la page
  if (window.scrollY > 15) {
    header.classList.add('scrolled');
  }

  // met à jour la classe lors du scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 15) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

// gère le menu burger sur mobile (ouverture/fermeture)
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mainNav = document.querySelector('.main-nav');
  const navLinks = document.querySelectorAll('.main-nav a');

  if (!hamburger || !mainNav) return;

  // ouvre / ferme le menu au clic sur le burger
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mainNav.classList.toggle('active');
  });

  // ferme le menu quand on clique sur un lien de navigation
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mainNav.classList.remove('active');
    });
  });
}

// expose les fonctions dans window pour que layout.js puisse les appeler
window.initScrollEffect = initScrollEffect;
window.initMobileMenu = initMobileMenu;