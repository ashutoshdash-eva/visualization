import * as THREE from 'three';
import { scene } from '../scene/setupScene';
import { frameMeshes, pathArray } from './Frame';
import { width, height, beadW, offset, beadOffset, COLORS } from '../utils/constants';

export const beadMeshes = [];

function createBeadShape(w = beadW, h = 35, t = 5, r = 12) {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(t, 0);
    shape.lineTo(t, h - (t + r));
    shape.absarc(t + r, h - (t + r), r, Math.PI, Math.PI / 2, true);
    shape.lineTo(w, h - t);
    shape.lineTo(w, h);
    shape.lineTo(t + r, h);
    shape.absarc(t + r, h - (t + r), r + t, Math.PI / 2, Math.PI, false);
    shape.lineTo(0, 0);
    return shape;
}

export function buildBeads() {
    pathArray.forEach((edge, index) => {

        const geometry = new THREE.ExtrudeGeometry(createBeadShape(), {
            bevelEnabled: false,
            extrudePath: edge,
            curveSegments: 120
        });

        const material = new THREE.MeshStandardMaterial({ color: COLORS.bead });
        const pos = geometry.attributes.position;

        for (let i = 0; i < pos.count; i++) {
            let x = pos.getX(i);
            let y = pos.getY(i);

            if (index === 0 || index === 2) {
                if (x === 0) pos.setX(i, offset + beadOffset);
                else if (x === width) pos.setX(i, width - (offset + beadOffset));
            }
            if (index === 1 || index === 3) {
                if (y === 0) pos.setY(i, offset);
                else if (y === height) pos.setY(i, height - offset);
            }
        }

        pos.needsUpdate = true;
        geometry.computeVertexNormals();

        const mesh = new THREE.Mesh(geometry, material);

        if (index === 0) mesh.position.y += offset;
        else if (index === 1) mesh.position.x -= offset;
        else if (index === 2) mesh.position.y = -offset;
        else if (index === 3) mesh.position.x += offset;

        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ color: COLORS.edge })
        );
        mesh.add(line);

        scene.add(mesh);
        frameMeshes[index].add(mesh);
        beadMeshes.push(mesh);
    });
}