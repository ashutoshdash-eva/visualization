import * as THREE from 'three';

export function build2DMesh(shape, color = '#aaaaaa'){
    const geometry = new THREE.ShapeGeometry(shape);

    const material = new THREE.MeshBasicMaterial({
        color,
        side: THREE.DoubleSide
    });

    const mesh = new THREE.Mesh(geometry,material);

    return mesh;
}