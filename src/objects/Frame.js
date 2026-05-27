import * as THREE from 'three';
import { scene } from '../scene/setupScene';
import { state, COLORS } from '../utils/constants';

// const textureLoader = new THREE.TextureLoader();
// export const textureMaterial = new THREE.MeshStandardMaterial({
//     map: textureLoader.load('texture/raw_plank_wall_diff_2k.png'),
//     normalMap: textureLoader.load('texture/raw_plank_wall_nor_gl_2k.png'),
//     aoMap: textureLoader.load('texture/raw_plank_wall_arm_2k.png'),
//     roughnessMap: textureLoader.load('texture/raw_plank_wall_arm_2k.png'),
//     metalnessMap: textureLoader.load('texture/raw_plank_wall_arm_2k.png'),

//     displacementMap:textureLoader.load('texture/raw_plank_wall_disp_2k.png'),
//     displacementScale:0.05

// })

export const frameMeshes = [];
export let pathArray = [];

function createFrameShape(w = 50, h = 50, h1 = 30) {
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

function disposeFrameMeshes() {
    frameMeshes.forEach(mesh => {
        scene.remove(mesh);
        mesh.geometry?.dispose();
        mesh.material?.dispose();
        // Dispose only the edge LineSegments we attached here.
        // Beads parented under frameMeshes are owned by Bead.js and disposed there.
        mesh.children.forEach(child => {
            if (child.isLineSegments) {
                child.geometry?.dispose();
                child.material?.dispose();
            }
        });
    });
    frameMeshes.length = 0;
}

export function buildFrame() {
    disposeFrameMeshes();

    const { width, height } = state;
    const p1 = new THREE.Vector3(0, 0, 0);
    const p2 = new THREE.Vector3(width, 0, 0);
    const p3 = new THREE.Vector3(width, height, 0);
    const p4 = new THREE.Vector3(0, height, 0);

    pathArray = [
        new THREE.LineCurve3(p1, p2),
        new THREE.LineCurve3(p2, p3),
        new THREE.LineCurve3(p3, p4),
        new THREE.LineCurve3(p4, p1)
    ];

    pathArray.forEach((edge, index) => {

        const geometry = new THREE.ExtrudeGeometry(createFrameShape(), {
            bevelEnabled: false,
            extrudePath: edge
        });

        // const material = new THREE.MeshStandardMaterial({ color: COLORS.frame });
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
