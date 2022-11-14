var modal = document.querySelector("#modal-sphere");
var modalCancelBtn = document.querySelector(".modal-cancel-button-sphere");
var modalOkBtn = document.querySelector(".modal-ok-button-sphere");

const nameInput = document.querySelector("#name-input-sphere");
const diameter = document.querySelector("#diameter-sphere-input");
const xDiameter = document.querySelector("#x-diameter-sphere-input");
const yDiameter = document.querySelector("#y-diameter-sphere-input");
const zDiameter = document.querySelector("#z-diameter-sphere-input");
const segment = document.querySelector("#segment-sphere-input");
const materialInput = document.querySelector("#material-input-sphere");

let sphereObj = {};

export async function openSphereModal(e) {
  sphereObj["name"] = "sphere";
  sphereObj["diameter"] = 1;
  sphereObj["xDiameter"] = 1;
  sphereObj["yDiameter"] = 1;
  sphereObj["zDiameter"] = 1;
  sphereObj["segment"] = 32;
  sphereObj["material"] = "Default";
  e.preventDefault();
  var rect = e.target.getBoundingClientRect();
  modal.style.left = `${rect.left - rect.left / 2.7}px`;
  modal.style.top = `${rect.top + 40}px`;
  modal.classList.add("is-open");
  let promise = new Promise((resolve, reject) => {
    modalOkBtn.addEventListener("click", () => {
      resolve(sphereObj);
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
  nameInput.value = "sphere";
  diameter.value = 1;
  xDiameter.value = 1;
  yDiameter.value = 1;
  zDiameter.value = 1;
  segment.value = 32;
  materialInput.value = "Default";
}

modalCancelBtn.addEventListener("click", closeModal);
modalOkBtn.addEventListener("click", submitFormHandler);

/* ------------------- Input Evenet Listener ---------------------- */

nameInput.addEventListener("change", updateNameInput);
diameter.addEventListener("change", updateDiameter);
xDiameter.addEventListener("change", updateXdiameter);
yDiameter.addEventListener("change", updateYdiameter);
zDiameter.addEventListener("change", updateZdiameter);
segment.addEventListener("change", updateSegmentInput);
materialInput.addEventListener("change", updateMaterialInput);

function updateNameInput(e) {
  sphereObj["name"] = e.target.value;
}

function updateDiameter(e) {
  sphereObj["diameter"] = parseFloat(e.target.value);
  console.log(e.target.value);
  xDiameter.value = parseFloat(e.target.value);
  yDiameter.value = parseFloat(e.target.value);
  zDiameter.value = parseFloat(e.target.value);
  sphereObj["xDiameter"] = parseFloat(e.target.value);
  sphereObj["yDiameter"] = parseFloat(e.target.value);
  sphereObj["zDiameter"] = parseFloat(e.target.value);
}
function updateXdiameter(e) {
  sphereObj["xDiameter"] = parseFloat(e.target.value);
}

function updateYdiameter(e) {
  sphereObj["yDiameter"] = parseFloat(e.target.value);
}
function updateZdiameter(e) {
  sphereObj["zDiameter"] = parseFloat(e.target.value);
}

function updateSegmentInput(e) {
  sphereObj["segment"] = parseInt(e.target.value);
  console.log(typeof sphereObj["segment"]);
}

function updateMaterialInput(e) {
  sphereObj["material"] = e.target.value;
}
