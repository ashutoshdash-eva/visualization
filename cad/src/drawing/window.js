import * as THREE from 'three';
import { scene } from '../scene';
import { layout } from '../layout';

const blackLine = () => new THREE.LineBasicMaterial({ color: '#000000' });

// The 2D section of the window: frame, bead, mitre cuts, centre lines, the
// bottom/right dimension lines with ticks, and the centre cross.
export function addWindow() {
    const {
        windowWidth,
        windowHeight,
        centerX,
        centerY,
        left,
        right,
        bottom,
        top,
        h1,
        bw,
        dimOffset,
        dimX,
        dimY,
    } = layout;

    const points = [
        // Frame
        new THREE.Vector3(left, bottom, 0),
        new THREE.Vector3(left, top, 0),
        new THREE.Vector3(left, top, 0),
        new THREE.Vector3(right, top, 0),
        new THREE.Vector3(right, top, 0),
        new THREE.Vector3(right, bottom, 0),
        new THREE.Vector3(right, bottom, 0),
        new THREE.Vector3(left, bottom, 0),
        new THREE.Vector3(left + h1, bottom + h1, 0),
        new THREE.Vector3(left + h1, top - h1, 0),
        new THREE.Vector3(left + h1, top - h1, 0),
        new THREE.Vector3(right - h1, top - h1, 0),
        new THREE.Vector3(right - h1, top - h1, 0),
        new THREE.Vector3(right - h1, bottom + h1, 0),
        new THREE.Vector3(right - h1, bottom + h1, 0),
        new THREE.Vector3(left + h1, bottom + h1, 0),
        // Bead
        new THREE.Vector3(left + h1 + bw, bottom + h1, 0),
        new THREE.Vector3(left + h1 + bw, top - h1, 0),
        new THREE.Vector3(left + h1 + bw, top - h1 - bw, 0),
        new THREE.Vector3(right - h1 - bw, top - h1 - bw, 0),
        new THREE.Vector3(right - h1 - bw, top - h1, 0),
        new THREE.Vector3(right - h1 - bw, bottom + h1, 0),
        new THREE.Vector3(right - h1 - bw, bottom + h1 + bw, 0),
        new THREE.Vector3(left + h1 + bw, bottom + h1 + bw, 0),
        // Frame mitre cuts
        new THREE.Vector3(left, bottom, 0),
        new THREE.Vector3(left + h1, bottom + h1, 0),
        new THREE.Vector3(left, top, 0),
        new THREE.Vector3(left + h1, top - h1, 0),
        new THREE.Vector3(right, bottom, 0),
        new THREE.Vector3(right - h1, bottom + h1, 0),
        new THREE.Vector3(right, top, 0),
        new THREE.Vector3(right - h1, top - h1, 0),
    ];

    const windowMaterial = new THREE.LineBasicMaterial({ color: '#838383' });
    scene.add(
        new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(points), windowMaterial)
    );

    // Dashed centre lines.
    const dashedGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(left, centerY - windowWidth * 0.01, 0),
        new THREE.Vector3(right, centerY - windowWidth * 0.01, 0),
        new THREE.Vector3(centerX - windowHeight * 0.01, top, 0),
        new THREE.Vector3(centerX - windowHeight * 0.01, bottom, 0),
    ]);
    const dashedMaterial = new THREE.LineDashedMaterial({
        color: '#000000',
        dashSize: Math.max(windowWidth, windowHeight) * 0.01,
        gapSize: Math.max(windowWidth, windowHeight) * 0.007,
    });
    scene.add(new THREE.LineSegments(dashedGeometry, dashedMaterial).computeLineDistances());

    const tickSize = dimOffset * 0.4;

    // Bottom dimension line with end ticks.
    const bottomDimPoints = [
        new THREE.Vector3(left, dimY, 0),
        new THREE.Vector3(centerX - dimOffset, dimY, 0),
        new THREE.Vector3(centerX + dimOffset, dimY, 0),
        new THREE.Vector3(right, dimY, 0),
        new THREE.Vector3(left, dimY - tickSize, 0),
        new THREE.Vector3(left, dimY + tickSize, 0),
        new THREE.Vector3(right, dimY - tickSize, 0),
        new THREE.Vector3(right, dimY + tickSize, 0),
    ];
    scene.add(
        new THREE.LineSegments(
            new THREE.BufferGeometry().setFromPoints(bottomDimPoints),
            blackLine()
        )
    );

    // Right dimension line with end ticks.
    const rightDimPoints = [
        new THREE.Vector3(dimX, top, 0),
        new THREE.Vector3(dimX, centerY + dimOffset, 0),
        new THREE.Vector3(dimX, centerY - dimOffset, 0),
        new THREE.Vector3(dimX, bottom, 0),
        new THREE.Vector3(dimX + tickSize, top, 0),
        new THREE.Vector3(dimX - tickSize, top, 0),
        new THREE.Vector3(dimX - tickSize, bottom, 0),
        new THREE.Vector3(dimX + tickSize, bottom, 0),
    ];
    scene.add(
        new THREE.LineSegments(
            new THREE.BufferGeometry().setFromPoints(rightDimPoints),
            blackLine()
        )
    );

    // Centre cross.
    const plusSize = Math.min(windowWidth, windowHeight) * 0.05;
    const plusPoints = [
        new THREE.Vector3(centerX, centerY - plusSize, 0),
        new THREE.Vector3(centerX, centerY + plusSize, 0),
        new THREE.Vector3(centerX - plusSize, centerY, 0),
        new THREE.Vector3(centerX + plusSize, centerY, 0),
    ];
    scene.add(
        new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(plusPoints), blackLine())
    );
}
