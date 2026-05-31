import { state } from '../utils/constants';
import { rebuildHandle, applyHandleTransforms, rebuildFrameStack } from '../main';

// Look up a required element and fail loudly with a clear message if the id
// is missing, instead of throwing a cryptic "cannot read .value of null".
const requireEl = (id) => {
    const element = document.getElementById(id);
    if (!element) throw new Error(`Missing required element: #${id}`);
    return element;
};

export function applyFromDom() {
    const frameWidth = Number(requireEl('frame-width').value);
    const frameHeight = Number(requireEl('frame-height').value);
    const handleWidth = Number(requireEl('handle-width').value);
    const handleHeight = Number(requireEl('handle-height').value);
    const backPlateDepth = Number(requireEl('backplate-depth').value);
    const handleDepth = Number(requireEl('handle-depth').value);
    const side = requireEl('handle-side').value;
    const orientation = requireEl('handle-orientation').value;
    const viewType = requireEl('material-style').value;
    const placement = requireEl('handle-placement').value;
    const ghh = Number(requireEl('handle-ghh').value);

    const frameDimsChanged = frameWidth !== state.width || frameHeight !== state.height;
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

requireEl('update-btn').addEventListener('click', applyFromDom);
