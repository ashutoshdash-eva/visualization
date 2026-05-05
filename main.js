import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color('#f0f0f0')
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(251, 331, 487);
// camera.lookAt(250,350,0);

const frameMeshes = [];
const beadMeshes = [];

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

function createBeadShape(w = 25, h = 35, t = 3, r = 12) {
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

const width = 500;
const height = 700;
const offset = 15;
const beadWidth = width - 2 * offset;
const beadHeight = height - 2 * offset;
const beadOffset = 35;
controls.target.set(width/2,height/2,0);

//#region Frame
const pathArray = [];
const p1 = new THREE.Vector3(0, 0, 0);
const p2 = new THREE.Vector3(width, 0, 0);
const p3 = new THREE.Vector3(width, height, 0);
const p4 = new THREE.Vector3(0, height, 0);

pathArray.push(new THREE.LineCurve3(p1, p2));
pathArray.push(new THREE.LineCurve3(p2, p3));
pathArray.push(new THREE.LineCurve3(p3, p4));
pathArray.push(new THREE.LineCurve3(p4, p1));
//#endregion

//#region Bead
const bp1 = new THREE.Vector3(offset, offset, 0);
const bp2 = new THREE.Vector3(offset + beadWidth, offset, 0);
const bp3 = new THREE.Vector3(offset + beadWidth, offset + beadHeight, 0);
const bp4 = new THREE.Vector3(offset, offset + beadHeight, 0);

const beadPathArray = [
    new THREE.LineCurve3(bp1, bp2),
    new THREE.LineCurve3(bp2, bp3),
    new THREE.LineCurve3(bp3, bp4),
    new THREE.LineCurve3(bp4, bp1)
]
//#endregion


//#region Frame CVM
pathArray.forEach((edge, index) => {
    // if (index != 2) return;
    const geometry = new THREE.ExtrudeGeometry(createFrameShape(), {
        bevelEnabled: false,
        extrudePath: edge
    });
    const material = new THREE.MeshStandardMaterial({ color: '#5a3e2b' })
    // console.log(geometry.attributes.position);
    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
        let x = pos.getX(i);
        let y = pos.getY(i);

        if (index === 0) {
            if (x === 0) pos.setX(i, y);
            else if (x === width) pos.setX(i, width - y);
        }
        else if (index === 1) {
            if (y === 0) pos.setY(i, width - x);
            else if (y === height) pos.setY(i, height - (width - x));
        }
        else if (index === 2) {
            if (x === 0) pos.setX(i, height - y);
            else if (x === width) pos.setX(i, width - (height - y));
        }
        else if (index === 3) {
            if (y === 0) pos.setY(i, x);
            else if (y === height) pos.setY(i, height - x);
        }
    }

    pos.needsUpdate = true;
    geometry.computeVertexNormals();

    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: '#3e2a1f' }));
    scene.add(line);
    const mesh = new THREE.Mesh(geometry, material);
    // if(index === 0)
    // // mesh.position.z += 100;
    scene.add(mesh);

    frameMeshes.push(mesh);

});
//#endregion


//#region Bead CVM
beadPathArray.forEach((edge, index) => {
    const geometry = new THREE.ExtrudeGeometry(createBeadShape(), {
        bevelEnabled: false,
        extrudePath: edge,
        curveSegments: 120
    });
    const material = new THREE.MeshStandardMaterial({ color: '#f2e8dc' });

    const pos = geometry.attributes.position;
    for (let i = 0; i < pos.count; i++) {
        const x = pos.getX(i);
        const y = pos.getY(i);

        if (index === 0) {
            if (x === offset) pos.setX(i, x + beadOffset);
            else if (x === offset + beadWidth) pos.setX(i, (offset + beadWidth) - beadOffset);
        }
        else if (index === 2) {
            if (x === offset) pos.setX(i, x + beadOffset);
            else if (x === offset + beadWidth) pos.setX(i, (offset + beadWidth) - beadOffset);
        }

    }
    //#endregion

    pos.needsUpdate = true;
    geometry.computeVertexNormals();

    const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial({ color: '#3e2a1f' }));
    scene.add(line);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    beadMeshes.push(mesh);
});


const grdHlp = new THREE.GridHelper(500, 500);
scene.add(grdHlp);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 5);
dirLight.position.set(500, 1000, 1000);
scene.add(dirLight);

// console.time("jhbvjhgvjh");


//#region Raycaster
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

const originalFrameColor = new THREE.Color('#5a3e2b');
const originalBeadColor = new THREE.Color('#f2e8dc');

window.addEventListener('dblclick', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const objectsToCheck = [...frameMeshes, ...beadMeshes];
    const intersects = raycaster.intersectObjects(objectsToCheck);

    if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        // clickedMesh.material.color.set('#111111');
        if (frameMeshes.includes(clickedMesh)) {
            frameMeshes.forEach((mesh) => {
                if (mesh === clickedMesh) {
                    mesh.material.color.set('#00ffff');
                }
                else {
                    mesh.material.color.set('#0400ff');
                }
            });

            beadMeshes.forEach((mesh) => {
                mesh.material.color.set(originalBeadColor);
            });
        }
        else if (beadMeshes.includes(clickedMesh)) {
            beadMeshes.forEach((mesh) => {
                if (mesh === clickedMesh) {
                    mesh.material.color.set('#00ffff');
                }
                else {
                    mesh.material.color.set('#0400ff');
                }
            });

            frameMeshes.forEach((mesh) => {
                mesh.material.color.set(originalFrameColor);
            });
        }
    }
    else {
        frameMeshes.forEach((mesh) => {
            mesh.material.color.set(originalFrameColor);
        });
        beadMeshes.forEach((mesh) => {
            mesh.material.color.set(originalBeadColor);
        });
    }

});
//#endregion

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
    // console.log(camera.position);
    // // console.log(camera.lookAt);
    // // console.log(camera);
    // console.log(controls.target);
}

animate();

console.log(camera.position);

// console.log(scene.children);

