import * as THREE from 'three';
import { COLORS } from '../../utils/constants';

// Two round screws (top and bottom), each with a "+" slot, mounted on the backplate.
export function createScrew({ widthSegments, heightSegments, backPlateDepth }) {
    const radius = Math.min(widthSegments / 2, heightSegments / 2);

    const shapeTop = new THREE.Shape();
    shapeTop.absarc(-widthSegments, 3 * heightSegments, radius);
    const shapeBottom = new THREE.Shape();
    shapeBottom.absarc(-widthSegments, -3 * heightSegments, radius);

    const geometry = new THREE.ExtrudeGeometry([shapeTop, shapeBottom], {
        depth: backPlateDepth,
    });
    const screw = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: COLORS.screw }));

    const plusGroup = new THREE.Group();
    const plusMaterial = new THREE.MeshBasicMaterial({ color: COLORS.plus });

    const slotLength = radius * 1.2;
    const slotThickness = radius * 0.2;
    const slotDepth = 0.5;

    const horizontalGeometry = new THREE.BoxGeometry(slotLength, slotThickness, slotDepth);
    const horizontalSlot = new THREE.Mesh(horizontalGeometry, plusMaterial);

    const verticalGeometry = new THREE.BoxGeometry(slotThickness, slotLength, slotDepth);
    const verticalSlot = new THREE.Mesh(verticalGeometry, plusMaterial);
    plusGroup.add(horizontalSlot, verticalSlot);
    plusGroup.position.set(-widthSegments, 3 * heightSegments, backPlateDepth + slotDepth / 2);
    screw.add(plusGroup);

    const bottomPlusGroup = plusGroup.clone();
    bottomPlusGroup.position.set(
        -widthSegments,
        -3 * heightSegments,
        backPlateDepth + slotDepth / 2
    );
    screw.add(bottomPlusGroup);

    return screw;
}
