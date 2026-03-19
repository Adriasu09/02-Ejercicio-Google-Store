document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("article[data-href]").forEach((article) => {
    article.addEventListener("click", () => {
      window.location = article.dataset.href;
    });
  });

  document.querySelectorAll(".add_to_cart").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();

      let badge = document.getElementById("cart-count");

      if (!badge) {
        badge = document.createElement("span");
        badge.id = "cart-count";
        badge.className = "cart-badge";
        badge.textContent = "1";
        badge.style.display = "flex";
        document.querySelector(".cart-icon").appendChild(badge);
        return;
      }

      badge.textContent = parseInt(badge.textContent) + 1;
    });
  });
});
