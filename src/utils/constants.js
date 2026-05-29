import * as THREE from 'three';

export const frameW = 50;
export const beadW = 15;
export const offset = 30;
export const beadOffset = 20;

export const COLORS = {
    frame: '#ffffff',
    bead: '#222222',
    highlight: 0x00ffff,
    secondary: '#0400ff',
    edge: '#3e2a1f',
    glass: '#d6e9f0',
    plus: '#000000'
};

export const state = {
    width: 500,
    height: 700,
    handleWidth: 40,
    handleHeight: 150,
    backPlateDepth: 10,
    handleDepth: 10,
    ghh: 350,
    side: 'right',
    orientation: 'left',
    placement: 'inside',
    viewType: 'normal',
};

export const width = state.width;
export const height = state.height;
export const ghh = state.ghh;
export const origin = new THREE.Vector2(state.width, state.ghh);
export const ox = origin.x;
export const oy = origin.y;
export const backPlateDepth = state.backPlateDepth;
export const handleDepth = state.handleDepth;
export const handleWidth = state.handleWidth;
export const handleHeight = state.handleHeight;
export const w = state.handleWidth / 6;
export const h = state.handleHeight / 16;
