import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { layout } from './layout';

export const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);

const { width, height } = layout;

// Orthographic camera so the technical drawing has no perspective distortion.
const frustumHeight = height;
const aspect = window.innerWidth / window.innerHeight;
const frustumWidth = frustumHeight * aspect;

export const camera = new THREE.OrthographicCamera(
    -frustumWidth / 2,
    frustumWidth / 2,
    frustumHeight / 2,
    -frustumHeight / 2,
    -100000,
    100000
);
camera.position.set(width / 2, height / 2, 1000);
camera.lookAt(width / 2, height / 2, 0);

export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(width / 2, height / 2, 0);
controls.mouseButtons = {
    LEFT: THREE.MOUSE.PAN,
    RIGHT: THREE.MOUSE.PAN,
};

export function startRenderLoop() {
    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
        controls.update();
    }
    animate();

    window.addEventListener('resize', () => {
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
    });
}
