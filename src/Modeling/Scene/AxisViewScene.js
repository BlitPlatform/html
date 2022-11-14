export function createAxisViewScene(canvas, engine) {
  const scene = new BABYLON.Scene(engine);
  scene.autoClear = false;
  scene.autoClearDepthAndStencil = true;
  scene.blockMaterialDirtyMechanism = true;

  const ambient = new BABYLON.HemisphericLight(
    "ambient",
    new BABYLON.Vector3(0, -1, 0),
    scene
  );
  ambient.diffuse = new BABYLON.Color3(1, 1, 1);
  ambient.groundColor = new BABYLON.Color3(1, 1, 1);
  ambient.intensity = 1;

  const camera = new BABYLON.ArcRotateCamera(
    "camera",
    0,
    0,
    10,
    BABYLON.Vector3.Zero(),
    scene
  );
  camera.viewport = updateViewport(200, 200, 0, 0, canvas);
  camera.radius = 4.5;

  const cube = BABYLON.MeshBuilder.CreateBox("viewcube", { size: 1 }, scene);
  cube.material = new BABYLON.NormalMaterial("viewcube", scene);
  cube.edgesWidth = 0;
  cube.edgesColor = BABYLON.Color4.FromHexString("#00000090");
  cube.enableEdgesRendering();
  cube.material.backFaceCulling = true;
  cube.material.alpha = 0;
  cube.material.freeze();
  cube.doNotSyncBoundingInfo = true;

  cube.convertToUnIndexedMesh(); // after edgesRendering
  cube.freezeWorldMatrix();
  cube.freezeNormals();

  var size = 3;
  var position = 1.3;

  var makeTextPlane = function (text, color, size) {
    var dynamicTexture = new BABYLON.DynamicTexture(
      "DynamicTexture",
      50,
      scene,
      true
    );
    dynamicTexture.hasAlpha = true;
    dynamicTexture.drawText(
      text,
      5,
      50,
      "bold 70px Arial",
      color,
      "transparent",
      true
    );
    var plane = new BABYLON.Mesh.CreatePlane("TextPlane", size, scene, true);
    plane.material = new BABYLON.StandardMaterial("TextPlaneMaterial", scene);
    plane.material.backFaceCulling = false;
    // plane.material.specularColor = new BABYLON.Color3(0, 0, 0);
    plane.material.diffuseTexture = dynamicTexture;
    return plane;
  };

  var xChar = makeTextPlane("X", "red", size / 10);
  xChar.position = new BABYLON.Vector3(0.9 * position, -0.05 * position, 0);

  var yChar = makeTextPlane("Y", "green", size / 10);
  yChar.position = new BABYLON.Vector3(0, 0.9 * position, -0.05 * position);

  var zChar = makeTextPlane("Z", "blue", size / 10);
  zChar.position = new BABYLON.Vector3(0, 0.05 * position, 0.9 * position);

  const axes = new BABYLON.AxesViewer(scene, 0.8);
  axes.xAxis.parent = cube;
  axes.yAxis.parent = cube;
  axes.zAxis.parent = cube;

  return scene;
}

function updateViewport(w, h, bottom, right, canvas) {
  return new BABYLON.Viewport(
    1 - (w + right) / canvas.width,
    1 - (bottom + canvas.height) / canvas.height,
    w / canvas.width,
    h / canvas.height
  );
}

export function updateAxisViewViewport(axisViewScene, canvas) {
  axisViewScene.activeCamera.viewport = updateViewport(200, 200, 0, 0, canvas);
}
