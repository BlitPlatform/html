import {
  scene
} from "../../../index.js";
// import { frameCamera } from "../Scene/BabylonScene.js";
import createComponent from "../ObjectComponent/ObjectComponent.js";
import "./ModalCostumizedShape.js";
import {
  openModal
} from "./ModalCostumizedShape.js";
import {
  chooseMaterial
} from "../ObjectComponent/ContextMenu.js";

// var ListOfMeshes = {};

// Upload STL File ------------------------------------//
export function loadMesh(fileName, url, extension, s) {
  BABYLON.Scene;
  BABYLON.SceneLoader.ImportMesh(
      "",
      "",
      url,
      scene,
      function(newMeshes) {
          const mesh = newMeshes[0];
          mesh.name = fileName;
          mesh.id = fileName;
          mesh.scaling = new BABYLON.Vector3(s, s, s);
          mesh.rotation = new BABYLON.Vector3(0, 0, 0);
          mesh.position = new BABYLON.Vector3(0, 0, 0);
          mesh.material = new BABYLON.NormalMaterial("stlMaterial", scene);
          $(".empty-scene").remove();

          mesh.material = new BABYLON.NormalMaterial(fileName, scene);
          if (getNumberOfPickedMeshes() > 0) {
              mesh.visibility = 0.5;
          }
          const objectCompoenetContainer = createComponent(mesh, "meshIcon", scene);
          $(".sidebar-elements").append(objectCompoenetContainer);
          //frameCamera(1.5, mesh);

          actions.push({
              mesh: [url, mesh],
              meshId: fileName,
              action: "add",
              objectCompoenetContainer: objectCompoenetContainer,
              type: "mesh",
          });

          console.log(actions);
      },
      null,
      null,
      extension
  );
}
export function importSTLFile() {
  let input = document.createElement("input");
  input.type = "file";
  input.accept = ".stl";
  input.multiple = true;

  input.onchange = (_) => {
      let file = input.files[0];
      let fileName = file.name.split(".")[0];

      // let numberUploadedFiles = input.files.length;

      const ext = "." + file.name.split(".").pop().toLowerCase(); //ext|exts

      if (ext !== ".stl") {
          alert(ext + " file format is not supported! Please enter an STL File");
          return 0;
      } else {
          //   alert("you uploaded " + numberUploadedFiles + " files");
      }

      const url = URL.createObjectURL(file);
      loadMesh(fileName, url, ext, 1);
  };
  input.click();
}



export function generateMesh(x, y, z) {
  var materialGrid = new BABYLON.StandardMaterial(scene);
  materialGrid.alpha = 0.2;
  materialGrid.diffuseColor = new BABYLON.Color3(1.0, 1.0, 1.0);

  var lines;
  for (var i = 0; i < x.length; i++) {
      lines = BABYLON.MeshBuilder.CreateLines("lines", {
          points: [
              new BABYLON.Vector3(x[i], y[0], z[0]),
              new BABYLON.Vector3(x[i], y[0], z[z.length - 1]),
          ]
      });
      lines.material = materialGrid;
      lines = BABYLON.MeshBuilder.CreateLines("lines", {
          points: [
              new BABYLON.Vector3(x[i], y[0], z[0]),
              new BABYLON.Vector3(x[i], y[y.length - 1], z[0]),
          ]
      });
      lines.material = materialGrid;
      //   lines = BABYLON.MeshBuilder.CreateLines("lines", {
      //     points: [
      //         new BABYLON.Vector3(x[i], y[0], z[z.length - 1]),
      //         new BABYLON.Vector3(x[i], y[y.length - 1], z[z.length - 1]),
      //     ]
      // });
      // lines = BABYLON.MeshBuilder.CreateLines("lines", {
      //   points: [
      //       new BABYLON.Vector3(x[i], y[y.length - 1], z[0]),
      //       new BABYLON.Vector3(x[i], y[y.length - 1], z[z.length - 1]),
      //   ]
      // });

  }



  for (var i = 0; i < y.length; i++) {
      lines = BABYLON.MeshBuilder.CreateLines("lines", {
          points: [
              new BABYLON.Vector3(x[0], y[i], z[0]),
              new BABYLON.Vector3(x[0], y[i], z[z.length - 1]),
          ]
      });
      lines.material = materialGrid;
      lines = BABYLON.MeshBuilder.CreateLines("lines", {
          points: [
              new BABYLON.Vector3(x[0], y[i], z[0]),
              new BABYLON.Vector3(x[x.length - 1], y[i], z[0]),
          ]
      });
      lines.material = materialGrid;
      //   lines = BABYLON.MeshBuilder.CreateLines("lines", {
      //     points: [
      //         new BABYLON.Vector3(x[0], y[i], z[z.length - 1]),
      //         new BABYLON.Vector3(x[x.length - 1], y[i], z[z.length - 1]),
      //     ]
      // });
      // lines = BABYLON.MeshBuilder.CreateLines("lines", {
      //   points: [
      //       new BABYLON.Vector3(x[x.length - 1], y[i], z[0]),
      //       new BABYLON.Vector3(x[x.length - 1], y[i], z[z.length - 1]),
      //   ]
      // });
  }




  for (var i = 0; i < z.length; i++) {
      lines = BABYLON.MeshBuilder.CreateLines("lines", {
          width: 20,
          points: [
              new BABYLON.Vector3(x[0], y[0], z[i]),
              new BABYLON.Vector3(x[0], y[y.length - 1], z[i]),
          ]
      });
      lines.material = materialGrid;
      lines = BABYLON.MeshBuilder.CreateLines("lines", {
          points: [
              new BABYLON.Vector3(x[0], y[0], z[i]),
              new BABYLON.Vector3(x[x.length - 1], y[0], z[i]),
          ]
      });
      lines.material = materialGrid;
      //   lines = BABYLON.MeshBuilder.CreateLines("lines", {
      //     points: [
      //         new BABYLON.Vector3(x[0], y[y.length - 1], z[i]),
      //         new BABYLON.Vector3(x[x.length - 1], y[y.length - 1], z[i]),
      //     ]
      // });
      // lines = BABYLON.MeshBuilder.CreateLines("lines", {
      //   points: [
      //       new BABYLON.Vector3(x[x.length - 1], y[0], z[i]),
      //       new BABYLON.Vector3(x[x.length - 1], y[y.length - 1], z[i]),
      //   ]
      // });
  }


}




