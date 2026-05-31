import * as THREE from 'three';
import { scene } from './setupScene';

export function setupLights() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 5);
    directionalLight.position.set(500, 800, 1000);
    scene.add(directionalLight);
}
