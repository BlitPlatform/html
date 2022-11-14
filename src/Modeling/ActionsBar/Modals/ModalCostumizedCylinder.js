var modal = document.querySelector("#modal-cylinder");
var modalCancelBtn = document.querySelector(".modal-cancel-button-cylinder");
var modalOkBtn = document.querySelector(".modal-ok-button-cylinder");

const nameInput = document.querySelector("#name-input-sphere");
const height = document.querySelector("#height-cylinder-input");
const diameter = document.querySelector("#diameter-cylinder-input");
const topDiameter = document.querySelector("#top-diameter-cylinder-input");
const bottomDiameter = document.querySelector(
  "#bottom-diameter-cylinder-input"
);
const tesselation = document.querySelector("#tesselation-cylinder-input");
const subdivisions = document.querySelector("#subdivisions-cylinder-input");
const materialInput = document.querySelector("#material-input-sphere");

let cylinderObj = {};

export async function openCylinderModal(e) {
  cylinderObj["name"] = "cylinder";
  cylinderObj["height"] = 2;
  cylinderObj["diameter"] = 1;
  cylinderObj["topDiameter"] = 1;
  cylinderObj["bottomDiameter"] = 1;
  cylinderObj["tesselation"] = 24;
  cylinderObj["sibdivisions"] = 1;
  cylinderObj["material"] = "Default";
  e.preventDefault();
  var rect = e.target.getBoundingClientRect();
  modal.style.left = `${rect.left - rect.left / 2.7}px`;
  modal.style.top = `${rect.top + 40}px`;
  modal.classList.add("is-open");
  let promise = new Promise((resolve, reject) => {
    modalOkBtn.addEventListener("click", () => {
      resolve(cylinderObj);
    });
    modalCancelBtn.addEventListener("click", () =>
      reject("user cancel action")
    );
  });

  await promise;
  return promise;
}

function closeModal(e) {
  modal.classList.remove("is-open");
  setTimeout(clearInputsField, 1000);
}

function submitFormHandler() {
  modal.classList.remove("is-open");
  setTimeout(clearInputsField, 1000);
}

function clearInputsField() {
  nameInput.value = "cylinder";
  height.value = 2;
  diameter.value = 1;
  topDiameter.value = 1;
  bottomDiameter.value = 1;
  tesselation.value = 24;
  subdivisions.value = 1;
  materialInput.value = "Default";
}

modalCancelBtn.addEventListener("click", closeModal);
modalOkBtn.addEventListener("click", submitFormHandler);

/* ------------------- Input Evenet Listener ---------------------- */

nameInput.addEventListener("change", updateNameInput);
height.addEventListener("change", updateHeightInput);
diameter.addEventListener("change", updateDiameterInput);
topDiameter.addEventListener("change", updateTopDiameterInput);
bottomDiameter.addEventListener("change", updateBottomDiameterInput);
tesselation.addEventListener("change", updateTesselationInput);
subdivisions.addEventListener("change", updateSubdivisionsInput);
materialInput.addEventListener("change", updateMaterialInput);

function updateNameInput(e) {
  cylinderObj["name"] = e.target.value;
}

function updateHeightInput(e) {
  cylinderObj["height"] = parseFloat(e.target.value);
}

function updateDiameterInput(e) {
  cylinderObj["diameter"] = parseFloat(e.target.value);
  topDiameter.value = parseFloat(e.target.value);
  bottomDiameter.value = parseFloat(e.target.value);
  cylinderObj["topDiameter"] = parseFloat(e.target.value);
  cylinderObj["bottomDiameter"] = parseFloat(e.target.value);
}
function updateTopDiameterInput(e) {
  cylinderObj["topDiameter"] = parseFloat(e.target.value);
}

function updateBottomDiameterInput(e) {
  cylinderObj["bottomDiameter"] = parseFloat(e.target.value);
}
function updateTesselationInput(e) {
  cylinderObj["tesselation"] = parseFloat(e.target.value);
}

function updateSubdivisionsInput(e) {
  cylinderObj["subdivisions"] = parseFloat(e.target.value);
}

function updateMaterialInput(e) {
  cylinderObj["material"] = e.target.value;
}