// Create Shapes : Sphere, Cube, Cylinder --------------//
export function createShape(meshType, buttonsClicks, cubeObj) {
  let mesh;
  let objectCompoenetContainer;
  switch (meshType) {
      case "sphere":
          mesh = BABYLON.MeshBuilder.CreateSphere(
              meshType + buttonsClicks, {},
              scene
          );

          mesh.material = new BABYLON.NormalMaterial(meshType, scene);

          sphereButtonClicks += 1;
          objectCompoenetContainer = createComponent(mesh, "sphereIcon", scene);

          break;
      case "cube":
          mesh = BABYLON.MeshBuilder.CreateBox(cubeObj.name, {}, scene);
          mesh.position.x = cubeObj.xmin;
          mesh.position.y = cubeObj.ymin;
          mesh.position.z = cubeObj.zmin;
          mesh.scaling.x = cubeObj.xmax - cubeObj.xmin;
          mesh.scaling.y = cubeObj.ymax - cubeObj.ymin;
          mesh.scaling.z = cubeObj.zmax - cubeObj.zmin;
          mesh.material = chooseMaterial(cubeObj.material, scene);
          console.log(mesh);

          //frameCamera(1.5, mesh);

          cubeButtonClicks += 1;
          objectCompoenetContainer = createComponent(mesh, "cubeIcon", scene);
          break;

      case "cylinder":
          mesh = BABYLON.MeshBuilder.CreateCylinder(
              meshType + buttonsClicks, {},
              scene
          );
          cylinderButtonClicks += 1;
          mesh.material = new BABYLON.NormalMaterial(meshType, scene);
          objectCompoenetContainer = createComponent(mesh, "cylinderIcon", scene);
          break;
      default:
          console.log("default");
  }
  $(".sidebar-elements").append(objectCompoenetContainer);

  actions.push({
      mesh: mesh,
      meshId: buttonsClicks,
      action: "add",
      objectCompoenetContainer: objectCompoenetContainer,
      type: meshType,
  });

  console.log(actions);

  buttonsClicks = buttonsClicks + 1;
  if (getNumberOfPickedMeshes() > 0) {
      mesh.visibility = 0.5;
  }
  return mesh;
}

// function showSpehreModal() {
//   alert("sphere modal");
// }

const addCube = (e) => {
  openModal(e).then(
      (resolve) => {
          $(".empty-scene").remove();
          let cubeObj = resolve;
          createShape("cube", cubeButtonClicks, cubeObj);
      },
      (reject) => {
          console.log(reject);
      }
  );
};

