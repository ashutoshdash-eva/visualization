import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { FontLoader } from 'three/examples/jsm/Addons.js';
import { TTFLoader } from 'three/examples/jsm/Addons.js';
import { TextGeometry } from 'three/examples/jsm/Addons.js';
import { color } from 'three/tsl';
import { MOUSE } from 'three/webgpu';
import { ghh, state } from '../../src/utils/constants';
import { createShapeMesh } from './createShapeMesh';
import { addUpwardArrow } from './shapes/addUpwardArrow';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf0f0f0);


const windowWidth = state.width;
const windowHeight = state.height;

const biggestDimension = Math.max(windowWidth, windowHeight);

const height = 2.1 * biggestDimension;
const width = Math.SQRT2 * height;
const panelWidth = width * 0.35; // reused from propertybox
const boxHeight = height * 0.2; // reused from shapebox
const pdBoxW = width * 0.2; // reused from PDBox
const pdBoxH = height * 0.25; // reused from PDBox
const rightPdBox = pdBoxW + 3;
const margin = width * 0.005;

const centerX = (pdBoxW) + (width - panelWidth - pdBoxW) / 2;
const centerY = boxHeight + (height - boxHeight) / 2;

const left = centerX - (windowWidth / 2);
const right = centerX + (windowWidth / 2);

const bottom = centerY - (windowHeight / 2);
const top = centerY + (windowHeight / 2);
const dimOffset = Math.max(windowWidth, windowHeight) * 0.08;

const dimX = right + dimOffset;
const dimY = bottom - dimOffset;

const layout = {
    panelWidth: width * 0.35,
    pdBoxW: width * 0.2,
    pdBoxH: height * 0.25,
    boxHeight: height * 0.2,
};
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
const cameraDistance = Math.max(width, height) * 0.5
camera.position.set(width / 2, height / 2, cameraDistance);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(width / 2, height / 2, 0);
controls.mouseButtons = {
    LEFT: THREE.MOUSE.PAN,
    RIGHT: THREE.MOUSE.PAN
}
// controls.rotation.z = false;

function createDoubleBoundary() {
    const margin = width * 0.005;
    const points = [];

    const outerPoints = [
        new THREE.Vector3(-margin, -margin, 0),
        new THREE.Vector3(width + margin, -margin, 0),
        new THREE.Vector3(width + margin, height + margin, 0),
        new THREE.Vector3(-margin, height + margin, 0),
        new THREE.Vector3(-margin, -margin, 0)
    ];
    const innerPoints = [
        new THREE.Vector3(0, 0, 0),
        new THREE.Vector3(width, 0, 0),
        new THREE.Vector3(width, height, 0),
        new THREE.Vector3(0, height, 0),
        new THREE.Vector3(0, 0, 0)
    ];


    const material = new THREE.LineBasicMaterial({ color: '#000000' });

    const outerGeom = new THREE.BufferGeometry().setFromPoints(outerPoints);
    scene.add(new THREE.Line(outerGeom, material));

    const innerGeom = new THREE.BufferGeometry().setFromPoints(innerPoints);
    scene.add(new THREE.Line(innerGeom, material));
}

createDoubleBoundary();

