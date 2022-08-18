"use strict";

/// JS for network verification
const inputNumber = document.getElementById("number");
const inputName = document.getElementById("fullName");
const checkBtn = document.querySelector(".check_btn");
const modal = document.querySelector(".modal-container");
const userName = document.querySelector(".modal-container .name");
const userNumber = document.querySelector(".modal-container .mobile-number");
const networkImg = document.querySelector(".network-logo img");
const modalNetworkImg = document.querySelector(".user_number img");
const networkName = document.querySelector(".modal-container .network");
const backdrop = document.querySelector(".backdrop");
const errorText = document.querySelector(".error-text");
const autoSuggestContainer = document.querySelector(".auto-suggest");

// js for Sticky header
let nav = document.querySelector("section.nav");
let texts = document.querySelectorAll(".options_items a");
window.onscroll = function () {
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add("sticky");
    texts.forEach((text) => text.classList.add("sticky"));
  } else {
    nav.classList.remove("sticky");
    texts.forEach((text) => text.classList.remove("sticky"));
  }
};

//js for slider

const slides = document.querySelectorAll(".slide");
const nextSlideBtn = document.querySelector("button .slider-btn.next_btn");
const prevSlideBtn = document.querySelector(".prev_btn");
const teamImg = document.querySelectorAll(".team_pic img");

let curSlide = 0;
let maxSlide = slides.length;

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(0);
// Active member
const activeMember = (slide) => {
  teamImg.forEach((img) => img.classList.remove("active"));
  teamImg[slide].classList.add("active");
};
const nextSlide = () => {
  curSlide === maxSlide - 1 ? (curSlide = 0) : curSlide++;
  goToSlide(curSlide);
  activeMember(curSlide);
};
teamImg.forEach((img, slide) =>
  img.addEventListener("click", () => {
    curSlide = slide;
    goToSlide(slide);
    activeMember(slide);
  })
);
const prevSlide = () => {
  curSlide === 0 ? (curSlide = maxSlide - 1) : curSlide--;
  goToSlide(curSlide);
};
setInterval(nextSlide, 5000);
// Adding Keydown events
document.addEventListener("keydown", (e) => {
  (e.key === "ArrowRight" && nextSlide()) ||
    (e.key === "ArrowLeft" && prevSlide());
});

//// JS for  Network Carrier Verification

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
const displayModal = (img) => {
  modal.classList.remove("hidden");
  backdrop.classList.remove("hidden");
  userName.textContents = `Dear ${inputName.value}`;
  userNumber.textContents = `Your Mobile Number is: ${inputNumber.value}`;
  networkName.textContents = `Your Network Provider is ${
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

  modalNetworkImg.src = networkImg.src =
    img === 0 ? `../img/${img + 1}.png` : `../img/${img + 1}.png`;
};

checkBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const check = Number(inputNumber.value);
  if (typeof check === "number") {
    errorText.classList.add("hidden");
  } else {
    errorText.classList.remove("hidden");
  }
  let num;
  const val = inputNumber.value;
  if (val.startsWith("0")) {
    num = val.substring(0, 4);
    inputNumber.maxLength = "11";
  } else if (val.startsWith("+234")) {
    num = "0" + val.substring(4, 7);
    inputNumber.setAttribute("maxlength", 14);
  }

  const networks = [mtn, airtel, glo, etisalat];
  networks.forEach((network, i) => {
    network.includes(num) ? displayModal(i) : null;
  });
  autoSuggestContainer.classList.add("hidden");
});

// Event Handlers
const closeAllModal = () => {
  modal.classList.add("hidden");
  backdrop.classList.add("hidden");
};
backdrop.addEventListener("click", closeAllModal);
document.addEventListener("keydown", (e) => {
  e.key === "Escape" && closeAllModal();
});

// js for auto suggest
const allNetworks = [...mtn, ...airtel, ...glo, ...etisalat];
const renderResults = (results) => {
  if (results.length === 0) {
    return autoSuggestContainer.classlist.add("hidden");
  }
  let contents = results
    .map((item) => {
      return `<li class='auto-lists>${item}</li>`;
    })
    .join("");

  autoSuggestContainer.classList.remove("hidden");
  autoSuggestContainer.innerHTML = `<ul >${contents}</ul>`;
};
inputNumber.addEventListener("keyup", () => {
  let results = [];
  let input = inputNumber.value;
  if (input.length) {
    results = allNetworks.filter((item) => {
      return item.includes(input);
    });
  }
  renderResults(results);
});

document.querySelectorAll(".auto-lists").forEach((result) => {
  result.addEventListener("click", () => {
    inputNumber.text = result;
    autoSuggestContainer.classList.add("hidden");
  });
});
