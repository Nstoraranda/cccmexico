function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

console.log("Sitio web de la Iglesia CENTRO CARISMATICO CALVARIO DE MÉXICO cargado correctamente 🙌");
// Efecto de aparición al hacer scroll
const hiddenElements = document.querySelectorAll('.hidden-left, .hidden-right');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.3 });

hiddenElements.forEach((el) => observer.observe(el));

// === Carrusel circular de videos ===
const carousel = document.getElementById("videoCarousel");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

if (carousel && nextBtn && prevBtn) {
  const scrollStep = 400; // distancia por clic
  const cardWidth = 380;  // ancho aproximado por video

  nextBtn.addEventListener("click", () => {
    // Si está al final, regresa al inicio
    if (carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 10) {
      carousel.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      carousel.scrollBy({ left: scrollStep, behavior: "smooth" });
    }
  });

  prevBtn.addEventListener("click", () => {
    // Si está al principio, salta al final
    if (carousel.scrollLeft <= 0) {
      carousel.scrollTo({ left: carousel.scrollWidth, behavior: "smooth" });
    } else {
      carousel.scrollBy({ left: -scrollStep, behavior: "smooth" });
    }
  });
}
// === LISTA DE PREDICACIONES con paginación ===
const videosData = [
  { url: "https://www.youtube.com/embed/edsooerCdew?si=5wA-BOR7Dgei0Q_Z", title: "Dios de vivos y no de muertos" },
  { url: "https://www.youtube.com/embed/16Mi12ZPeAg?si=dBCjMzwFQZ_A812q", title: "Un solo cuerpo" },
  { url: "https://www.youtube.com/embed/UlNHvaQpn28?si=GRSpCMUqLB18zjgb", title: "La parábola del mayordomo infiel" },
  { url: "https://www.youtube.com/embed/MoHaJJe14AM?si=Ctn6xUISCBTJrMIA", title: "La adoración a Dios es una decisión" },
  { url: "https://www.youtube.com/embed/-j84QH02pXk?si=xCwOREs-AQg1sYi8", title: "La garantía de nuestra salvación" },
  { url: "https://www.youtube.com/embed/QkbyRuw7cTw?si=6znDpU6uHh962M3_", title: "Los frutos del espíritu" },
  { url: "https://www.youtube.com/embed/H1DukPsfG_A?si=c5Qy7st-Yye7XrzL", title: "La parábola de la fiesta de las bodas" },
  { url: "https://www.youtube.com/embed/lTg9aMZsdxw?si=4ZDuwGTIBWPIVnx0", title: "La parábola de la higuera" },
  { url: "https://www.youtube.com/embed/CSLgiHyrPH0?si=wekmRi-GYtqIwg1D", title: "Discernimiento espiritual" },
  { url: "https://www.youtube.com/embed/FnEfaAYlC54?si=bbm8KsoZs6qwCCMB", title: "La oración de los santos" },

  // Ejemplo de más videos si quieres simular varias páginas:
  { url: "https://www.youtube.com/embed/MBxNzZwTXXw?si=dbEVLmsDnwF6PHXR", title: "Velando al servir a Dios" },
  { url: "https://www.youtube.com/embed/tj53l0c3C3U?si=0O8M6LQWldxwRcfO", title: "Imperativo Divino" },
  { url: "https://www.youtube.com/embed/1bzqxmQOq84?si=4B4wG0aW6yNd8TeF", title: "¿Por qué algunos rechazan a Dios?" },
  { url: "https://www.youtube.com/embed/85dyjzSGYYk?si=2-P9Ob_ikDkwnQh2", title: "Mensaje a las iglesias de Sardis, Laodisea y Filadelfia" },
  { url: "https://www.youtube.com/embed/iuef_lJt0hE?si=ptD4O-ydHmM9OM1d", title: "Mensaje a las iglesias de Pérgamo y Tiatira" },
  { url: "https://www.youtube.com/embed/6HNbWgVFuBE?si=0QvaG6Doeq-3nAq0", title: "Nuestra conexión con Dios" },
  { url: "https://www.youtube.com/embed/H1DukPsfG_A?si=c5Qy7st-Yye7XrzL", title: "Vivir guiado por el Espíritu" },
  { url: "https://www.youtube.com/embed/D1xTCxE56kk?si=KsQMVtcSX1-n5Ecz", title: "Iglesia tipo Antioquía" },
  { url: "https://www.youtube.com/embed/Hb6rNdWTNSo?si=oXFcSy9DPgGCAYbT", title: "La levadura escondida" },
  { url: "https://www.youtube.com/embed/ip-ICfC0zMk?si=-b372pwID6vjfDG8", title: "La fidelidad de la iglesia" },
];

const videosPerPage = 10; // 👈 ahora solo 10 por página
let currentPage = 1;

const videoGrid = document.getElementById("videoGrid");
const prevPageBtn = document.getElementById("prevPage");
const nextPageBtn = document.getElementById("nextPage");
const pageInfo = document.getElementById("pageInfo");

function renderVideos() {
  const start = (currentPage - 1) * videosPerPage;
  const end = start + videosPerPage;
  const currentVideos = videosData.slice(start, end);

  videoGrid.innerHTML = currentVideos.map(video => `
    <div class="video-card">
      <iframe src="${video.url}" title="${video.title}" frameborder="0" allowfullscreen></iframe>
      <h3>${video.title}</h3>
    </div>
  `).join("");

  pageInfo.textContent = `Página ${currentPage}`;
  prevPageBtn.disabled = currentPage === 1;
  nextPageBtn.disabled = end >= videosData.length;
}

if (videoGrid) {
  renderVideos();

  prevPageBtn.addEventListener("click", () => {
    if (currentPage > 1) {
      currentPage--;
      renderVideos();
      window.scrollTo({ top: videoGrid.offsetTop - 200, behavior: "smooth" });
    }
  });

  nextPageBtn.addEventListener("click", () => {
    if (currentPage * videosPerPage < videosData.length) {
      currentPage++;
      renderVideos();
      window.scrollTo({ top: videoGrid.offsetTop - 200, behavior: "smooth" });
    }
  });
}