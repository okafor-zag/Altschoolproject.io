"use strict";

/// JS for network verification
const inputNumber = document.getElementById("number");
const inputName = document.getElementById("fullName");
const checkBtn = document.querySelector(".check-btn");
const modal = document.querySelector(".modal-container");
const userName = document.querySelector(".modal-container .name");
const userNumber = document.querySelector(".modal-container .mobile-number");
const networkImg = document.querySelector(".network-logo img");
const networkName = document.querySelector(".modal-container .network");
const backdrop = document.querySelector(".backdrop");

//// Functions
const displayModal = (img) => {
  modal.classList.remove("hidden");
  backdrop.classList.remove("hidden");
  userName.textContent = `Dear ${inputName.value}`;
  userNumber.textContent = `Your Mobile Number is: ${inputNumber.value}`;
  networkName.textContent = `Your Network Provider is ${
    img === 0
      ? "MTN"
      : img === 1
      ? "Airtel"
      : img === 2
      ? "Glo"
      : img === 3
      ? "9mobile"
      : null
  }`;
  networkImg.src =
    img === 0 ? `../img/${img + 1}.jpg` : `../img/${img + 1}.png`;
};

checkBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let num;
  const val = inputNumber.value;
  if (val.startsWith("0")) {
    num = val.substring(0, 4);
    inputNumber.maxLength = "11";
  } else if (val.startsWith("+234")) {
    num = "0" + val.substring(4, 7);
    inputNumber.maxLength = "14";
  }

  const mtn = [
    "0803",
    "0816",
    "0903",
    "0810",
    "0806",
    "0703",
    "0706",
    "0813",
    "0814",
    "0906",
    "0702",
    "0704",
  ];
  const airtel = [
    "0907",
    "0802",
    "0902",
    "0812",
    "0808",
    "0701",
    "0708",
    "0904",
    "0901",
  ];
  const glo = ["0805", "0905", "0807", "0811", "0705", "0815"];
  const etisalat = ["0909", "0908", "0818", "0809", "0817"];

  const networks = [mtn, airtel, glo, etisalat];
  networks.forEach((network, i) => {
    network.includes(num) ? displayModal(i) : null;
  });
});

// Event Handlers
backdrop.addEventListener("click", () => {
  modal.classList.add("hidden");
  backdrop.classList.add("hidden");
});

//js for slider

const slides = document.querySelectorAll(".slide");
const nextSlideBtn = document.querySelector("button .slider-btn.next_btn");
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
