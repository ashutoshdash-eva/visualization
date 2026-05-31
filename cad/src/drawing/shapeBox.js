import * as THREE from 'three';
import { scene } from '../scene';
import { layout } from '../layout';
import { createHexagon } from '../shapes/hexagon';
import { createStar } from '../shapes/star';
import { createUpArrow, createLeftArrow, createRightArrow } from '../shapes/arrows';

// The bottom strip: a row of five slots, each holding a legend shape.
export function createShapeBox() {
    const { width, height } = layout;
    const boxWidth = width - width * 0.35;
    const boxHeight = height * 0.2;
    const startX = 0;
    const startY = 0;

    const points = [];
    points.push(
        new THREE.Vector3(startX, startY, 0),
        new THREE.Vector3(boxWidth, startY, 0),

        new THREE.Vector3(startX, boxHeight, 0),
        new THREE.Vector3(boxWidth, boxHeight, 0),

        new THREE.Vector3(startX, startY, 0),
        new THREE.Vector3(startX, boxHeight, 0),

        new THREE.Vector3(boxWidth, startY, 0),
        new THREE.Vector3(boxWidth, boxHeight, 0)
    );

    const slots = 5;
    const slotStep = boxWidth / slots;

    points.push(
        new THREE.Vector3(slotStep, startY, 0),
        new THREE.Vector3(slotStep, boxHeight, 0),

        new THREE.Vector3(2 * slotStep, startY, 0),
        new THREE.Vector3(2 * slotStep, boxHeight, 0),

        new THREE.Vector3(3 * slotStep, startY, 0),
        new THREE.Vector3(3 * slotStep, boxHeight, 0),

        new THREE.Vector3(4 * slotStep, startY, 0),
        new THREE.Vector3(4 * slotStep, boxHeight, 0)
    );

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#000000' });
    scene.add(new THREE.LineSegments(geometry, material));

    const centerY = startY + (boxHeight - startY) / 2;
    const shapeRadius = (boxHeight / 2) * 0.8;
    scene.add(createHexagon(slotStep * 0.5, centerY, shapeRadius));
    scene.add(createStar(slotStep * 1.5, centerY, shapeRadius, shapeRadius / 1.75));
    scene.add(createUpArrow(slotStep * 2.5, centerY, boxHeight));
    scene.add(createLeftArrow(slotStep * 3.5, centerY, boxHeight));
    scene.add(createRightArrow(slotStep * 4.5, centerY, boxHeight));
}
