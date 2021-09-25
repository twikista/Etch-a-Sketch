//save the grid parent to a variable
const parent = document.querySelector(".sketch-pad");
//save the range slider to a variable
const slider = document.querySelector(".range-slider");
//variable that dsplays the value of the range slider
let sliderValue = document.querySelector(".display-number-of-grids");
//grab the btn parent element
const sliderBtn = document.querySelector(".slider-controls");
//set the value of default grid
const defaultGrid = 16;
// define custom grid
let customGrid = null;
let color = null;

//function that implemements the functionalities of the sketch pad
function sketchPad() {
  createDefaultGrid();
  sliderCustomGrid();
  btnCustomGrid();
  resetGrid();
}

//function that creates default number of divs in the sketch pad
function createDefaultGrid() {
  for (let i = 1; i <= defaultGrid ** 2; i++) {
    let div = document.createElement("div");
    div.className = `grid`;
    parent.append(div);
    sliderValue.textContent = `${defaultGrid} x ${defaultGrid}`;
  }
  gridLayout(defaultGrid, defaultGrid);
  customGrid = defaultGrid;
  pickColor();
}

//create custome grid using slider values
function sliderCustomGrid() {
  slider.addEventListener("change", (e) => {
    customGrid = e.target.value;
    sliderValue.textContent = `${customGrid} x ${customGrid}`;
    removeExistingGrid();
    for (let i = 1; i <= customGrid ** 2; i++) {
      let div = document.createElement("div");
      div.className = `grid`;
      parent.append(div);
    }
    gridLayout(customGrid, customGrid);
    pickColor();
  });
}

//increase or decrease sketch pad grids using buttons
function btnCustomGrid() {
  sliderBtn.addEventListener("click", (e) => {
    const target = e.target;
    switch (target.className) {
      case "decrement-slider":
        slider.value--;
        customGrid = slider.value;
        sliderValue.textContent = `${customGrid} x ${customGrid}`;
        removeExistingGrid();
        for (let i = 1; i <= customGrid ** 2; i++) {
          let div = document.createElement("div");
          div.className = `grid`;
          parent.append(div);
        }
        break;
      case "increment-slider":
        slider.value++;
        customGrid = slider.value;
        sliderValue.textContent = `${customGrid} x ${customGrid}`;
        removeExistingGrid();
        for (let i = 1; i <= customGrid ** 2; i++) {
          let div = document.createElement("div");
          div.className = `grid`;
          parent.append(div);
        }

        break;
    }
    gridLayout(customGrid, customGrid);
    pickColor();
  });
}

//remove existing grids prior to creating new grids

function removeExistingGrid() {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//function that layout the sketch pad divs
function gridLayout(columnGrid, rowGrid) {
  parent.style.cssText = `display:grid;grid-template-columns:repeat(${columnGrid}, 1fr); grid-template-rows:repeat(${rowGrid}, 1fr)`;
}

//create a function that resets sketch pad grids to default when reset button is clicked
function resetGrid() {
  const resetBtn = document.querySelector(".reset-grid-btn");
  resetBtn.addEventListener("click", (e) => {
    removeExistingGrid();
    createDefaultGrid();
    removeRandomColor();
    pickColor();
    slider.value = customGrid;
  });
}

function eraseGridColor() {
  const eraseBtn = document.querySelector(".erase-btn");
  eraseBtn.addEventListener("click", (e) => {
    removeRandomColor();
    color = "transparent";
    return color;
  });
}

function removeRandomColor() {
  if (random.classList.contains("rgb")) {
    random.classList.remove("rgb");
  }
}

function pickColor() {
  const colorPicker = document.querySelector("#color-picker");
  color = colorPicker.value;
  colorPicker.addEventListener("change", (e) => {
    removeRandomColor();
    color = colorPicker.value;
    colorPicker.style.backgroundColor = color;
    console.log(color);
    return color;
  });
}

const random = document.querySelector(".random-icon");

function addRGBClass() {
  random.addEventListener("click", (e) => {
    const target = e.target.closest("div");
    target.classList.add("rgb");
    console.log(target);
  });
}

addRGBClass();

function rgbColors() {
  const randomR = Math.floor(Math.random() * 256);
  const randomG = Math.floor(Math.random() * 256);
  const randomB = Math.floor(Math.random() * 256);
  color = `rgb(${randomR},${randomG},${randomB})`;
  console.log(color);
  return color;
}

function randomRgbColors() {
  if (random.classList.contains("rgb")) {
    color = rgbColors();
  }
  return color;
}

//add mouseover event to change grid colors using event delegation
parent.addEventListener("mouseover", (e) => {
  const target = e.target;
  console.log(target);
  if (!target.classList.contains("grid")) return;
  randomRgbColors();
  target.style.backgroundColor = color;
  console.log(color);
});

sketchPad();
eraseGridColor();
pickColor();
