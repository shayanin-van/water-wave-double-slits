import * as THREE from "three";
import Experience from "../Experience.js";
import mainVertex from "../../Shaders/water/mainVertex.glsl";
import mainFragment from "../../Shaders/water/mainFragment.glsl";
import inVertex from "../../Shaders/water/inVertex.glsl";
import inFragment from "../../Shaders/water/inFragment.glsl";

export default class Water {
  constructor() {
    this.experience = new Experience();
    this.resources = this.experience.resources;
    this.scene = this.experience.scene;
    this.world = this.experience.world;
    this.time = this.experience.time;

    // Resource
    this.resource = this.resources.items.slitsModel;

    this.setMainSurface();
    this.setInSurface();
    this.setSlit();

    // axes helper (for dev purpose)
    // this.axis = new THREE.AxesHelper(10);
    // this.scene.add(this.axis);
  }

  setMainSurface() {
    this.mainSurfaceGeo = new THREE.PlaneGeometry(9.98, 8, 128, 102);
    this.mainSurfaceMat = new THREE.ShaderMaterial({
      vertexShader: mainVertex,
      fragmentShader: mainFragment,
      wireframe: true,
      uniforms: {
        uTime: { value: 0 },
      },
    });
    this.mainSurfaceModel = new THREE.Mesh(
      this.mainSurfaceGeo,
      this.mainSurfaceMat
    );
    this.mainSurfaceModel.rotateX(-Math.PI / 2);

    this.scene.add(this.mainSurfaceModel);
  }

  setInSurface() {
    this.inSurfaceGeo = new THREE.PlaneGeometry(9.98, 3, 128, 38);
    this.inSurfaceMat = new THREE.ShaderMaterial({
      vertexShader: inVertex,
      fragmentShader: inFragment,
      wireframe: true,
      uniforms: {
        uTime: { value: 0 },
      },
    });
    this.inSurfaceModel = new THREE.Mesh(this.inSurfaceGeo, this.inSurfaceMat);
    this.inSurfaceModel.translateZ(-5.5);
    this.inSurfaceModel.rotateX(-Math.PI / 2);

    this.scene.add(this.inSurfaceModel);
  }

  setSlit() {
    this.resource.scene.traverse((child) => {
      if (child.name === "slits") {
        this.slitsModel = child;
      }
    });

    this.scene.add(this.slitsModel);
  }

  update() {
    // water surface
    this.mainSurfaceMat.uniforms.uTime.value = this.time.elapsed;
    this.inSurfaceMat.uniforms.uTime.value = this.time.elapsed;
  }
}
