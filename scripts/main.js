let gallery = document.getElementById("gallery-container");
let scrollContainer = document.querySelector(".gallery");
let cards = document.querySelectorAll(".card3d");
let modalDataDiv = document.getElementById("modal-data");

gallery.addEventListener("mousemove", mouseMove);

function Card3D(card, ev) {
  let img = card.querySelector("img");
  let imgRect = card.getBoundingClientRect();
  let width = imgRect.width;
  let height = imgRect.height;
  let mouseX = ev.offsetX;
  let mouseY = ev.offsetY;
  let rotateY = map(mouseX, 0, width, -25, 35);
  let rotateX = map(mouseY, 0, height, 20, -30);
  let brightness = map(mouseY, 0, height, 1.5, 0.5);
  let blur = map(mouseY, 0, height, 0, 1);

  img.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  img.style.filter = `brightness(${brightness}) saturate(${brightness * 100}%)`;
  // img.style.filter = `blur(${blur}px)`;
}

function map(val, minA, maxA, minB, maxB) {
  return minB + ((val - minA) * (maxB - minB)) / (maxA - minA);
}

cards.forEach((card) => {
  card.addEventListener("mousemove", (ev) => {
    Card3D(card, ev);
  });

  card.addEventListener("mouseleave", (ev) => {
    let img = card.querySelector("img");

    img.style.transform = "rotateX(0deg) rotateY(0deg)";
    img.style.filter = "brightness(1)";
    img.style.filter = "blur(0px)";
  });
});

scrollContainer.addEventListener("wheel", (evt) => {
  evt.preventDefault();
  scrollContainer.scrollLeft += evt.deltaY;
});

var modal = document.getElementById("myModal");
var btn = document.getElementById("myBtn");
var span = document.getElementsByClassName("close")[0];


function showModal() {
  modal.style.display = "block";
}

function showModal(id) {
  displayProject(id);
  modal.style.display = "block";
}

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

loadProjects();