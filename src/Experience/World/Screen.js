import * as THREE from "three";
import Experience from "../Experience.js";

export default class Screen {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.scene = this.experience.scene;
    this.world = this.experience.world;
    this.time = this.experience.time;

    this.setModel();
  }

  setModel() {
    this.height = 9.98 / 4;
    this.width = 9.98;

    // // canvas texture
    // this.canvas = document.createElement("canvas");
    // this.context = this.canvas.getContext("2d");
    // this.canvas.width = 2 ** 9;
    // this.canvas.height = 2 ** 7;
    // this.pixelPerMeter = this.canvas.width / this.width;
    // this.texture = new THREE.CanvasTexture(this.canvas);

    // texture
    this.texture = this.resources.items.screenTexture;

    // model
    this.modelGeo = new THREE.PlaneGeometry(this.width, this.height);
    this.modelMat = new THREE.MeshStandardMaterial({
      color: "grey",
      map: this.texture,
      side: THREE.DoubleSide,
    });
    this.model = new THREE.Mesh(this.modelGeo, this.modelMat);
    this.model.translateZ(4);
    this.model.rotateY(Math.PI);

    this.scene.add(this.model);
  }

  update() {
    // // canvas
    // this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    // this.context.fillStyle = "grey";
    // this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    // // this.context.fillStyle = "white";
    // // this.context.textAlign = "center";
    // // this.context.font = "32px serif";
    // // this.context.fillText(
    // //   "ฉาก",
    // //   this.canvas.width / 2,
    // //   0.3 * this.canvas.height
    // // );
    // this.texture.needsUpdate = true;
  }
}
