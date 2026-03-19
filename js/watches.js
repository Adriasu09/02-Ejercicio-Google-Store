const swatchImages = document.querySelectorAll(".watch-swatch img");
const mainImage = document.querySelector(".image img");

swatchImages.forEach(function (swatchImg) {
  swatchImg.addEventListener("click", function () {
    mainImage.src = swatchImg.src;
    mainImage.alt = swatchImg.alt;
  });
});
