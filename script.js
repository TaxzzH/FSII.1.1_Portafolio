/* ==========================================================
   DATOS DE PROYECTOS
========================================================== */

const projectsData = [
  {
    code: "P-01",
    title: "RentCar-withDocker",
    description:
      "Microservicio desarrollado en Java con Spring Boot para la gestión de una flota de vehículos." +
      "El proyecto aplica una arquitectura de 3 capas (Controller, Service, Repository) y utiliza una lista" +
      "en memoria para la persistencia de datos (Simulación de Base de Datos).",
    stack: ["Java", "Spring Boot", "Microservicios"],
    link: "https://github.com/TaxzzH/DevOps.EP2_RentCar-withDocker",
  },
  {
    code: "P-02",
    title: "M3Tours — Plataforma de Turismo",
    description:
      "Backend con arquitectura de microservicios en Spring Boot (usuarios, pagos, tours, " +
      "destinos, itinerarios). Incluye pruebas unitarias con Mockito, resolución de errores " +
      "de arranque (Flyway, JPA) y validación cruzada entre servicios vía WebClient.",
    stack: ["Java", "Spring Boot", "Microservicios", "Mockito"],
    link: "https://github.com/MatiasTenorio/Proyecto-Fullstack-M3Tours",
  },
  {
    code: "P-03",
    title: "Observabilidad Con AWS",
    description:
      "Uso de diversas herramientas aplicadas dentro de un repositorio en GitHub " +
      "para monitorear el flujo de datos interno y controlar escalabilidad del " +
      "microservicio en cuestion.",
    stack: ["Microservicios", "Pormtail", "Prometheus", "Grafana Loki"],
    link: "https://github.com/TaxzzH/DevOps.ET_ObservabilidadConAWS",
  },
];

/* ==========================================================
   RENDER DE TARJETAS DE PROYECTO
========================================================== */
function renderProjects() {
  const grid = document.getElementById("projectsGrid");
  if (!grid) return;

  const cardsHTML = projectsData
    .map(
      (p) => `
      <article class="project-card reveal">
        <span class="project-card__tag">${p.code}</span>
        <h3 class="project-card__title">${p.title}</h3>
        <p class="project-card__desc">${p.description}</p>
        <div class="project-card__stack">
          ${p.stack.map((tech) => `<span class="chip">${tech}</span>`).join("")}
        </div>
        <a href="${p.link}" class="project-card__link" target="_blank" rel="noopener noreferrer">
          Ver código →
        </a>
      </article>`
    )
    .join("");

  grid.innerHTML = cardsHTML;
}

/* ==========================================================
   NAV: menú móvil
========================================================== */
function setupMobileNav() {
  const toggle = document.getElementById("navToggle");
  const links = document.getElementById("navLinks");
  if (!toggle || !links) return;

  toggle.addEventListener("click", () => {
    const isOpen = links.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  links.querySelectorAll("[data-nav]").forEach((link) => {
    link.addEventListener("click", () => {
      links.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

/* ==========================================================
   NAV: resaltar link activo según la sección visible
========================================================== */
function setupActiveNav() {
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav__link[data-nav]");
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.getAttribute("id");
        navLinks.forEach((link) => {
          link.classList.toggle("active-link", link.getAttribute("href") === `#${id}`);
        });
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ==========================================================
   SCROLL REVEAL
========================================================== */
function setupScrollReveal() {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
}

function markSectionsForReveal() {
  document
    .querySelectorAll(".about__text, .spec-sheet, .skills__module, .contact__panel")
    .forEach((el) => el.classList.add("reveal"));
}

/* ==========================================================
   ANIMACIÓN DEL DIAGRAMA ESQUEMÁTICO (hero)
========================================================== */
function animateSchema() {
  const lines = document.querySelectorAll("#schemaSvg .schema-line");
  const nodes = document.querySelectorAll("#schemaSvg .schema-node");
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (prefersReducedMotion) return;

  lines.forEach((line, i) => {
    const length = line.getTotalLength();
    line.style.strokeDasharray = `${length}`;
    line.style.strokeDashoffset = `${length}`;
    line.style.transition = `stroke-dashoffset 0.9s ease ${0.15 * i}s`;
    // forzar reflow antes de animar
    requestAnimationFrame(() => {
      line.style.strokeDashoffset = "0";
    });
  });

  nodes.forEach((node, i) => {
    node.style.opacity = "0";
    node.style.transform = "scale(0.9)";
    node.style.transformOrigin = "center";
    node.style.transition = `opacity 0.5s ease ${0.35 + 0.12 * i}s, transform 0.5s ease ${
      0.35 + 0.12 * i
    }s`;
    requestAnimationFrame(() => {
      node.style.opacity = "1";
      node.style.transform = "scale(1)";
    });
  });
}

/* ==========================================================
   FOOTER: año actual
========================================================== */
function setFooterYear() {
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}

/* ==========================================================
   INIT
========================================================== */
document.addEventListener("DOMContentLoaded", () => {
  renderProjects();
  setupMobileNav();
  setupActiveNav();
  markSectionsForReveal();
  setupScrollReveal();
  animateSchema();
  setFooterYear();
});
