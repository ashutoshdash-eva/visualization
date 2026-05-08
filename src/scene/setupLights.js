import * as THREE from 'three';
import { scene } from './setupScene';

export function setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 5);
    dirLight.position.set(500, 1000, 1000);
    scene.add(dirLight);
}