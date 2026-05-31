import * as THREE from 'three';
import { COLORS } from '../../utils/constants';
import { metalMaterial } from '../../utils/materials';
import { createLever } from './lever';
import { createScrew } from './screw';

// The plate everything mounts onto — the root of the handle group. Adds the
// lever and screws as children so the whole handle moves as one object.
export function createBackplate(dims) {
    const { widthSegments, heightSegments, backPlateDepth } = dims;
    const radius = widthSegments * 2.2;

    const plateShape = new THREE.Shape();
    plateShape.moveTo(0, 0);
    plateShape.absarc(0, 0, radius, (3 * Math.PI) / 2, Math.PI / 2, false);
    plateShape.lineTo(0, 4 * heightSegments);
    plateShape.lineTo(-2 * widthSegments, 4 * heightSegments);
    plateShape.lineTo(-2 * widthSegments, -4 * heightSegments);
    plateShape.lineTo(0, -4 * heightSegments);

    const plateGeometry = new THREE.ExtrudeGeometry(plateShape, {
        depth: backPlateDepth,
        bevelEnabled: false,
    });
    const backPlate = new THREE.Mesh(plateGeometry, metalMaterial(COLORS.handlePlate));
    backPlate.add(createLever(dims));
    backPlate.add(createScrew(dims));
    return backPlate;
}
