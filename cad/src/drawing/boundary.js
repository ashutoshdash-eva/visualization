import * as THREE from 'three';
import { scene } from '../scene';
import { layout } from '../layout';

// The double rectangle border around the whole sheet.
export function createDoubleBoundary() {
    const { width, height } = layout;
    const margin = width * 0.005;

    const outerPoints = [
        new THREE.Vector3(-margin, -margin, 0),
        new THREE.Vector3(width + margin, -margin, 0),
        new THREE.Vector3(width + margin, height + margin, 0),
        new THREE.Vector3(-margin, height + margin, 0),
        new THREE.Vector3(-margin, -margin, 0),
    ];
    const innerPoints = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(width, 0, 0),
        new THREE.Vector3(width, height, 0),
        new THREE.Vector3(0, height, 0),
        new THREE.Vector3(0, 0, 0),
    ];

    const material = new THREE.LineBasicMaterial({ color: '#000000' });
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(outerPoints), material));
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(innerPoints), material));
}
