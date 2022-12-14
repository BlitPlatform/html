import { createShape, loadMesh } from "../ActionsBar/Create/CreateActions.js";
import { actions, undos, scene } from "../../../index.js";

export function decrementCounter(meshType) {
  switch (meshType) {
    case "sphere":
      sphereButtonClicks--;
      break;
    case "cube":
      cubeButtonClicks--;
      break;

    case "cylinder":
      cubeButtonClicks--;
      break;
  }
}

$(document).ready(function () {
  // CTRL Z
  document.addEventListener("keydown", (e) => {
    if (e.key === "z" && e.ctrlKey) {
      // if List of actions is empty
      if (!actions.length) {
        return;
      }

      let actionObj = actions[actions.length - 1];
      switch (actionObj.action) {
        case "add":
          undos.unshift(actionObj);
          $("#" + actionObj.objectCompoenetContainer.id).remove();
          if (actionObj.type === "mesh") {
            actionObj.mesh[1].dispose();
          } else {
            actionObj.mesh.dispose();
            decrementCounter(actionObj.type);
          }
          actions.splice(actions.length - 1, 1);
          console.log("Undos List : ", undos);
          break;
        case "delete":
          undos.unshift(actionObj);
          actions.splice(actions.length - 1, 1);
          if (actionObj.type === "mesh") {
            loadMesh(actionObj.meshId, actionObj.mesh[0], "stl", 1);
          } else {
            const meshType = actionObj.type;
            const meshId = actionObj.meshId;
            createShape(meshType, meshId);
          }
          break;
        case "transform":
          undos.unshift(actionObj);

          actionObj.PreviousPositions.forEach((prv) => {
            console.log(scene.getMeshById(prv.meshId));
            let mesh = scene.getMeshById(prv.meshId);
            console.log(actionObj.type);
            mesh[actionObj.type].x = prv.x;
            mesh[actionObj.type].y = prv.y;
            mesh[actionObj.type].z = prv.z;
          });
          actions.splice(actions.length - 1, 1);
          console.log("Undos List : ", undos);
          console.log("Redos List : ", actions);
          break;
        default:
          console.log("default");
          break;
      }
      console.log(actions);

      // Reset Counter
      if (!actions.length) {
        if (scene.meshes == 0) {
          const emptyScene = document.createElement("p");
          emptyScene.className = "empty-scene";
          emptyScene.innerText = "Empty Scene";
          $(".sidebar-elements").append(emptyScene);
        }
        sphereButtonClicks = 0;
        cubeButtonClicks = 0;
        cylinderButtonClicks = 0;
        return;
      }
    }
  });
});
