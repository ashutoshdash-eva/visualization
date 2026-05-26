import { state } from '../utils/constants';
import { rebuildHandle, applyHandleTransforms, rebuildFrameStack } from '../main';

const $ = (id) => document.getElementById(id);

export function applyFromDom() {
    const frameWidth = Number($('frame-width').value);
    const frameHeight = Number($('frame-height').value);
    const handleWidth = Number($('handle-width').value);
    const handleHeight = Number($('handle-height').value);
    const backPlateDepth = Number($('backplate-depth').value);
    const handleDepth = Number($('handle-depth').value);
    const side = $('handle-side').value;
    const orientation = $('handle-orientation').value;
    const viewType = $('material-style').value;
    const placement = $('handle-placement').value;
    const ghh = Number($('handle-ghh').value);

    const frameDimsChanged =
        frameWidth !== state.width ||
        frameHeight !== state.height;
    const handleDimsChanged =
        handleWidth !== state.handleWidth ||
        handleHeight !== state.handleHeight ||
        backPlateDepth !== state.backPlateDepth ||
        handleDepth !== state.handleDepth;

    state.width = frameWidth;
    state.height = frameHeight;
    state.handleWidth = handleWidth;
    state.handleHeight = handleHeight;
    state.backPlateDepth = backPlateDepth;
    state.handleDepth = handleDepth;
    state.side = side;
    state.orientation = orientation;
    state.viewType = viewType;
    state.placement = placement;
    state.ghh = ghh;

    if (frameDimsChanged) {
        rebuildFrameStack();
    } else if (handleDimsChanged) {
        rebuildHandle();
    } else {
        applyHandleTransforms();
    }
}

$('update-btn').addEventListener('click', applyFromDom);
