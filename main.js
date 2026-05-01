import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color('#f0f0f0')
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(40, 25, 100);


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

const width = 300;
const height = 300;

const pathArray = [];
const p1 = new THREE.Vector3(0,0,0);
const p2 = new THREE.Vector3(width,0,0);
const p3 = new THREE.Vector3(width,height,0);
const p4 = new THREE.Vector3(0,height,0);

pathArray.push(new THREE.LineCurve3(p1,p2));
pathArray.push(new THREE.LineCurve3(p2,p3));
pathArray.push(new THREE.LineCurve3(p3,p4));
pathArray.push(new THREE.LineCurve3(p4,p1));

pathArray.forEach((edge,index) => {
    const geometry = new THREE.ExtrudeGeometry(createFrameShape(),{
        bevelEnabled: false,
        extrudePath: edge
    });
    const material = new THREE.MeshStandardMaterial({color:'#713737'})
    const mesh = new THREE.Mesh(geometry,material);
    scene.add(mesh);
});

const grdHlp = new THREE.GridHelper(500, 500);
scene.add(grdHlp);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 5);
dirLight.position.set(500, 1000, 1000);
scene.add(dirLight);

console.time("jhbvjhgvjh")

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

animate();