function createPropertyBox() {
    const panelWidth = layout.panelWidth;
    const panelX = width - panelWidth;
    const points = [];
    points.push(
        new THREE.Vector3(panelX, 0, 0),
        new THREE.Vector3(panelX, height, 0)
    );

    const divisions = 10;
    const rowHeight = height / divisions;
    const mid = panelX + panelWidth / 2;
    const rightMid = mid + panelWidth / 4;

    points.push(
        new THREE.Vector3(panelX, rowHeight, 0),
        new THREE.Vector3(width, rowHeight, 0),

        new THREE.Vector3(panelX, 2 * rowHeight - rowHeight / 4, 0),
        new THREE.Vector3(mid, 2 * rowHeight - rowHeight / 4, 0),

        new THREE.Vector3(panelX, 3 * rowHeight - rowHeight / 2, 0),
        new THREE.Vector3(mid, 3 * rowHeight - rowHeight / 2, 0),

        new THREE.Vector3(panelX, 4 * rowHeight, 0),
        new THREE.Vector3(width, 4 * rowHeight, 0),

        new THREE.Vector3(panelX, 5 * rowHeight, 0),
        new THREE.Vector3(mid, 5 * rowHeight, 0),

        new THREE.Vector3(mid, 5 * rowHeight, 0),
        new THREE.Vector3(mid, 0, 0),

        new THREE.Vector3(rightMid, 4 * rowHeight, 0),
        new THREE.Vector3(rightMid, rowHeight, 0),

        new THREE.Vector3(panelX, 6 * rowHeight, 0),
        new THREE.Vector3(width, 6 * rowHeight, 0),

        new THREE.Vector3(panelX, 7 * rowHeight, 0),
        new THREE.Vector3(width, 7 * rowHeight, 0),

        new THREE.Vector3(panelX, 8 * rowHeight, 0),
        new THREE.Vector3(width, 8 * rowHeight, 0),

        new THREE.Vector3(panelX, 9 * rowHeight, 0),
        new THREE.Vector3(width, 9 * rowHeight, 0),

        new THREE.Vector3(mid, 9 * rowHeight, 0),
        new THREE.Vector3(mid, 8 * rowHeight, 0),

        new THREE.Vector3(rightMid, 3 * rowHeight - rowHeight / 2, 0),
        new THREE.Vector3(width, 3 * rowHeight - rowHeight / 2, 0),

    );

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#000000' });
    const propertyBox = new THREE.LineSegments(geometry, material);
    scene.add(propertyBox);
}

createPropertyBox();

function createPDBox() {
    const boxW = layout.pdBoxW;
    const boxH = layout.pdBoxH;

    const x = width * 0.01;
    const y = height - boxH - x;
    const radius = width * 0.015;
    const material = new THREE.LineBasicMaterial({ color: '#000000' });

    const pdBoxShape = new THREE.Shape();
    pdBoxShape.moveTo(x + radius, y);
    pdBoxShape.lineTo(x + boxW - radius, y);
    pdBoxShape.absarc(x + boxW - radius, y + radius, radius, (3 * Math.PI) / 2, 0, false);
    pdBoxShape.lineTo(x + boxW, y + boxH - radius);
    pdBoxShape.absarc(x + boxW - radius, y + boxH - radius, radius, 0, Math.PI / 2, false);
    pdBoxShape.lineTo(x + radius, y + boxH);
    pdBoxShape.absarc(x + radius, y + boxH - radius, radius, Math.PI / 2, Math.PI, false);
    pdBoxShape.lineTo(x, y + radius);
    pdBoxShape.absarc(x + radius, y + radius, radius, Math.PI, (3 * Math.PI) / 2, false);

    const shapePoints = pdBoxShape.getPoints(20);
    const frameGeom = new THREE.BufferGeometry().setFromPoints(shapePoints);
    scene.add(new THREE.Line(frameGeom, material));

    const points = [];
    const rowH = boxH / 4;
    points.push(
        new THREE.Vector3(x, y + rowH, 0),
        new THREE.Vector3(x + boxW, y + rowH, 0),

        new THREE.Vector3(x, y + 2 * rowH, 0),
        new THREE.Vector3(x + boxW, y + 2 * rowH, 0),

        new THREE.Vector3(x, y + 3 * rowH, 0),
        new THREE.Vector3(x + boxW, y + 3 * rowH, 0),

        new THREE.Vector3(x + boxW / 2, y, 0),
        new THREE.Vector3(x + boxW / 2, y + rowH, 0),

        new THREE.Vector3(x + boxW / 4, y + 2 * rowH, 0),
        new THREE.Vector3(x + boxW / 4, y + 3 * rowH, 0),

        new THREE.Vector3(x + 3 * boxW / 4, y + 2 * rowH, 0),
        new THREE.Vector3(x + 3 * boxW / 4, y + 3 * rowH, 0),
    );

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    scene.add(new THREE.LineSegments(geometry, material));
}

