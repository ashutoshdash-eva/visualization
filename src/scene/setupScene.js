import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { height, width } from '../utils/constants';
import { EXRLoader } from 'three/examples/jsm/Addons.js';
import { texture } from 'three/tsl';

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
renderer.toneMapping=THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.7;
document.body.appendChild(renderer.domElement);

const exrloader = new EXRLoader();

exrloader.load('/texture/DaySkyHDRI059B_4K_HDR.exr',(texture)=>{
    texture.mapping=THREE.EquirectangularReflectionMapping;
    scene.environment=texture;
    scene.background=texture;
})

export const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(width / 2, height / 2, 0);

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

