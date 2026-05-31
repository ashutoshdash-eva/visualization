import { state } from '../../utils/constants';
import { createBackplate } from './backplate';

// Derived handle dimensions shared by every part, passed around as `dims`:
//   widthSegments / heightSegments — the part's unit cell, scaled from the
//   user's handle width/height; backPlateDepth / handleDepth — extrusion depths.

// Build the full handle (backplate + lever + sphere + screws) from the current
// handle settings in state. Returns the backplate, which is the group root.
export function buildHandle() {
    const { handleWidth, handleHeight, backPlateDepth, handleDepth } = state;
    const dims = {
        widthSegments: handleWidth / 6,
        heightSegments: handleHeight / 16,
        backPlateDepth,
        handleDepth,
    };
    return createBackplate(dims);
}