createPDBox();

function createShapeBox() {
    const boxWidth = width - width * 0.35;
    const boxHeight = height * 0.2;
    const points = [];
    const startX = 0;
    const startY = 0;
    points.push(
        new THREE.Vector3(startX, startY, 0),
        new THREE.Vector3(boxWidth, startY, 0),

        new THREE.Vector3(startX, boxHeight, 0),
        new THREE.Vector3(boxWidth, boxHeight, 0),

        new THREE.Vector3(startX, startY, 0),
        new THREE.Vector3(startX, boxHeight, 0),

        new THREE.Vector3(boxWidth, startY, 0),
        new THREE.Vector3(boxWidth, boxHeight, 0),
    );

    const slots = 5;
    const slotStep = boxWidth / slots;

    points.push(
        new THREE.Vector3(slotStep, startY, 0),
        new THREE.Vector3(slotStep, boxHeight, 0),

        new THREE.Vector3(2 * slotStep, startY, 0),
        new THREE.Vector3(2 * slotStep, boxHeight, 0),

        new THREE.Vector3(3 * slotStep, startY, 0),
        new THREE.Vector3(3 * slotStep, boxHeight, 0),

        new THREE.Vector3(4 * slotStep, startY, 0),
        new THREE.Vector3(4 * slotStep, boxHeight, 0),
    );

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#000000' });
    const shapeBox = new THREE.LineSegments(geometry, material);
    scene.add(shapeBox);

    const centerY = startY + (boxHeight - startY) / 2;
    addHexagon(slotStep * 0.5, centerY, (boxHeight / 2) * 0.8);
    addStar(slotStep * 1.5, centerY, (boxHeight / 2) * 0.8, ((boxHeight / 2) * 0.8) / 1.75);
    addArrow(slotStep * 2.5, centerY, boxHeight);
    addLeftArrow(slotStep * 3.5, centerY, boxHeight);
    addRightArrow(slotStep * 4.5, centerY, boxHeight);
    // const upwardArrowPoints = addUpwardArrow(slotStep * 2.5, centerY, boxHeight);
    // const upwardArrowMesh = createShapeMesh(upwardArrowPoints);



}

createShapeBox();


