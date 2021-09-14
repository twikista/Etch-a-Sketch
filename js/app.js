//save the grid parent to a variable
const parent = document.querySelector(".parent");
//save the range slider to a variable
const slider = document.querySelector(".range-slider");
//variable that dsplays the value of the range slider
let sliderValue = document.querySelector(".slider-value");
//grab the btn parent element
const sliderBtn = document.querySelector(".slider-wrapper");
//set the value of default grid
const defaultGrid = 16;
// define custom grid
let customGrid = 0;

//function that implemements the functionalities of the sketch pad
function sketchPad() {
  createDefaultGrid();
  sliderCustomGrid();
  btnCustomGrid();
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
}

//create custome grid using slider values
function sliderCustomGrid() {
  slider.addEventListener("change", (e) => {
    customGrid = e.target.value;
    sliderValue.textContent = `${customGrid} x ${customGrid}`;
    console.log(customGrid);
    removeDefaultGrid();
    for (let i = 1; i <= customGrid ** 2; i++) {
      let div = document.createElement("div");
      // div.className = `div-${i}`;
      div.className = `grid`;
      parent.append(div);
    }
    gridLayout(customGrid, customGrid);
    console.log(customGrid);
  });
}

//increase or decrease gris using buttons
function btnCustomGrid() {
  sliderBtn.addEventListener("click", (e) => {
    const target = e.target;
    switch (target.className) {
      case "decrement-slider":
        slider.value--;
        customGrid = slider.value;
        sliderValue.textContent = `${customGrid} x ${customGrid}`;
        removeDefaultGrid();
        for (let i = 1; i <= customGrid ** 2; i++) {
          let div = document.createElement("div");
          // div.className = `div-${i}`;
          div.className = `grid`;
          parent.append(div);
          // console.log(slider.value);
        }
        break;
      case "increment-slider":
        slider.value++;
        customGrid = slider.value;
        sliderValue.textContent = `${customGrid} x ${customGrid}`;
        removeDefaultGrid();
        for (let i = 1; i <= customGrid ** 2; i++) {
          let div = document.createElement("div");
          // div.className = `div-${i}`;
          div.className = `grid`;
          parent.append(div);
          // console.log(slider.value);
        }

        break;
    }
    gridLayout(customGrid, customGrid);
    console.log(customGrid);

    console.log(slider.value);
  });
}

//remove existing grids prior to creating new grids

function removeDefaultGrid() {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//function that layout the sketch pad divs
function gridLayout(columnGrid, rowGrid) {
  parent.style.cssText = `display:grid;grid-template-columns:repeat(${columnGrid}, 1fr); grid-template-rows:repeat(${rowGrid}, 1fr)`;
}

function applyBlackColor() {
  //array that holds greyscale colors
  const black = "rgb(40,40,40)";
  //generate random numbers that lies within the index of greyscaleColors array
  // const randomNumber = Math.floor(Math.random() * greyscaleColors.length);
  //randomly select a color from greyscaleColors array
  // const greyscaleColor = greyscaleColors[randomNumber];
  return black;
}

//add mouseover event to change grid colors using event delegation
parent.addEventListener("mouseover", (e) => {
  const target = e.target;
  if (!target.classList.contains("grid")) return;
  target.style.backgroundColor = applyBlackColor();
});

sketchPad();
