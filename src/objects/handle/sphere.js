import * as THREE from 'three';
import { COLORS } from '../../utils/constants';
import { metalMaterial } from '../../utils/materials';

// The round knob at the top of the lever.
export function createSphere({ widthSegments, heightSegments, handleDepth }) {
    const radius = Math.min(2 * widthSegments, 2 * heightSegments);
    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(radius / 1.7, 320, 160, 0, Math.PI),
        metalMaterial(COLORS.handlePlate)
    );
    sphere.position.set(0, -heightSegments / 3, handleDepth);
    return sphere;
}
