import * as THREE from 'three';

export function addUpwardArrow(centerX, centerY, boxHeight) {
    const arrowHeight = boxHeight * 0.7;
    const headSize = arrowHeight * 0.2;

    const topY = centerY + 0.5 * arrowHeight;
    const bottomY = centerY - 0.5 * arrowHeight;
    const points = [];
    points.push(
        new THREE.Vector3(centerX, bottomY, 0),
        new THREE.Vector3(centerX, topY, 0),
        new THREE.Vector3(centerX - headSize, centerY + headSize),
        new THREE.Vector3(centerX, topY, 0),
        new THREE.Vector3(centerX + headSize, centerY + headSize)
    );
    return points;
}
