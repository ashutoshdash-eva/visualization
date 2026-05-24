import * as THREE from 'three';
import { state } from '../utils/constants';

export function buildHandle() {
    const { handleWidth, handleHeight, backPlateDepth, handleDepth } = state;
    const w = handleWidth / 6;
    const h = handleHeight / 16;

    let backPlate;
    function createBackplate() {

        const r = (handleWidth / 6) * 2.2;

        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.absarc(0, 0, r, 3 * Math.PI / 2, Math.PI / 2, false);
        shape.lineTo(0, 4 * h);
        shape.lineTo(-2 * w, 4 * h);
        shape.lineTo(-2 * w, -4 * h);
        shape.lineTo(0, -4 * h);

        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: backPlateDepth,
            bevelEnabled: false,
            curveSegments: 100
        });
        const material = new THREE.MeshPhysicalMaterial({
            color: '#ffffff',
            metalness: 0.6,
            roughness: 0.0
        });
        backPlate = new THREE.Mesh(geometry, material);
    }
    createBackplate();

    function createScrew() {
        const r = Math.min(w / 2, h / 2);
        const shapeTop = new THREE.Shape();
        shapeTop.absarc(-w, 3 * h, r);
        const shapeBottom = new THREE.Shape();
        shapeBottom.absarc(-w, -3 * h, r);

        const geometry = new THREE.ExtrudeGeometry([shapeTop, shapeBottom], {
            depth: backPlateDepth + 0.4
        });
        const material = new THREE.MeshBasicMaterial({ color: '#868686' });
        const screw = new THREE.Mesh(geometry, material);
        backPlate.add(screw);
    }
    createScrew();

    function createHandle() {

        const r = Math.min(2 * w, 2 * h);
        const sphere = new THREE.Mesh(new THREE.SphereGeometry(r / 1.7, 320, 160, 0, Math.PI), new THREE.MeshPhysicalMaterial({
            color: '#ffffff',
            metalness: 0.6,
            roughness: 0.0
        }));
        sphere.position.set(0, -h / 3, handleDepth);

        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.absarc(0, 0, r, Math.PI / 4, 3 * Math.PI / 3.5, false);
        shape.bezierCurveTo(-4 * r, -h, 0, -r, 0, -3 * h);
        shape.lineTo(2 * w, -3 * h);
        shape.bezierCurveTo(2 * w, -2 * h, 3 * w, 0, r * Math.cos(Math.PI / 4), r * Math.sin(Math.PI / 4));

        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: handleDepth,
            bevelEnabled: false,
            curveSegments: 100
        });
        const material = new THREE.MeshPhysicalMaterial({
            color: '#546c83',
            metalness: 0.6,
            roughness: 0.0
        });
        const handle = new THREE.Mesh(geometry, material);
        handle.position.z += backPlateDepth;
        backPlate.add(handle);
        handle.add(sphere);

        const path = new THREE.CubicBezierCurve3(
            new THREE.Vector3(2 * w, -3 * h, 0),
            new THREE.Vector3(2 * w, -3.8 * h, 0),
            new THREE.Vector3(2 * w, -4.2 * h, 2 * handleDepth),
            new THREE.Vector3(2 * w, -7 * h, 2 * handleDepth)
        );

        const shape2 = new THREE.Shape();
        shape2.moveTo(0, 0);
        shape2.lineTo(2 * w, 0);
        shape2.lineTo(2 * w, handleDepth);
        shape2.lineTo(0, handleDepth);

        const handleGeo = new THREE.ExtrudeGeometry(shape2, {
            bevelEnabled: false,
            steps: 1000,
            extrudePath: path
        });
        const handleMat = new THREE.MeshPhysicalMaterial({
            color: '#546c83',
            metalness: 0.6,
            roughness: 0.0
        });
        const handleMesh = new THREE.Mesh(handleGeo, handleMat);
        handleMesh.position.z += handleDepth;
        handle.add(handleMesh);

        const shape3 = new THREE.Shape();
        shape3.moveTo(0, -8 * h);
        shape3.lineTo(0, -16 * h);
        shape3.absarc(w, -16 * h, w, Math.PI, 0, false);
        shape3.lineTo(2 * w, -8 * h);

        const arcGeo = new THREE.ExtrudeGeometry(shape3, {
            bevelEnabled: false,
            curveSegments: 100,
            depth: handleDepth
        });
        const arcMat = new THREE.MeshPhysicalMaterial({
            color: '#546c83',
            metalness: 0.6,
            roughness: 0.0
        });
        const arcMesh = new THREE.Mesh(arcGeo, arcMat);
        arcMesh.position.z += backPlateDepth;
        arcMesh.position.y += handleDepth;
        handleMesh.add(arcMesh);
    }
    createHandle();

    return backPlate;
}
