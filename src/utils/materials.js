import * as THREE from 'three';
import { MATERIAL_PRESETS } from './constants';

/**
 * Brushed-metal material shared by the handle parts. The color differs per
 * part (white backplate vs. blue lever), but the metalness/roughness "look"
 * is defined once in MATERIAL_PRESETS.metal.
 */
export function metalMaterial(color) {
    return new THREE.MeshPhysicalMaterial({ color, ...MATERIAL_PRESETS.metal });
}