const viewMesh = (e) => {
  //var x = [-82, -78, -74, -70, -66, -62, -58, -54, -50, -46, -42, -38, -34, -30, -25.77073070445, -21.5414614089, -18.078858519, -15.6055707405, -12.1429678506, -8.8214839253, -5.5, -1.23489206508667, 3.03021586982666, 7.29532380474, 12.1429678506, 15.6055707405, 18.078858519, 21.5414614089, 25.77073070445, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70, 74, 78, 82];
  //var y = [-82, -78, -74, -70, -66, -62, -58, -54, -50, -46, -42, -38, -34, -30, -26.1669292595, -22.333858519, -19.8605707405, -16.3979678506, -12.0589839253, -7.72, -3.8, -1, 1, 3.8, 7.72, 12.0589839253, 16.3979678506, 19.8605707405, 22.333858519, 26.1669292595, 30, 34, 38, 42, 46, 50, 54, 58, 62, 66, 70, 74, 78, 82];
  //var z = [-42.2905408, -38.5667232, -34.8429056, -31.119088, -27.3952704, -23.6714528, -19.9476352, -16.2238176, -12.5, -8.7761824, -7.53490986666667, -6.29363733333333, -5.0523648, -3.100832, -1.70688, -0.7112, 0, 0.508, 1.016, 1.524, 2.2352, 3.23088, 4.624832, 6.5763648, 9.30851072, 13.133515008, 17.0890100053333, 21.0445050026667, 25, 28.9554949973333, 32.9109899946667, 36.866484992, 40.8219799893333, 44.7774749866667, 48.732969984, 52.6884649813333, 56.6439599786667];

  var x = [-93.709, -88.956, -84.202, -79.448, -74.695, -69.941, -65.187, -60.434, -55.68, -50.926, -46.173, -41.419, -36.666, -36.11, -35.555, -35.0, -34.445, -33.89, -33.334, -31.008, -28.682, -26.356, -25.8, -25.245, -24.69, -24.135, -23.58, -23.024, -19.877, -16.73, -13.582, -10.435, -7.288, -4.141, -3.585, -3.03, -2.475, -1.92, -1.11, -0.555, 0.0, 0.555, 1.11, 1.666, 2.475, 3.03, 3.585, 4.141, 7.288, 10.435, 13.582, 16.73, 19.877, 23.024, 23.58, 24.135, 24.69, 25.245, 25.8, 26.356, 28.682, 31.008, 33.334, 33.89, 34.445, 35.0, 35.555, 36.11, 36.666, 41.419, 46.173, 50.926, 55.68, 60.434, 65.187, 69.941, 74.695, 79.448, 84.202, 88.956, 93.709];
  var y = [-93.709, -88.956, -84.202, -79.448, -74.695, -69.941, -65.187, -60.434, -55.68, -50.926, -46.173, -41.419, -36.666, -36.11, -35.555, -35.0, -34.445, -33.89, -33.334, -30.582, -27.83, -25.078, -22.326, -21.77, -21.215, -20.66, -20.105, -19.55, -18.994, -15.829, -12.663, -9.497, -6.331, -3.166, 0.0, 3.166, 6.331, 9.497, 12.663, 15.829, 18.994, 19.55, 20.105, 20.66, 21.215, 21.77, 22.326, 25.078, 27.83, 30.582, 33.334, 33.89, 34.445, 35.0, 35.555, 36.11, 36.666, 41.419, 46.173, 50.926, 55.68, 60.434, 65.187, 69.941, 74.695, 79.448, 84.202, 88.956, 93.709];
  var z = [-58.727, -53.973, -49.22, -44.466, -39.712, -34.959, -30.205, -25.451, -20.698, -15.944, -11.19, -6.437, -1.683, -1.128, -0.573, 0.0, 0.507, 1.062, 1.6, 2.173, 2.728, 3.283, 8.037, 12.79, 17.544, 22.298, 27.051, 31.805, 36.559, 41.312, 46.066, 50.82, 55.573, 60.327];

  generateMesh(x, y, z);
}


var addSphereBtn = document.querySelector("#Mesh-anchor");
addSphereBtn.addEventListener("click", viewMesh);

var addCubeBtn = document.querySelector("#cube-button");
addCubeBtn.addEventListener("click", addCube);

$(document).ready(function() {
  // $("#sphere-button").click(function () {
  //   // showSpehreModal();
  //   createShape("sphere", sphereButtonClicks);
  // });

  // $("#cube-button").click(function () {
  //   $(".empty-scene").remove();
  //   createShape("cube", cubeButtonClicks);
  // });

  // $("#cylinder-button").click(function () {
  //   $(".empty-scene").remove();
  //   createShape("cylinder", cylinderButtonClicks);
  // });

  $(".upload-button").click(function() {
      importSTLFile();
  });
});

export function getNumberOfPickedMeshes() {
  var numberOfPickedMeshes = 0;
  scene.meshes.forEach((mesh) => {
      if (mesh.showBoundingBox) {
          numberOfPickedMeshes += 1;
      }
  });
  return numberOfPickedMeshes;
}