function addHexagon(centerX, centerY, radius) {
    const points = [];
    for (let i = 0; i < 6; i++) {
        const angle = i * (2 * Math.PI) / 6;
        points.push(
            // new THREE.Vector3(centerX+radius*Math.cos(angle),centerY+radius*Math.sin(angle),0)
            new THREE.Vector3(radius * Math.cos(angle), radius * Math.sin(angle), 0)
        );
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#000000' });
    const hex = new THREE.LineLoop(geometry, material);
    hex.position.set(centerX, centerY, 0);
    hex.rotation.z = Math.PI / 6;
    scene.add(hex);
}

function addStar(centerX, centerY, outerR, innerR) {
    const points = [];
    for (let i = 0; i < 12; i++) {
        const angle = i * (2 * Math.PI) / 12;
        const radius = (i % 2 === 0) ? outerR : innerR;
        points.push(
            new THREE.Vector3(radius * Math.cos(angle), radius * Math.sin(angle), 0)
        );
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#000000' });
    const star = new THREE.LineLoop(geometry, material);
    star.position.set(centerX, centerY, 0);
    star.rotation.z = Math.PI / 6;
    scene.add(star);
}

function addArrow(centerX, centerY, boxHeight) {
    const arrowHeight = boxHeight * 0.7;
    const headSize = arrowHeight * 0.2;

    const topY = centerY + (0.5 * arrowHeight);
    const bottomY = centerY - (0.5 * arrowHeight)
    const points = [];
    points.push(
        new THREE.Vector3(centerX, bottomY, 0),
        new THREE.Vector3(centerX, topY, 0),
        new THREE.Vector3(centerX - headSize, centerY + headSize),
        new THREE.Vector3(centerX, topY, 0),
        new THREE.Vector3(centerX + headSize, centerY + headSize)
    );

    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#000000' });
    const arrow = new THREE.Line(geometry, material);
    scene.add(arrow);
}



function addRightArrow(centerX, centerY, boxHeight) {
    const arrowHeight = boxHeight / 3;
    const arrowWidth = boxHeight * 0.7;
    const points = [];
    points.push(
        new THREE.Vector3(centerX - arrowWidth / 2, centerY + arrowHeight * 0.5, 0),
        new THREE.Vector3(centerX - arrowWidth / 2, centerY - arrowHeight * 0.5, 0),
        new THREE.Vector3((centerX - arrowWidth / 2) + arrowWidth * 0.6, centerY - arrowHeight * 0.5, 0),
        new THREE.Vector3((centerX - arrowWidth / 2) + arrowWidth * 0.6, (centerY - arrowHeight * 0.5) - 0.5 * arrowHeight, 0),
        new THREE.Vector3(centerX + arrowWidth / 2, centerY, 0),
        new THREE.Vector3(centerX + arrowWidth / 2, centerY, 0),
        new THREE.Vector3((centerX - arrowWidth / 2) + arrowWidth * 0.6, (centerY + arrowHeight * 0.5) + 0.5 * arrowHeight, 0),
        new THREE.Vector3(((centerX - arrowWidth / 2) + arrowWidth * 0.6), (centerY + arrowHeight) - 0.5 * arrowHeight, 0),
        new THREE.Vector3(centerX - arrowWidth / 2, centerY + arrowHeight * 0.5, 0),

    );
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#000000' });
    const arrow = new THREE.Line(geometry, material);
    scene.add(arrow);
}

function addLeftArrow(centerX, centerY, boxHeight) {
    const arrowHeight = boxHeight / 3;
    const arrowWidth = boxHeight * 0.7;
    const points = [];
    points.push(
        new THREE.Vector3(- arrowWidth / 2, +arrowHeight * 0.5, 0),
        new THREE.Vector3(- arrowWidth / 2, -arrowHeight * 0.5, 0),
        new THREE.Vector3((- arrowWidth / 2) + arrowWidth * 0.6, -arrowHeight * 0.5, 0),
        new THREE.Vector3((- arrowWidth / 2) + arrowWidth * 0.6, (-arrowHeight * 0.5) - 0.5 * arrowHeight, 0),
        new THREE.Vector3(+ arrowWidth / 2, 0, 0),
        new THREE.Vector3(+ arrowWidth / 2, 0, 0),
        new THREE.Vector3((- arrowWidth / 2) + arrowWidth * 0.6, (+arrowHeight * 0.5) + 0.5 * arrowHeight, 0),
        new THREE.Vector3(((- arrowWidth / 2) + arrowWidth * 0.6), (+arrowHeight) - 0.5 * arrowHeight, 0),
        new THREE.Vector3(- arrowWidth / 2, +arrowHeight * 0.5, 0),

    );
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#000000' });
    const arrow = new THREE.Line(geometry, material);
    arrow.position.set(centerX, centerY, 0);
    arrow.rotation.z = Math.PI;
    scene.add(arrow);
}

function addWindow(windowWidth = 100, windowHeight = 100) {

    const centerX = (pdBoxW) + (width - panelWidth - pdBoxW) / 2;
    const centerY = boxHeight + (height - boxHeight) / 2;

    const points = [];

    // const x = (width - panelWidth) / 2;
    // const y = (height - boxHeight) / 2;

    // const left = centerX + (x - windowWidth / 2);
    // const right = centerX + (x + windowWidth / 2);

    // const bottom = centerY + (y - windowHeight / 2);
    // const top = centerY + (y + windowHeight / 2);

    const left = centerX - (windowWidth / 2);
    const right = centerX + (windowWidth / 2);

    const bottom = centerY - (windowHeight / 2);
    const top = centerY + (windowHeight / 2);

    const h1 = Math.max(windowWidth, windowHeight) * 0.05;
    // const h1 = 30;
    const bw = h1 * 0.5;

    points.push(
        //Frame
        new THREE.Vector3(left, bottom, 0),
        new THREE.Vector3(left, top, 0),

        new THREE.Vector3(left, top, 0),
        new THREE.Vector3(right, top, 0),

        new THREE.Vector3(right, top, 0),
        new THREE.Vector3(right, bottom, 0),

        new THREE.Vector3(right, bottom, 0),
        new THREE.Vector3(left, bottom, 0),

        new THREE.Vector3(left + h1, bottom + h1, 0),
        new THREE.Vector3(left + h1, top - h1, 0),

        new THREE.Vector3(left + h1, top - h1, 0),
        new THREE.Vector3(right - h1, top - h1, 0),

        new THREE.Vector3(right - h1, top - h1, 0),
        new THREE.Vector3(right - h1, bottom + h1, 0),

        new THREE.Vector3(right - h1, bottom + h1, 0),
        new THREE.Vector3(left + h1, bottom + h1, 0),

        //Bead
        new THREE.Vector3(left + h1 + bw, bottom + h1, 0),
        new THREE.Vector3(left + h1 + bw, top - h1, 0),

        new THREE.Vector3(left + h1 + bw, top - h1 - bw, 0),
        new THREE.Vector3(right - h1 - bw, top - h1 - bw, 0),

        new THREE.Vector3(right - h1 - bw, top - h1, 0),
        new THREE.Vector3(right - h1 - bw, bottom + h1, 0),

        new THREE.Vector3(right - h1 - bw, bottom + h1 + bw, 0),
        new THREE.Vector3(left + h1 + bw, bottom + h1 + bw, 0),

        //Frame cut 
        new THREE.Vector3(left, bottom, 0),
        new THREE.Vector3(left + h1, bottom + h1, 0),

        new THREE.Vector3(left, top, 0),
        new THREE.Vector3(left + h1, top - h1, 0),

        new THREE.Vector3(right, bottom, 0),
        new THREE.Vector3(right - h1, bottom + h1, 0),

        new THREE.Vector3(right, top, 0),
        new THREE.Vector3(right - h1, top - h1, 0)
    );

    const geometry = new THREE.BufferGeometry().setFromPoints(points);

    const material = new THREE.LineBasicMaterial({
        color: '#838383'
    });

    const windowShape = new THREE.LineSegments(geometry, material);

    scene.add(windowShape);

    const dashedGeometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(left, centerY - windowWidth * 0.01, 0), new THREE.Vector3(right, centerY - windowWidth * 0.01, 0),
        new THREE.Vector3(centerX - windowHeight * 0.01, top, 0), new THREE.Vector3(centerX - windowHeight * 0.01, bottom, 0)
    ]);
    const dashedMaterial = new THREE.LineDashedMaterial({ color: '#000000', dashSize: Math.max(windowWidth, windowHeight) * 0.01, gapSize: Math.max(windowWidth, windowHeight) * 0.007 });

    scene.add(new THREE.LineSegments(dashedGeometry, dashedMaterial).computeLineDistances());

    const dimOffset = Math.max(windowWidth, windowHeight) * 0.08;
    const tickSize = dimOffset * 0.4;

    const dimY = bottom - dimOffset;
    const bottomDimPoints = [
        new THREE.Vector3(left, dimY, 0), new THREE.Vector3(centerX - dimOffset, dimY, 0),
        new THREE.Vector3(centerX + dimOffset, dimY, 0), new THREE.Vector3(right, dimY, 0),
        new THREE.Vector3(left, dimY - tickSize, 0), new THREE.Vector3(left, dimY + tickSize, 0),
        new THREE.Vector3(right, dimY - tickSize, 0), new THREE.Vector3(right, dimY + tickSize, 0)
    ];
    scene.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(bottomDimPoints), new THREE.LineBasicMaterial({ color: '#000000' })));

    const dimX = right + dimOffset;
    const rightDimPoints = [
        new THREE.Vector3(dimX, top, 0), new THREE.Vector3(dimX, centerY + dimOffset, 0),
        new THREE.Vector3(dimX, centerY - dimOffset, 0), new THREE.Vector3(dimX, bottom, 0),
        new THREE.Vector3(dimX + tickSize, top, 0), new THREE.Vector3(dimX - tickSize, top, 0),
        new THREE.Vector3(dimX - tickSize, bottom, 0), new THREE.Vector3(dimX + tickSize, bottom, 0)
    ];
    scene.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(rightDimPoints), new THREE.LineBasicMaterial({ color: '#000000' })));

    const plusSize = Math.min(windowWidth, windowHeight) * 0.05;
    const plusPoints = [
        new THREE.Vector3(centerX, centerY - plusSize, 0), new THREE.Vector3(centerX, centerY + plusSize, 0),
        new THREE.Vector3(centerX - plusSize, centerY, 0), new THREE.Vector3(centerX + plusSize, centerY, 0)
    ];
    scene.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(plusPoints), new THREE.LineBasicMaterial({ color: '#000000' })));

    return {
        centerX,
        centerY
    }

}
export const data = addWindow(windowWidth, windowHeight);
// console.log(data);

