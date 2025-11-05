// ==========================
// MENÚ HAMBURGUESA RESPONSIVO
// ==========================

// Seleccionamos los elementos principales
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

// Verificamos que existan antes de aplicar eventos (por si alguna página no tiene header)
if (hamburger && menu) {
  // Toggle del menú
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
  });

  // Cerrar menú al hacer clic en cualquier enlace dentro del menú
  document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      menu.classList.remove('active');
    });
  });
}