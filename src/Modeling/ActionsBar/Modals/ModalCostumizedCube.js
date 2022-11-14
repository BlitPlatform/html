var modal = document.querySelector("#modal-cube");
var modalCancelBtn = document.querySelector(".modal-cancel-button-cube");
var modalOkBtn = document.querySelector(".modal-ok-button-cube");
$(".modal").draggable();

const nameInput = document.querySelector("#name-input-cube");
const xminInput = document.querySelector("#x-min-input");
const xmaxInput = document.querySelector("#x-max-input");
const yminInput = document.querySelector("#y-min-input");
const ymaxInput = document.querySelector("#y-max-input");
const zminInput = document.querySelector("#z-min-input");
const zmaxInput = document.querySelector("#z-max-input");
const materialInput = document.querySelector("#material-input-cube");

let cubeObj = {};

export async function openCubeModal(e) {
  cubeObj["name"] = "cube";
  cubeObj["xmin"] = 0;
  cubeObj["xmax"] = 1;
  cubeObj["ymin"] = 0;
  cubeObj["ymax"] = 1;
  cubeObj["zmin"] = 0;
  cubeObj["zmax"] = 1;
  cubeObj["material"] = "Default";
  e.preventDefault();
  var rect = e.target.getBoundingClientRect();
  modal.style.left = `${rect.left - rect.left / 2.7}px`;
  modal.style.top = `${rect.top + 40}px`;
  modal.classList.add("is-open");
  let promise = new Promise((resolve, reject) => {
    modalOkBtn.addEventListener("click", () => {
      resolve(cubeObj);
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
  nameInput.value = "cube";
  xminInput.value = 0;
  xmaxInput.value = 1;
  yminInput.value = 0;
  ymaxInput.value = 1;
  zminInput.value = 0;
  zmaxInput.value = 1;
  materialInput.value = "Default";
}

modalCancelBtn.addEventListener("click", closeModal);
modalOkBtn.addEventListener("click", submitFormHandler);

/* ------------------- Input Evenet Listener ---------------------- */

nameInput.addEventListener("change", updateNameInput);
xminInput.addEventListener("change", updateXminInput);
xmaxInput.addEventListener("change", updateXmaxInput);
yminInput.addEventListener("change", updateYminInput);
ymaxInput.addEventListener("change", updateYmaxInput);
zminInput.addEventListener("change", updateZminInput);
zmaxInput.addEventListener("change", updateZmaxInput);
materialInput.addEventListener("change", updateMaterialInput);

function updateNameInput(e) {
  cubeObj["name"] = e.target.value;
}

function updateXminInput(e) {
  cubeObj["xmin"] = e.target.value;
}
function updateXmaxInput(e) {
  cubeObj["xmax"] = e.target.value;
}

function updateYminInput(e) {
  cubeObj["ymin"] = e.target.value;
}
function updateYmaxInput(e) {
  cubeObj["ymax"] = e.target.value;
}

function updateZminInput(e) {
  cubeObj["zmin"] = e.target.value;
}
function updateZmaxInput(e) {
  cubeObj["zmax"] = e.target.value;
}

function updateMaterialInput(e) {
  cubeObj["material"] = e.target.value;
}
