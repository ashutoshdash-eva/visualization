import * as THREE from 'three';
import { scene } from '../scene/setupScene';
import { state, offset, frameW, beadW, COLORS } from '../utils/constants';

let glassMesh;

function disposeGlass() {
    if (!glassMesh) return;
    scene.remove(glassMesh);
    glassMesh.geometry?.dispose();
    glassMesh.material?.dispose();
    glassMesh.children.forEach(child => {
        child.geometry?.dispose();
        child.material?.dispose();
    });
    glassMesh = null;
}

export function buildGlass() {
    disposeGlass();
    const { width, height } = state;

    const glassWidth = width - 2 * offset - 0.2;
    const glassHeight = height - 2 * offset - 0.2;
    const glassThickness = frameW - beadW - offset - 1;

    const glassGeometry = new THREE.BoxGeometry(glassWidth, glassHeight, glassThickness);

    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: COLORS.glass,
        metalness: 0.05,
        roughness: 0.0,
        transmission: 1.0,
        thickness: glassThickness,
        ior: 1.5,
        dispersion: 5.0,
        side: THREE.DoubleSide
    });

    glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
    glassMesh.position.set(
        width / 2,
        height / 2,
        -beadW - glassThickness / 2 - 0.5
    );
    scene.add(glassMesh);

    const points = new Float32Array([
        -1, 0, 0, 1, 0, 0,
        0, -1, 0, 0, 1, 0
    ]);
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(points, 3));

    const mat = new THREE.LineBasicMaterial({ color: COLORS.plus });
    const plusSign = new THREE.LineSegments(geo, mat);

    plusSign.scale.set(50, 50, 1);
    plusSign.position.set(0, 0, glassThickness / 2 + 0.2);
    glassMesh.add(plusSign);
}
