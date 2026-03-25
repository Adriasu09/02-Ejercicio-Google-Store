import { productsData } from "../config/productsData.js";
import { renderNav } from "./components/nav.js";
import { renderFooter } from "./components/footer.js";
import { renderProductDetail } from "./components/productDetail.js";

const root = document.getElementById("root");

// ── Leer el id del producto desde la URL ───────────────────────────────────
// Ejemplo: product.html?id=pixel-buds-pro  →  productId = "pixel-buds-pro"
const params = new URLSearchParams(window.location.search);
const productId = params.get("id");

// .find() devuelve el primer objeto que cumple la condición, o undefined
const product = productsData.find((p) => p.id === productId);

// ── Producto no encontrado ─────────────────────────────────────────────────
if (!product) {
  root.innerHTML = `
    ${renderNav(null, "../")}
    <main class="not-found">
      <h1>Producto no encontrado</h1>
      <p>El producto "${productId ?? "desconocido"}" no existe en el catálogo.</p>
      <a href="../index.html" class="btn_back">← Volver al catálogo</a>
    </main>
    ${renderFooter("../")}
  `;
} else {
  // ── Inyectar stylesheet extra si el producto lo necesita ─────────────────
  // Ejemplo: watches_style.css solo se carga para el Fitbit, no para los earbuds.
  // Así evitamos cargar CSS innecesario en productos que no lo usan.
  if (product.extraStylesheet) {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = product.extraStylesheet;
    document.head.appendChild(link);
  }

  // Actualizar el título de la pestaña del navegador con el nombre del producto
  document.title = `${product.name} — Google Store`;

  // ── Renderizado ───────────────────────────────────────────────────────────
  root.innerHTML = `
    ${renderNav(product.navCategory, "../")}
    <main>
      ${renderProductDetail(product, "../")}
    </main>
    ${renderFooter("../")}
  `;

  // ── Interactividad ────────────────────────────────────────────────────────
  // Referencia a la imagen hero: la actualizamos en ambos tipos de interacción
  const heroImage = document.getElementById("hero-image");

  // Thumbnails laterales (Earbuds) ─────────────────────────────────────────
  // Solo añadimos el listener si el producto tiene thumbnails
  if (product.thumbnails.length > 0) {
    const thumbnailsContainer = document.querySelector(".thumbnails");

    // Delegación: un listener en el contenedor captura clicks de todos los thumbs
    thumbnailsContainer.addEventListener("click", (e) => {
      const thumbDiv = e.target.closest("div[data-src]");
      if (!thumbDiv) return;

      // Cambiar la imagen hero
      heroImage.src = thumbDiv.dataset.src;
      heroImage.alt = thumbDiv.querySelector("img").alt;

      // Mover la clase .active al thumbnail clickado
      thumbnailsContainer
        .querySelectorAll("div")
        .forEach((div) => div.classList.remove("active"));
      thumbDiv.classList.add("active");
    });
  }

  // Selector de color tipo card (Watches) ───────────────────────────────────
  // Solo añadimos el listener si el producto usa color cards
  if (product.colorSelectorType === "card") {
    const watchColors = document.querySelector(".watch-colors");

    // data-image en el label contiene la ruta de la imagen correspondiente
    watchColors.addEventListener("click", (e) => {
      const label = e.target.closest("label[data-image]");
      if (!label) return;

      heroImage.src = label.dataset.image;
      heroImage.alt = label.querySelector("img").alt;
    });
  }
}