const ox = data.centerX;
const oy = data.centerY;

function addHandle() {
    const handleWidth = 40;
    const handleHeight = 150;
    const r = (handleWidth / 6) * 2.2;
    const w = handleWidth / 6;
    const h = handleHeight / 16

    const handleGroup = new THREE.Group();
    const lineMat = new THREE.LineBasicMaterial({color:'#000000'});
    const fillMat = new THREE.MeshBasicMaterial({ color: '#f0f0f0' });

    const backPlate = new THREE.Path();
    backPlate.absarc(0, 0, r*1.1, 3 * Math.PI / 2, Math.PI / 2, false);
    backPlate.lineTo(0, 4 * h);
    backPlate.lineTo(-2 * w, 4 * h);
    backPlate.lineTo(-2 * w, -4 * h);
    backPlate.lineTo(0, -4 * h);
    backPlate.closePath();

    const shapePoints = backPlate.getPoints(20);
    const backPlateGeom = new THREE.BufferGeometry().setFromPoints(shapePoints);
    const backPlateLine = new THREE.Line(backPlateGeom, lineMat);
    backPlateLine.position.z = 0;
    handleGroup.add(backPlateLine);

    const shape = new THREE.Shape();
    shape.absarc(0, 0, r, Math.PI / 4, 3 * Math.PI / 3.5, false);
    shape.bezierCurveTo(-4 * r, -h, 0, -r, 0, -3 * h);
    shape.lineTo(0,-12*h);
    shape.absarc(r/2,-12*h,r/2,Math.PI,0,false);
    shape.lineTo(2 * w, -3 * h);
    shape.bezierCurveTo(2 * w, -2 * h, 3 * w, 0, r * Math.cos(Math.PI / 4), r * Math.sin(Math.PI / 4));
    
    const holePath = new THREE.Path();
    holePath.absarc(0, 0, r / 2, 0, Math.PI * 2, false);
    
    const handleFillGeo = new THREE.ShapeGeometry(shape,50);
    const handle = new THREE.Mesh(handleFillGeo,fillMat);
    handle.position.z = 0.5;
    handleGroup.add(handle); 
    const shapePoints1 = shape.getPoints(50);
    const handleGeom = new THREE.BufferGeometry().setFromPoints(shapePoints1);
    const handleLine = new THREE.Line(handleGeom,lineMat)
    handleLine.position.z = 1.1;
    handleGroup.add(handleLine);

    const shapePoints2 = holePath.getPoints(20);
    const holeGeom = new THREE.BufferGeometry().setFromPoints(shapePoints2);
    const holeMesh = new THREE.Line(holeGeom,lineMat)
    holeMesh.position.z = 1.1;
    handleGroup.add(holeMesh);

    return handleGroup;
}
const handleMeshGroup = addHandle();
const mountSide = localStorage.getItem('mount-side') ?? 'right';
switch(mountSide){
    case 'left':
        handleMeshGroup.position.set(left,bottom+ghh);
        break;
    case 'right':
        handleMeshGroup.position.set(right,bottom+ghh);
        break;
    case 'top':
        handleMeshGroup.position.set(left+ghh,top);
        handleMeshGroup.rotation.z = Math.PI/2;
        break;
    case 'bottom':
        handleMeshGroup.position.set(left+ghh,bottom);
        handleMeshGroup.rotation.z = 3*Math.PI/2;
        break;
    default:
        handleMeshGroup.position.set(right,bottom+ghh);
}
scene.add(handleMeshGroup);

