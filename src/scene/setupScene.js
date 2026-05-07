import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export function createScene() {
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#f0f0f0');
    return scene;
}

export function createCamera() {
    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
    );

    camera.position.set(251, 331, 487);
    return camera;
}

export function createRenderer() {
    const renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(window.innerWidth,window.innerHeight);
    document.body.appendChild(renderer.domElement);
    return renderer;
}

export function createControls(camera,renderer){
    const controls = new OrbitControls(camera,renderer.domElement);
    controls.enableDamping=true;
    return controls;
}