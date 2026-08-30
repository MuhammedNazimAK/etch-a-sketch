const GridSize = 600;
const rows = 16;
const cols = 16;

const sketchArea = document.querySelector("#sketch-container");
const sliderContainer = document.querySelector("#slider-container");
const slider = document.querySelector("#slider");
const sliderValue = document.querySelector("#slider-value");

sliderValue.textContent = `${slider.value} x ${slider.value} (Resolution)`;
sketchArea.style.height = `${GridSize}px`;
sketchArea.style.width = `${GridSize}px`;

function createGridCells () {
    for (let i = 0; i < (rows * cols); i++) {
        const cells = document.createElement("div");
        cells.style.width = `${GridSize / cols}px`;
        cells.style.height = `${GridSize / rows}px`;
        cells.classList.add("cell");

        sketchArea.appendChild(cells);
    }
}
sketchArea.addEventListener("mouseover", (e) => {
    if (e.target.classList.contains("cell")) {
        e.target.style.backgroundColor = "black";
    }
});

createGridCells(sliderValue);