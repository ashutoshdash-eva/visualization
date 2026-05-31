import * as THREE from 'three';
import { scene } from '../scene';
import { layout } from '../layout';

// The top-left rounded "project details" box with its internal divider lines.
export function createPDBox() {
    const { width, height, pdBoxW: boxW, pdBoxH: boxH } = layout;

    const x = width * 0.01;
    const y = height - boxH - x;
    const radius = width * 0.015;
    const material = new THREE.LineBasicMaterial({ color: '#000000' });

    const pdBoxShape = new THREE.Shape();
    pdBoxShape.moveTo(x + radius, y);
    pdBoxShape.lineTo(x + boxW - radius, y);
    pdBoxShape.absarc(x + boxW - radius, y + radius, radius, (3 * Math.PI) / 2, 0, false);
    pdBoxShape.lineTo(x + boxW, y + boxH - radius);
    pdBoxShape.absarc(x + boxW - radius, y + boxH - radius, radius, 0, Math.PI / 2, false);
    pdBoxShape.lineTo(x + radius, y + boxH);
    pdBoxShape.absarc(x + radius, y + boxH - radius, radius, Math.PI / 2, Math.PI, false);
    pdBoxShape.lineTo(x, y + radius);
    pdBoxShape.absarc(x + radius, y + radius, radius, Math.PI, (3 * Math.PI) / 2, false);

    const shapePoints = pdBoxShape.getPoints(20);
    scene.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(shapePoints), material));

    const points = [];
    const rowH = boxH / 4;
    points.push(
        new THREE.Vector3(x, y + rowH, 0),
        new THREE.Vector3(x + boxW, y + rowH, 0),

        new THREE.Vector3(x, y + 2 * rowH, 0),
        new THREE.Vector3(x + boxW, y + 2 * rowH, 0),

        new THREE.Vector3(x, y + 3 * rowH, 0),
        new THREE.Vector3(x + boxW, y + 3 * rowH, 0),

        new THREE.Vector3(x + boxW / 2, y, 0),
        new THREE.Vector3(x + boxW / 2, y + rowH, 0),

        new THREE.Vector3(x + boxW / 4, y + 2 * rowH, 0),
        new THREE.Vector3(x + boxW / 4, y + 3 * rowH, 0),

        new THREE.Vector3(x + (3 * boxW) / 4, y + 2 * rowH, 0),
        new THREE.Vector3(x + (3 * boxW) / 4, y + 3 * rowH, 0)
    );

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    scene.add(new THREE.LineSegments(geometry, material));
}
