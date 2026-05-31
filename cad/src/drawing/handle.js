import * as THREE from 'three';
import { scene } from '../scene';
import { layout, config } from '../layout';

// Builds the 2D handle drawing (backplate outline, filled lever with hole, and
// two screws) as a group centered on its mount point.
function createHandleGroup(handleWidth, handleHeight) {
    const r = (handleWidth / 6) * 2.2;
    const w = handleWidth / 6;
    const h = handleHeight / 16;

    const handleGroup = new THREE.Group();
    const lineMat = new THREE.LineBasicMaterial({ color: '#000000' });
    const fillMat = new THREE.MeshBasicMaterial({ color: '#f0f0f0' });

    const backPlate = new THREE.Path();
    backPlate.moveTo(w, 2.2 * h);
    backPlate.lineTo(0, 4 * h);
    backPlate.lineTo(-2 * w, 4 * h);
    backPlate.lineTo(-2 * w, -4 * h);
    backPlate.lineTo(0, -4 * h);
    backPlate.lineTo(w, -2.2 * h);
    backPlate.lineTo(2 * w, -1.2 * h);
    backPlate.lineTo(2 * w, 1.2 * h);
    backPlate.closePath();

    const backPlateGeom = new THREE.BufferGeometry().setFromPoints(backPlate.getPoints(20));
    const backPlateLine = new THREE.Line(backPlateGeom, lineMat);
    backPlateLine.position.z = 0;
    handleGroup.add(backPlateLine);

    const shape = new THREE.Shape();
    shape.absarc(0, 0, r, Math.PI / 4, (3 * Math.PI) / 3.5, false);
    shape.bezierCurveTo(-4 * r, -h, 0, -r, 0, -3 * h);
    shape.lineTo(0, -12 * h);
    shape.absarc(r / 2, -12 * h, r / 2, Math.PI, 0, false);
    shape.lineTo(2 * w, -3 * h);
    shape.bezierCurveTo(
        2 * w,
        -2 * h,
        3 * w,
        0,
        r * Math.cos(Math.PI / 4),
        r * Math.sin(Math.PI / 4)
    );

    const holePath = new THREE.Path();
    holePath.absarc(0, 0, r / 2, 0, Math.PI * 2, false);

    const handle = new THREE.Mesh(new THREE.ShapeGeometry(shape, 50), fillMat);
    handle.position.z = 0.5;
    handleGroup.add(handle);

    const handleGeom = new THREE.BufferGeometry().setFromPoints(shape.getPoints(50));
    const handleLine = new THREE.Line(handleGeom, lineMat);
    handleLine.position.z = 1.1;
    handleGroup.add(handleLine);

    const holeGeom = new THREE.BufferGeometry().setFromPoints(holePath.getPoints(20));
    const holeMesh = new THREE.Line(holeGeom, lineMat);
    holeMesh.position.z = 1.1;
    handleGroup.add(holeMesh);

    const screw1 = new THREE.Path();
    screw1.absarc(-w, 3 * h, w / 2, Math.PI, -Math.PI, true);
    screw1.lineTo(-1.5 * w, 3 * h);
    screw1.lineTo(-2 * w, 3 * h);
    handleGroup.add(
        new THREE.Line(new THREE.BufferGeometry().setFromPoints(screw1.getPoints(20)), lineMat)
    );

    const screw2 = new THREE.Path();
    screw2.absarc(-w, -3 * h, w / 2, Math.PI, -Math.PI, true);
    screw2.lineTo(-1.5 * w, -3 * h);
    screw2.lineTo(-2 * w, -3 * h);
    handleGroup.add(
        new THREE.Line(new THREE.BufferGeometry().setFromPoints(screw2.getPoints(20)), lineMat)
    );

    return handleGroup;
}

// Builds the handle and positions it on the chosen mounting side / orientation.
export function addHandle() {
    const { handleWidth, handleHeight, left, right, top, bottom, h1, ghh } = layout;
    const handleGroup = createHandleGroup(handleWidth, handleHeight);

    const mountSide = config.mountSide ?? 'right';
    switch (mountSide) {
        case 'left':
            handleGroup.position.set(left + h1 / 2, bottom + ghh);
            break;
        case 'right':
            handleGroup.position.set(right - h1 / 2, bottom + ghh);
            break;
        case 'top':
            handleGroup.position.set(left + ghh, top - h1 / 2);
            handleGroup.rotation.z = Math.PI / 2;
            break;
        case 'bottom':
            handleGroup.position.set(left + ghh, bottom + h1 / 2);
            handleGroup.rotation.z = (3 * Math.PI) / 2;
            break;
        default:
            handleGroup.position.set(right / 1.017, bottom + ghh);
    }
    scene.add(handleGroup);

    const orientation = config.orientation ?? 'left';
    if (orientation === 'right') {
        handleGroup.scale.x = -1;
    }
}
