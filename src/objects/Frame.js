import * as THREE from 'three';
import { scene } from '../scene/setupScene';
import { width, height } from '../utils/constants';
import { COLORS } from '../utils/constants';

export const p1 = new THREE.Vector3(0, 0, 0);
export const p2 = new THREE.Vector3(width, 0, 0);
export const p3 = new THREE.Vector3(width, height, 0);
export const p4 = new THREE.Vector3(0, height, 0);

export const pathArray = [
    new THREE.LineCurve3(p1, p2),
    new THREE.LineCurve3(p2, p3),
    new THREE.LineCurve3(p3, p4),
    new THREE.LineCurve3(p4, p1)
];

export const frameMeshes = [];

function createFrameShape(w = 50, h = 50, h1 = 15) {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(w, 0);
    shape.lineTo(w, h);
    shape.lineTo(w - h1, h);
    shape.lineTo(w - h1, h1);
    shape.lineTo(0, h1);
    shape.lineTo(0, 0);
    return shape;
}

export function buildFrame() {
    pathArray.forEach((edge, index) => {

        const geometry = new THREE.ExtrudeGeometry(createFrameShape(), {
            bevelEnabled: false,
            extrudePath: edge
        });

        const material = new THREE.MeshStandardMaterial({ color: COLORS.frame });
        const pos = geometry.attributes.position;

        for (let i = 0; i < pos.count; i++) {
            let x = pos.getX(i);
            let y = pos.getY(i);

            if (index === 0) {
                if (x === 0) pos.setX(i, y);
                else if (x === width) pos.setX(i, width - y);
            } else if (index === 1) {
                if (y === 0) pos.setY(i, width - x);
                else if (y === height) pos.setY(i, height - (width - x));
            } else if (index === 2) {
                if (x === 0) pos.setX(i, height - y);
                else if (x === width) pos.setX(i, width - (height - y));
            } else if (index === 3) {
                if (y === 0) pos.setY(i, x);
                else if (y === height) pos.setY(i, height - x);
            }
        }

        pos.needsUpdate = true;
        geometry.computeVertexNormals();

        const edges = new THREE.EdgesGeometry(geometry);
        const line = new THREE.LineSegments(
            edges,
            new THREE.LineBasicMaterial({ color: COLORS.edge })
        );

        const mesh = new THREE.Mesh(geometry, material);
        mesh.add(line);
        scene.add(mesh);
        frameMeshes.push(mesh);
    });
}