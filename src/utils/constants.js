export const frameProfileWidth = 50;
export const beadWidth = 15;
export const offset = 30;
export const beadOffset = 20;

export const COLORS = {
    frame: '#ffffff',
    bead: '#222222',
    highlight: 0x00ffff,
    secondary: '#0400ff',
    edge: '#3e2a1f',
    glass: '#d6e9f0',
    plus: '#000000',
    handle: '#546c83',
    handlePlate: '#ffffff',
    screw: '#868686',
};

// Reusable material parameters. Color is supplied per-part; these capture the
// shared "look" so it can be tuned in one place. See utils/materials.js.
export const MATERIAL_PRESETS = {
    metal: { metalness: 0.6, roughness: 0.0 },
};

// Optical properties of the glass pane (thickness is computed at build time).
export const GLASS = {
    metalness: 0.05,
    roughness: 0.0,
    transmission: 1.0,
    ior: 1.5,
    dispersion: 5.0,
};

export const state = {
    width: 500,
    height: 700,
    handleWidth: 40,
    handleHeight: 150,
    backPlateDepth: 10,
    handleDepth: 10,
    // ghh = handle position along its mounting edge (distance from the frame's
    // origin corner). Used as posY on the left/right sides and posX on top/bottom.
    ghh: 350,
    side: 'right',
    orientation: 'left',
    placement: 'inside',
    viewType: 'normal',
};
