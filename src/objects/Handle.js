import * as THREE from 'three';
import { scene } from '../scene/setupScene';
import { origin, ox, oy, handleDepth, handleWidth, handleHeight, w, h } from '../utils/constants';

export function buildHandle() {
    function createBackplate() {

        const r = (handleWidth / 6) * 2.2;

        const shape = new THREE.Shape();
        shape.moveTo(ox, oy);
        shape.absarc(ox, oy, r, 3 * Math.PI / 2, Math.PI / 2, false);
        shape.lineTo(ox, oy + 4 * h);
        shape.lineTo(ox - 2 * w, oy + 4 * h);
        shape.lineTo(ox - 2 * w, oy - 4 * h);
        shape.lineTo(ox, oy - 4 * h);

        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: handleDepth,
            // bevelThickness:0.4
            bevelEnabled: false,
            curveSegments:100
            // bevelSegments:10
        });
        const material = new THREE.MeshPhysicalMaterial({
            color:'#ffffff',
            metalness:0.6,
            roughness:0.0
        });
        const backPlate = new THREE.Mesh(geometry, material);
        scene.add(backPlate);


    }
    createBackplate();

    function createScrew() {
        const r = Math.min(w / 2, h / 2);
        const shapeTop = new THREE.Shape();
        shapeTop.absarc(ox - w, oy + 3 * h, r);
        const shapeBottom = new THREE.Shape();
        shapeBottom.absarc(ox - w, oy - 3 * h, r);


        const geometry = new THREE.ExtrudeGeometry([shapeTop, shapeBottom], {
            depth: handleDepth + 0.4
        })
        const material = new THREE.MeshBasicMaterial({ color: '#868686' })
        const screw = new THREE.Mesh(geometry, material);
        scene.add(screw);
    }
    createScrew();

    function createHandle() {

        const r = Math.min(2 * w, 2 * h);
        const sphere = new THREE.Mesh(new THREE.SphereGeometry(r / 1.3, 320, 160, 0, Math.PI), new THREE.MeshPhysicalMaterial({
            color:'#ffffff',
            metalness:0.6,
            roughness:0.0
    }));
        sphere.position.set(ox, oy, handleDepth / 3);

        const shape = new THREE.Shape();
        shape.moveTo(ox, oy);
        shape.absarc(ox, oy, r, 0, 3 * Math.PI / 3.5, false);
        // shape.quadraticCurveTo(ox-3.5*r,oy,ox,oy-r);
        shape.bezierCurveTo(ox - 4 * r, oy, ox, oy - r, ox, oy - 4 * h);
        // shape.quadraticCurveTo(0,-r,0,0);
        // shape.bezierCurveTo(ox,oy-15*r,ox+r,oy-15*r,ox+r,oy);

        shape.lineTo(ox + 2 * w, oy - 4 * h);
        // shape.lineTo(ox,oy-15*h);
        // shape.absarc(ox+w,oy-15*h,w,Math.PI,0,false);


        const geometry = new THREE.ExtrudeGeometry(shape, {
            depth: handleDepth,
            // bevelThickness:0.4
            bevelEnabled: false,
            // bevelSegments:10,
            curveSegments: 100
        });
        const material = new THREE.MeshPhysicalMaterial({
            color:'#546c83',
            metalness:0.6,
            roughness:0.0
        });
        const handle = new THREE.Mesh(geometry, material);
        handle.position.z += handleDepth;
        scene.add(handle);
        handle.add(sphere);

        // const points = [
        //     new THREE.Vector3(ox + 2 * w, oy - 4 * h, 0),
        //     new THREE.Vector3(ox + 2 * w, oy - 5 * h, 0),
        //     new THREE.Vector3(ox + 2 * w, oy - 7 * h, 2*handleDepth),
        //     new THREE.Vector3(ox + 2 * w, oy - 15 * h, 2*handleDepth)
        // ];

        // const path = new THREE.CatmullRomCurve3(points);

        const path = new THREE.CubicBezierCurve3(
            new THREE.Vector3(ox + 2 * w, oy - 4 * h, 0),
            new THREE.Vector3(ox + 2 * w, oy - 5 * h, 0),
            new THREE.Vector3(ox + 2 * w, oy - 6 * h, 2*handleDepth),
            new THREE.Vector3(ox + 2 * w, oy - 8 * h, 2*handleDepth)
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
            color:'#546c83',
            metalness:0.6,
            roughness:0.0
        });
        const handleMesh = new THREE.Mesh(handleGeo, handleMat);
        handleMesh.position.z += handleDepth;
        handle.add(handleMesh);

        const shape3 = new THREE.Shape();
        shape3.moveTo(ox, oy - 9 * h);
        shape3.lineTo(ox, oy - 16 * h);
        shape3.absarc(ox + w, oy - 16 * h, w, Math.PI, 0, false);
        shape3.lineTo(ox + 2 * w, oy - 9 * h);

        const arcGeo = new THREE.ExtrudeGeometry(shape3, {
            bevelEnabled: false,
            curveSegments: 100,
            depth: handleDepth
        })
        const arcMat = new THREE.MeshPhysicalMaterial({
            color:'#546c83',
            metalness:0.6,
            roughness:0.0
        });
        const arcMesh = new THREE.Mesh(arcGeo, arcMat);
        arcMesh.position.z += handleDepth * 3;
        arcMesh.position.y += handleDepth
        scene.add(arcMesh);
    }
    createHandle();
}