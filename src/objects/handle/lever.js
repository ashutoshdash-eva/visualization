import * as THREE from 'three';
import { COLORS } from '../../utils/constants';
import { metalMaterial } from '../../utils/materials';
import { createSphere } from './sphere';

// The lever is three stacked shapes plus the knob sphere:
//   beak  — the top shape the sphere sits on (root of the lever)
//   curve — extruded along a bezier path, attached to the beak
//   grip  — the lower arc the hand wraps around, attached to the curve
// Returns the beak mesh, which parents the rest.
export function createLever(dims) {
    const { widthSegments, heightSegments, handleDepth, backPlateDepth } = dims;
    const radius = Math.min(2 * widthSegments, 2 * heightSegments);

    // 1. Beak — the top shape; the knob sphere sits on it and it roots the lever.
    const beakShape = new THREE.Shape();
    beakShape.moveTo(0, 0);
    beakShape.absarc(0, 0, radius, Math.PI / 4, (3 * Math.PI) / 3.5, false);
    beakShape.bezierCurveTo(-4 * radius, -heightSegments, 0, -radius, 0, -3 * heightSegments);
    beakShape.lineTo(2 * widthSegments, -3 * heightSegments);
    beakShape.bezierCurveTo(
        2 * widthSegments,
        -2 * heightSegments,
        3 * widthSegments,
        0,
        radius * Math.cos(Math.PI / 4),
        radius * Math.sin(Math.PI / 4)
    );

    const beakGeometry = new THREE.ExtrudeGeometry(beakShape, {
        depth: handleDepth,
        bevelEnabled: false,
    });
    const beak = new THREE.Mesh(beakGeometry, metalMaterial(COLORS.handle));
    beak.position.z += backPlateDepth;
    beak.add(createSphere(dims));

    // 2. Curve — extruded along a bezier path, attached to the beak.
    const curvePath = new THREE.CubicBezierCurve3(
        new THREE.Vector3(2 * widthSegments, -3 * heightSegments, 0),
        new THREE.Vector3(2 * widthSegments, -3.8 * heightSegments, 0),
        new THREE.Vector3(2 * widthSegments, -4.2 * heightSegments, 2 * handleDepth),
        new THREE.Vector3(2 * widthSegments, -7 * heightSegments, 2 * handleDepth)
    );

    const curveShape = new THREE.Shape();
    curveShape.moveTo(0, 0);
    curveShape.lineTo(2 * widthSegments, 0);
    curveShape.lineTo(2 * widthSegments, handleDepth);
    curveShape.lineTo(0, handleDepth);

    const curveGeometry = new THREE.ExtrudeGeometry(curveShape, {
        bevelEnabled: false,
        steps: 1000,
        extrudePath: curvePath,
    });
    const curve = new THREE.Mesh(curveGeometry, metalMaterial(COLORS.handle));
    curve.position.z += handleDepth;
    beak.add(curve);

    // 3. Grip — the lower arc the hand wraps around, attached to the curve.
    const gripShape = new THREE.Shape();
    gripShape.moveTo(0, -7 * heightSegments);
    gripShape.lineTo(0, -16 * heightSegments);
    gripShape.absarc(widthSegments, -16 * heightSegments, widthSegments, Math.PI, 0, false);
    gripShape.lineTo(2 * widthSegments, -7 * heightSegments);

    const gripGeometry = new THREE.ExtrudeGeometry(gripShape, {
        bevelEnabled: false,
        depth: handleDepth,
    });
    const grip = new THREE.Mesh(gripGeometry, metalMaterial(COLORS.handle));
    grip.position.z += handleDepth;
    curve.add(grip);
    return beak;
}
