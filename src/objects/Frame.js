import * as THREE from 'three';
import { scene } from '../scene/setupScene';
import { state, COLORS } from '../utils/constants';
import { disposeMeshWithEdges } from '../utils/dispose';

const textureLoader = new THREE.TextureLoader();

// Load a texture and log clearly if the file is missing/unreadable, instead
// of silently ending up with an undefined-looking material.
function loadTexture(url) {
    return textureLoader.load(url, undefined, undefined, (err) =>
        console.error(`Failed to load texture: ${url}`, err)
    );
}

const colorMap = loadTexture('texture/raw_plank_wall_diff_2k.png');
const normalMap = loadTexture('texture/raw_plank_wall_nor_gl_2k.png');
const armMap = loadTexture('texture/raw_plank_wall_arm_2k.png'); // ambient occlusion / roughness / metalness
const displacementMap = loadTexture('texture/raw_plank_wall_disp_2k.png');

colorMap.colorSpace = THREE.SRGBColorSpace;
const maps = [colorMap, normalMap, armMap, displacementMap];
maps.forEach((map) => {
    if (map) {
        map.wrapS = THREE.RepeatWrapping;
        map.wrapT = THREE.RepeatWrapping;
    }
});

export const textureMaterial = new THREE.MeshStandardMaterial({
    map: colorMap,
    normalMap,
    // aoMap: armMap,
    roughnessMap: armMap,
    metalnessMap: armMap,

    displacementMap,
    displacementScale: 0,
});

export const frameMeshes = [];
export let pathArray = [];

// L-shaped cross-section of the frame profile, extruded along each edge.
// h1 = inner lip/rebate depth (the thickness of the L's legs — the step the
// bead and glass sit against).
function createFrameShape(profileWidth = 50, profileHeight = 50, h1 = 30) {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.lineTo(profileWidth, 0);
    shape.lineTo(profileWidth, profileHeight);
    shape.lineTo(profileWidth - h1, profileHeight);
    shape.lineTo(profileWidth - h1, h1);
    shape.lineTo(0, h1);
    shape.lineTo(0, 0);
    return shape;
}

function disposeFrameMeshes() {
    frameMeshes.forEach((mesh) => {
        scene.remove(mesh);
        // disposeMeshWithEdges only touches the edge LineSegments, so the
        // beads parented under frame meshes (owned by Bead.js) are left alone.
        disposeMeshWithEdges(mesh);
    });
    frameMeshes.length = 0;
}

const TEXTURE_SCALE = 0.005;

// Each frame side is extruded in its own local space, so by default the wood
// grain would restart at every corner. This re-flows the geometry per edge:
//  1. Rewrite vertex positions so all four sides share one coordinate frame.
//  2. Derive UVs from those positions so the texture wraps seamlessly around
//     the frame. `index` is the edge (0 = bottom, 1 = right, 2 = top, 3 = left).
function remapFrameUVs(geometry, index, width, height) {
    const positionAttr = geometry.attributes.position;
    const uvAttr = geometry.attributes.uv;

    for (let i = 0; i < positionAttr.count; i++) {
        const x = positionAttr.getX(i);
        const y = positionAttr.getY(i);
        const z = positionAttr.getZ(i);

        if (index === 0) {
            if (x === 0) positionAttr.setX(i, y);
            else if (x === width) positionAttr.setX(i, width - y);
        } else if (index === 1) {
            if (y === 0) positionAttr.setY(i, width - x);
            else if (y === height) positionAttr.setY(i, height - (width - x));
        } else if (index === 2) {
            if (x === 0) positionAttr.setX(i, height - y);
            else if (x === width) positionAttr.setX(i, width - (height - y));
        } else if (index === 3) {
            if (y === 0) positionAttr.setY(i, x);
            else if (y === height) positionAttr.setY(i, height - x);
        }

        const newX = positionAttr.getX(i);
        const newY = positionAttr.getY(i);

        if (index === 0 || index === 2) {
            uvAttr.setXY(i, newX * TEXTURE_SCALE, (newY + z) * TEXTURE_SCALE);
        } else {
            uvAttr.setXY(i, newY * TEXTURE_SCALE, (newX + z) * TEXTURE_SCALE);
        }
    }

    positionAttr.needsUpdate = true;
    uvAttr.needsUpdate = true;
    geometry.computeVertexNormals();
}

// The dark outline drawn on top of a frame side.
function createEdgeLines(geometry) {
    const edges = new THREE.EdgesGeometry(geometry);
    return new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: COLORS.edge }));
}

export function buildFrame() {
    disposeFrameMeshes();

    const { width, height } = state;
    const bottomLeft = new THREE.Vector3(0, 0, 0);
    const bottomRight = new THREE.Vector3(width, 0, 0);
    const topRight = new THREE.Vector3(width, height, 0);
    const topLeft = new THREE.Vector3(0, height, 0);

    pathArray = [
        new THREE.LineCurve3(bottomLeft, bottomRight),
        new THREE.LineCurve3(bottomRight, topRight),
        new THREE.LineCurve3(topRight, topLeft),
        new THREE.LineCurve3(topLeft, bottomLeft),
    ];

    pathArray.forEach((edge, index) => {
        const geometry = new THREE.ExtrudeGeometry(createFrameShape(), {
            bevelEnabled: false,
            extrudePath: edge,
        });

        remapFrameUVs(geometry, index, width, height);

        // Material is cloned per side so raycasting/selection works in the textured area.
        const mesh = new THREE.Mesh(geometry, textureMaterial.clone());
        mesh.add(createEdgeLines(geometry));
        scene.add(mesh);
        frameMeshes.push(mesh);
    });
}
