const GridSize = 600;
const initialValue = 16;

const sketchArea = document.querySelector("#sketch-container");
const sliderContainer = document.querySelector("#slider-container");
const slider = document.querySelector(".slider");
const sliderValue = document.querySelector("#slider-value");
const gridToggle = document.querySelector("#grid-toggle");
const eraser = document.querySelector("#eraserBtn");
const penBtn = document.querySelector("#penBtn");
const randomBtn = document.querySelector("#randomBtn");
const resetBtn = document.querySelector("#resetBtn");
const iconContainer = document.querySelector("#icon-container");

let gridVisibility = true;
gridToggle.style.color = "green";
function toggleGrid() {
  gridVisibility = !gridVisibility;
  gridToggle.style.color = gridVisibility ? "green" : "";
  sketchArea.classList.toggle("no-borders", !gridVisibility);
}
gridToggle.addEventListener("click", toggleGrid);

let currentColor = "black";
let isRainbowMode = false;
eraser.addEventListener("click", () => {
  isRainbowMode = false;
  currentColor = "white";
});
penBtn.addEventListener("click", () => {
  isRainbowMode = false;
  currentColor = "black";
});
randomBtn.addEventListener("click", () => {
  isRainbowMode = true;
});
function applyColor(target) {
  if (isRainbowMode) {
    target.style.backgroundColor = `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`;
  } else {
    target.style.backgroundColor = currentColor;
  }
}
resetBtn.addEventListener("click", () => {
  removeGridCells();
  createGridCells(slider.value);
});

sliderValue.textContent = `${slider.value} x ${slider.value} (Resolution)`;
sketchArea.style.height = `${GridSize}px`;
sketchArea.style.width = `${GridSize}px`;
function createGridCells(value) {
  let squaredValue = value * value;
  for (let i = 0; i < squaredValue; i++) {
    const cells = document.createElement("div");
    cells.style.width = `${GridSize / value}px`;
    cells.style.height = `${GridSize / value}px`;
    cells.classList.add("cell");
    currentColor = "black";
    sketchArea.appendChild(cells);
  }
  sketchArea.classList.toggle("no-borders", !gridVisibility);
}
createGridCells(initialValue);

function removeGridCells() {
  while (sketchArea.firstChild) {
    sketchArea.removeChild(sketchArea.firstChild);
  }
}

let isDrawing = false;
document.addEventListener("mousedown", () => (isDrawing = true));
document.addEventListener("mouseup", () => (isDrawing = false));
sketchArea.addEventListener("dragstart", (e) => {
  e.preventDefault();
});
sketchArea.addEventListener("mouseover", (e) => {
  if (isDrawing && e.target.classList.contains("cell")) {
    applyColor(e.target);
  }
});
sketchArea.addEventListener("mousedown", (e) => {
  if (e.target.classList.contains("cell")) {
    applyColor(e.target);
  }
});

slider.oninput = function () {
  let txt = `${this.value} x ${this.value} (Resolution)`;
  sliderValue.innerHTML = txt;
  rangeValue = this.value;
  removeGridCells();
  createGridCells(rangeValue);
};

let prevButton = null;
iconContainer.addEventListener("click", (e) => {
  const button = e.target.closest("button");
  if (!button) return;
  if (prevButton !== null) {
    prevButton.classList.remove("active");
  }
  button.classList.add("active");
  prevButton = button;
});
// fix active button state