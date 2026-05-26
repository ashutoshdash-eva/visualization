import * as THREE from 'three'

export function createShapeMesh(points){
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ color: '#000000' });
        const mesh= new THREE.Line(geometry, material);
}