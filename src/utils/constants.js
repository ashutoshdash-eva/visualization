import * as THREE from 'three';
export const frameW = 50;
export const beadW = 25;

export const width = 500;
export const height = 700;
export const offset = 15;

export const beadOffset = 35;

export const COLORS = {
    frame: '#5a3e2b',
    bead: '#f2e8dc',
    highlight: 0x00ffff,
    secondary: '#0400ff',
    edge: '#3e2a1f',
    glass: '#d6e9f0',
    plus: '#000000'
};

export const origin= new THREE.Vector2(500,350);
export const ox = origin.x;
export const oy = origin.y;
export const backPlateDepth = 10;
export const handleDepth = 10;
export const handleWidth = 40;
export const handleHeight = 150;
export const w = handleWidth/6;
export const h = handleHeight/16;