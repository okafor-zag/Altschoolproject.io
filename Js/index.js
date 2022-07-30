"use strict";

//js for slider

const slides = document.querySelectorAll(".slide");
const nextSlideBtn = document.querySelector(".next_btn");
const prevSlideBtn = document.querySelector(".prev_btn");

let curSlide = 0;
let maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(0);

const nextSlide = () => {
  curSlide === maxSlide - 1 ? (curSlide = 0) : curSlide++;
  goToSlide(curSlide);
};
const prevSlide = () => {
  curSlide === 0 ? (curSlide = maxSlide - 1) : curSlide--;
  goToSlide(curSlide);
};
//Event Handlers
nextSlideBtn.addEventListener("click", nextSlide);
prevSlideBtn.addEventListener("click", prevSlide);

// Adding Keydown events
document.addEventListener("keydown", (e) => {
  (e.key === "ArrowRight" && nextSlide()) ||
    (e.key === "ArrowLeft" && prevSlide());
});
