import * as THREE from 'three';

// A regular hexagon outline centered at (centerX, centerY).
export function createHexagon(centerX, centerY, radius) {
    const points = [];
    for (let i = 0; i < 6; i++) {
        const angle = (i * (2 * Math.PI)) / 6;
        points.push(new THREE.Vector3(radius * Math.cos(angle), radius * Math.sin(angle), 0));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#000000' });
    const hexagon = new THREE.LineLoop(geometry, material);
    hexagon.position.set(centerX, centerY, 0);
    hexagon.rotation.z = Math.PI / 6;
    return hexagon;
}
