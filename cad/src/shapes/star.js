import * as THREE from 'three';

// A six-pointed star outline alternating between outer and inner radius.
export function createStar(centerX, centerY, outerRadius, innerRadius) {
    const points = [];
    for (let i = 0; i < 12; i++) {
        const angle = (i * (2 * Math.PI)) / 12;
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        points.push(new THREE.Vector3(radius * Math.cos(angle), radius * Math.sin(angle), 0));
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: '#000000' });
    const star = new THREE.LineLoop(geometry, material);
    star.position.set(centerX, centerY, 0);
    star.rotation.z = Math.PI / 6;
    return star;
}
