// Parses the configuration handed over from the configurator (via localStorage)
// and derives every shared dimension the drawing uses, exposed as one `layout`
// object so the drawing modules read a single source of truth.

export const config = JSON.parse(localStorage.getItem('cadConfig') || '{}');

const windowWidth = Number(config.frameWidth);
const windowHeight = Number(config.frameHeight);
const biggestDimension = Math.max(windowWidth, windowHeight);

// Overall sheet size (A-series-like aspect ratio around the drawing).
const height = 2.1 * biggestDimension;
const width = Math.SQRT2 * height;

// Layout regions.
const panelWidth = width * 0.35; // right-hand property panel
const boxHeight = height * 0.2; // bottom shape strip
const pdBoxW = width * 0.2; // top-left project-details box
const pdBoxH = height * 0.25;

// Centre of the drawing area and the window rectangle within it.
const centerX = pdBoxW + (width - panelWidth - pdBoxW) / 2;
const centerY = boxHeight + (height - boxHeight) / 2;
const left = centerX - windowWidth / 2;
const right = centerX + windowWidth / 2;
const bottom = centerY - windowHeight / 2;
const top = centerY + windowHeight / 2;

// Frame thickness (h1) and bead width (bw) in the 2D section.
const h1 = biggestDimension * 0.05;
const bw = h1 * 0.5;

// Dimension-line offsets and tick positions.
const dimOffset = biggestDimension * 0.08;
const dimX = right + dimOffset;
const dimY = bottom - dimOffset;

export const layout = {
    width,
    height,
    panelWidth,
    boxHeight,
    pdBoxW,
    pdBoxH,
    windowWidth,
    windowHeight,
    centerX,
    centerY,
    left,
    right,
    bottom,
    top,
    h1,
    bw,
    dimOffset,
    dimX,
    dimY,
    ghh: Number(config.ghh),
    handleWidth: Number(config.handleWidth),
    handleHeight: Number(config.handleHeight),
};
