import * as THREE from 'three';
import { scene } from '../scene';
import { layout } from '../layout';

// The right-hand property panel: a grid of rows/cells for design metadata.
export function createPropertyBox() {
    const { width, height, panelWidth } = layout;
    const panelX = width - panelWidth;
    const points = [];
    points.push(new THREE.Vector3(panelX, 0, 0), new THREE.Vector3(panelX, height, 0));

    const divisions = 10;
    const rowHeight = height / divisions;
    const mid = panelX + panelWidth / 2;
    const rightMid = mid + panelWidth / 4;

    points.push(
        new THREE.Vector3(panelX, rowHeight, 0),
        new THREE.Vector3(width, rowHeight, 0),

        new THREE.Vector3(panelX, 2 * rowHeight - rowHeight / 4, 0),
        new THREE.Vector3(mid, 2 * rowHeight - rowHeight / 4, 0),

        new THREE.Vector3(panelX, 3 * rowHeight - rowHeight / 2, 0),
        new THREE.Vector3(mid, 3 * rowHeight - rowHeight / 2, 0),

        new THREE.Vector3(panelX, 4 * rowHeight, 0),
        new THREE.Vector3(width, 4 * rowHeight, 0),

        new THREE.Vector3(panelX, 5 * rowHeight, 0),
        new THREE.Vector3(mid, 5 * rowHeight, 0),

        new THREE.Vector3(mid, 5 * rowHeight, 0),
        new THREE.Vector3(mid, 0, 0),

        new THREE.Vector3(rightMid, 4 * rowHeight, 0),
        new THREE.Vector3(rightMid, rowHeight, 0),

        new THREE.Vector3(panelX, 6 * rowHeight, 0),
        new THREE.Vector3(width, 6 * rowHeight, 0),

        new THREE.Vector3(panelX, 7 * rowHeight, 0),
        new THREE.Vector3(width, 7 * rowHeight, 0),

        new THREE.Vector3(panelX, 8 * rowHeight, 0),
        new THREE.Vector3(width, 8 * rowHeight, 0),

        new THREE.Vector3(panelX, 9 * rowHeight, 0),
        new THREE.Vector3(width, 9 * rowHeight, 0),

        new THREE.Vector3(mid, 9 * rowHeight, 0),
        new THREE.Vector3(mid, 8 * rowHeight, 0),

        new THREE.Vector3(rightMid, 3 * rowHeight - rowHeight / 2, 0),
        new THREE.Vector3(width, 3 * rowHeight - rowHeight / 2, 0)
    );

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#000000' });
    scene.add(new THREE.LineSegments(geometry, material));
}
