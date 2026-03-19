const thumbnails = document.querySelectorAll(".thumbnails img");
const mainImage = document.querySelector(".image img");

console.log("miniaturas", thumbnails);

thumbnails.forEach(function (thumbnail) {
  thumbnail.addEventListener("click", function () {
    mainImage.src = thumbnail.src;
    mainImage.alt = thumbnail.alt;

    thumbnails.forEach(function (img) {
      img.parentElement.classList.remove("active");
    });
    thumbnail.parentElement.classList.add("active");
  });
});
