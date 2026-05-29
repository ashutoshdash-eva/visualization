import * as THREE from 'three';
import { state } from '../utils/constants';


export function buildHandle() {
    const { handleWidth, handleHeight, backPlateDepth, handleDepth } = state;
    const widthSegments = handleWidth / 6;
    const heightSegments = handleHeight / 16;

    function createBackplate() {

        const r = (handleWidth / 6) * 2.2;

        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.absarc(0, 0, r, 3 * Math.PI / 2, Math.PI / 2, false);
        shape.lineTo(0, 4 * heightSegments);
        shape.lineTo(-2 * widthSegments, 4 * heightSegments);
        shape.lineTo(-2 * widthSegments, -4 * heightSegments);
        shape.lineTo(0, -4 * heightSegments);

        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: backPlateDepth,
            bevelEnabled: false,
        });
        const material = new THREE.MeshPhysicalMaterial({
            color: '#ffffff',
            metalness: 0.6,
            roughness: 0.0
        });
        const backPlate = new THREE.Mesh(geometry, material);
        const handle = createHandle();
        const screw = createScrew();
        backPlate.add(handle);
        backPlate.add(screw);
        return backPlate;
    }
    // createBackplate();

    function createScrew() {
        const r = Math.min(widthSegments / 2, heightSegments / 2);

        const shapeTop = new THREE.Shape();
        shapeTop.absarc(-widthSegments, 3 * heightSegments, r);
        const shapeBottom = new THREE.Shape();
        shapeBottom.absarc(-widthSegments, -3 * heightSegments, r);

        const geometry = new THREE.ExtrudeGeometry([shapeTop, shapeBottom], {
            depth: backPlateDepth
        });
        const material = new THREE.MeshBasicMaterial({ color: '#868686' });
        const screw = new THREE.Mesh(geometry, material);

        const plusGroup = new THREE.Group();
        const plusMat = new THREE.MeshBasicMaterial({ color: '#000000' });


        const slotLength = r * 1.2;
        const slotThickness = r * 0.2;
        const slotDepth = 0.5;


        const horizGeom = new THREE.BoxGeometry(slotLength, slotThickness, slotDepth);
        const horizMesh = new THREE.Mesh(horizGeom, plusMat);

        const vertGeom = new THREE.BoxGeometry(slotThickness, slotLength, slotDepth);
        const vertMesh = new THREE.Mesh(vertGeom, plusMat);
        plusGroup.add(horizMesh, vertMesh);
        plusGroup.position.set(-widthSegments, 3 * heightSegments, backPlateDepth + (slotDepth / 2));
        screw.add(plusGroup);

        const bottomPlusGroup = plusGroup.clone();
        bottomPlusGroup.position.set(-widthSegments, -3 * heightSegments, backPlateDepth + (slotDepth / 2));
        screw.add(bottomPlusGroup);

        return screw;
    }



    function createHandle() {

        const r = Math.min(2 * widthSegments, 2 * heightSegments);
        const sphere = new THREE.Mesh(new THREE.SphereGeometry(r / 1.7, 320, 160, 0, Math.PI), new THREE.MeshPhysicalMaterial({
            color: '#ffffff',
            metalness: 0.6,
            roughness: 0.0
        }));
        sphere.position.set(0, -heightSegments / 3, handleDepth);

        const shape = new THREE.Shape();
        shape.moveTo(0, 0);
        shape.absarc(0, 0, r, Math.PI / 4, 3 * Math.PI / 3.5, false);
        shape.bezierCurveTo(-4 * r, -heightSegments, 0, -r, 0, -3 * heightSegments);
        shape.lineTo(2 * widthSegments, -3 * heightSegments);
        shape.bezierCurveTo(2 * widthSegments, -2 * heightSegments, 3 * widthSegments, 0, r * Math.cos(Math.PI / 4), r * Math.sin(Math.PI / 4));
        // shape.bezierCurveTo(r * Math.cos(Math.PI / 4), r * Math.sin(Math.PI / 4),r * Math.cos(Math.PI / 3.7), r * Math.sin(Math.PI / 3.7),r * Math.cos(Math.PI / 3.5), r * Math.sin(Math.PI / 3.5));


        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: handleDepth,
            bevelEnabled: false
            // curveSegments: 100
        });
        const material = new THREE.MeshPhysicalMaterial({
            color: '#546c83',
            metalness: 0.6,
            roughness: 0.0
        });
        const handle = new THREE.Mesh(geometry, material);
        handle.position.z += backPlateDepth;
        handle.add(sphere);

        const path = new THREE.CubicBezierCurve3(
            new THREE.Vector3(2 * widthSegments, -3 * heightSegments, 0),
            new THREE.Vector3(2 * widthSegments, -3.8 * heightSegments, 0),
            new THREE.Vector3(2 * widthSegments, -4.2 * heightSegments, 2 * handleDepth),
            new THREE.Vector3(2 * widthSegments, -7 * heightSegments, 2 * handleDepth)
        );

        const shape2 = new THREE.Shape();
        shape2.moveTo(0, 0);
        shape2.lineTo(2 * widthSegments, 0);
        shape2.lineTo(2 * widthSegments, handleDepth);
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
        shape3.moveTo(0, -7 * heightSegments);
        shape3.lineTo(0, -16 * heightSegments);
        shape3.absarc(widthSegments, -16 * heightSegments, widthSegments, Math.PI, 0, false);
        shape3.lineTo(2 * widthSegments, -7 * heightSegments);

        const arcGeo = new THREE.ExtrudeGeometry(shape3, {
            bevelEnabled: false,
            depth: handleDepth
        });
        const arcMat = new THREE.MeshPhysicalMaterial({
            color: '#546c83',
            metalness: 0.6,
            roughness: 0.0
        });
        const arcMesh = new THREE.Mesh(arcGeo, arcMat);
        arcMesh.position.z += handleDepth;
        // arcMesh.position.y += handleDepth;
        handleMesh.add(arcMesh);
        return handle;


    }
    const backPlate = createBackplate();


    return backPlate;
}
