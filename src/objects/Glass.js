import * as THREE from 'three';
import { scene } from '../scene/setupScene';
import { state, offset, frameProfileWidth, beadWidth, COLORS, GLASS } from '../utils/constants';
import { disposeMeshWithEdges } from '../utils/dispose';

let glassMesh;

function disposeGlass() {
    if (!glassMesh) return;
    scene.remove(glassMesh);
    disposeMeshWithEdges(glassMesh);
    glassMesh = null;
}

export function buildGlass() {
    disposeGlass();
    const { width, height } = state;

    const glassWidth = width - 2 * offset - 0.2;
    const glassHeight = height - 2 * offset - 0.2;
    const glassThickness = frameProfileWidth - beadWidth - offset - 1;

    const glassGeometry = new THREE.BoxGeometry(glassWidth, glassHeight, glassThickness);

    const glassMaterial = new THREE.MeshPhysicalMaterial({
        color: COLORS.glass,
        ...GLASS,
        thickness: glassThickness,
        side: THREE.DoubleSide,
    });

    glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
    glassMesh.position.set(width / 2, height / 2, -beadWidth - glassThickness / 2 - 0.5);
    scene.add(glassMesh);

    const plusVertices = new Float32Array([-1, 0, 0, 1, 0, 0, 0, -1, 0, 0, 1, 0]);
    const plusGeometry = new THREE.BufferGeometry();
    plusGeometry.setAttribute('position', new THREE.BufferAttribute(plusVertices, 3));

    const plusMaterial = new THREE.LineBasicMaterial({ color: COLORS.plus });
    const plusSign = new THREE.LineSegments(plusGeometry, plusMaterial);

    plusSign.scale.set(50, 50, 1);
    plusSign.position.set(0, 0, glassThickness / 2 + 0.2);
    glassMesh.add(plusSign);
}