// const ttfLoader = new TTFLoader();
const loader = new FontLoader();
const font = await loader.loadAsync('/fonts/helvetiker_regular.typeface.json');

function addText(text, x, y, size = height * 0.012, color = '#000000') {

    const geometry = new TextGeometry(text, {
        font: font,
        size: size,
        depth: 0,
        curveSegments: 12
    });

    const material = new THREE.MeshBasicMaterial({ color: color });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, 0);
    scene.add(mesh);
}
const textItems = [
    {
        text: 'Design Name:-',
        x: width - panelWidth + panelWidth * 0.02,
        y: height - height * 0.02,
    },
    {
        text: 'Org name:-',
        x: width - panelWidth + panelWidth * 0.02,
        y: height - height * 0.12,
    },
    {
        text: 'Project Id:-',
        x: width - panelWidth + panelWidth * 0.52,
        y: height - height * 0.12,
    },
    {
        text: 'Lorem ipsum...',
        x: width - panelWidth + panelWidth * 0.02,
        y: height - height * 0.22,
        color: '#636262',
    },
    {
        text: 'Design Details:-',
        x: width - panelWidth + panelWidth * 0.02,
        y: height - height * 0.32,
    },
    {
        text: 'Date:-',
        x: width - panelWidth + panelWidth * 0.02,
        y: height - height * 0.52,
    },
    {
        text: 'Developer\nName:-',
        x: width - panelWidth + panelWidth * 0.77,
        y: height - height * 0.62,
    },
    {
        text: 'Hardware details:-',
        x: width - panelWidth + panelWidth * 0.02,
        y: height - height * 0.62,
    },
    {
        text: 'Design dimensions:-',
        x: width - panelWidth + panelWidth * 0.02,
        y: height - height * 0.77,
    },
    {
        text: 'Scale factor:-',
        x: width - panelWidth + panelWidth * 0.02,
        y: height - height * 0.845,
    },
    {
        text: 'Signature:-',
        x: width - panelWidth + panelWidth * 0.02,
        y: height - height * 0.92,
    },
    {
        text: 'Ashutosh Dash',
        x: pdBoxW - pdBoxW / 1.55,
        y: height - pdBoxH * 0.2,
    },
    {
        text: 'EvA/304',
        x: pdBoxW - pdBoxW / 1.75,
        y: height - pdBoxH * 0.4,
    },
    {
        text: 'Configurator Developer',
        x: pdBoxW - pdBoxW / 1.35,
        y: height - pdBoxH * 0.65,
    },
    {
        text: `${windowWidth}`,
        x: centerX - dimOffset / 2,
        y: dimY - dimOffset * 0.12,
    },
    {
        text: `${windowHeight}`,
        x: dimX - dimOffset * 0.5,
        y: centerY - dimOffset / 5,
    },
];
textItems.forEach(({ text, x, y }) => {
    addText(text, x, y);
});




window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.render(scene, camera);
});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
}
animate();