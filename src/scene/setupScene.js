import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { state } from '../utils/constants';
import { EXRLoader } from 'three/examples/jsm/Addons.js';

export const scene = new THREE.Scene();
scene.background = new THREE.Color('#f0f0f0');

export const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    10000
);

camera.position.set(251, 331, 487);

export const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.7;
document.body.appendChild(renderer.domElement);

const exrLoader = new EXRLoader();

exrLoader.load(
    '/texture/DaySkyHDRI059B_4K_HDR.exr',
    (texture) => {
        texture.mapping = THREE.EquirectangularReflectionMapping;
        scene.environment = texture;
        scene.background = texture;
    },
    undefined,
    (err) => console.error('Failed to load EXR environment map', err)
);

export const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(state.width / 2, state.height / 2, 0);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
