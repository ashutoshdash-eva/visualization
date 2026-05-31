import * as THREE from 'three';
import { camera } from '../scene/setupScene';
import { frameMeshes } from '../objects/Frame';
import { beadMeshes } from '../objects/Bead';
import { COLORS } from '../utils/constants';

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const originalFrameColor = new THREE.Color(COLORS.frame);
const originalBeadColor = new THREE.Color(COLORS.bead);

function resetColors() {
    frameMeshes.forEach((mesh) => mesh.material.color.set(originalFrameColor));
    beadMeshes.forEach((mesh) => mesh.material.color.set(originalBeadColor));
}

export function setupSelection() {
    window.addEventListener('dblclick', (event) => {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        raycaster.setFromCamera(mouse, camera);

        const intersects = raycaster.intersectObjects([...frameMeshes, ...beadMeshes]);

        if (intersects.length === 0) {
            resetColors();
            return;
        }

        const clickedMesh = intersects[0].object;
        const isAlreadySelected = clickedMesh.material.color.getHex() === COLORS.highlight;

        if (isAlreadySelected) {
            resetColors();
            return;
        }

        if (frameMeshes.includes(clickedMesh)) {
            frameMeshes.forEach((mesh) => {
                mesh.material.color.set(mesh === clickedMesh ? COLORS.highlight : COLORS.secondary);
            });
            beadMeshes.forEach((mesh) => {
                mesh.material.color.set(originalBeadColor);
            });
        } else if (beadMeshes.includes(clickedMesh)) {
            beadMeshes.forEach((mesh) => {
                mesh.material.color.set(mesh === clickedMesh ? COLORS.highlight : COLORS.secondary);
            });
            frameMeshes.forEach((mesh) => {
                mesh.material.color.set(originalFrameColor);
            });
        }
    });
}
