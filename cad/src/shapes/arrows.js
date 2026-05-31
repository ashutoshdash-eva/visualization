import * as THREE from 'three';

const lineMaterial = () => new THREE.LineBasicMaterial({ color: '#000000' });

// A simple upward arrow centered at (centerX, centerY).
export function createUpArrow(centerX, centerY, boxHeight) {
    const arrowHeight = boxHeight * 0.7;
    const headSize = arrowHeight * 0.2;

    const topY = centerY + 0.5 * arrowHeight;
    const bottomY = centerY - 0.5 * arrowHeight;
    const points = [
        new THREE.Vector3(centerX, bottomY, 0),
        new THREE.Vector3(centerX, topY, 0),
        new THREE.Vector3(centerX - headSize, centerY + headSize),
        new THREE.Vector3(centerX, topY, 0),
        new THREE.Vector3(centerX + headSize, centerY + headSize),
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geometry, lineMaterial());
}

// A right-pointing block arrow centered at (centerX, centerY).
export function createRightArrow(centerX, centerY, boxHeight) {
    const arrowHeight = boxHeight / 3;
    const arrowWidth = boxHeight * 0.7;
    const points = [
        new THREE.Vector3(centerX - arrowWidth / 2, centerY + arrowHeight * 0.5, 0),
        new THREE.Vector3(centerX - arrowWidth / 2, centerY - arrowHeight * 0.5, 0),
        new THREE.Vector3(
            centerX - arrowWidth / 2 + arrowWidth * 0.6,
            centerY - arrowHeight * 0.5,
            0
        ),
        new THREE.Vector3(
            centerX - arrowWidth / 2 + arrowWidth * 0.6,
            centerY - arrowHeight * 0.5 - 0.5 * arrowHeight,
            0
        ),
        new THREE.Vector3(centerX + arrowWidth / 2, centerY, 0),
        new THREE.Vector3(centerX + arrowWidth / 2, centerY, 0),
        new THREE.Vector3(
            centerX - arrowWidth / 2 + arrowWidth * 0.6,
            centerY + arrowHeight * 0.5 + 0.5 * arrowHeight,
            0
        ),
        new THREE.Vector3(
            centerX - arrowWidth / 2 + arrowWidth * 0.6,
            centerY + arrowHeight - 0.5 * arrowHeight,
            0
        ),
        new THREE.Vector3(centerX - arrowWidth / 2, centerY + arrowHeight * 0.5, 0),
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return new THREE.Line(geometry, lineMaterial());
}

// A left-pointing block arrow: the right arrow built at the origin, then
// rotated 180° and positioned at (centerX, centerY).
export function createLeftArrow(centerX, centerY, boxHeight) {
    const arrowHeight = boxHeight / 3;
    const arrowWidth = boxHeight * 0.7;
    const points = [
        new THREE.Vector3(-arrowWidth / 2, +arrowHeight * 0.5, 0),
        new THREE.Vector3(-arrowWidth / 2, -arrowHeight * 0.5, 0),
        new THREE.Vector3(-arrowWidth / 2 + arrowWidth * 0.6, -arrowHeight * 0.5, 0),
        new THREE.Vector3(
            -arrowWidth / 2 + arrowWidth * 0.6,
            -arrowHeight * 0.5 - 0.5 * arrowHeight,
            0
        ),
        new THREE.Vector3(+arrowWidth / 2, 0, 0),
        new THREE.Vector3(+arrowWidth / 2, 0, 0),
        new THREE.Vector3(
            -arrowWidth / 2 + arrowWidth * 0.6,
            +arrowHeight * 0.5 + 0.5 * arrowHeight,
            0
        ),
        new THREE.Vector3(-arrowWidth / 2 + arrowWidth * 0.6, +arrowHeight - 0.5 * arrowHeight, 0),
        new THREE.Vector3(-arrowWidth / 2, +arrowHeight * 0.5, 0),
    ];
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const arrow = new THREE.Line(geometry, lineMaterial());
    arrow.position.set(centerX, centerY, 0);
    arrow.rotation.z = Math.PI;
    return arrow;
}
