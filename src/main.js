import * as THREE from 'three';
import { scene, camera, renderer, controls } from './scene/setupScene';
import { setupLights } from './scene/setupLights';
import { buildFrame } from './objects/Frame';
import { buildBeads } from './objects/Bead';
import { buildGlass } from './objects/Glass';
import { setupSelection } from './interaction/selection';
import { buildHandle } from './objects/Handle';
import { state, frameW } from './utils/constants';

let handleRoot;
let outsideClone;

function disposeTree(root) {
    root.traverse(o => {
        if (o.geometry) o.geometry.dispose();
        if (o.material) {
            if (Array.isArray(o.material)) o.material.forEach(m => m.dispose());
            else o.material.dispose();
        }
    });
}

function cloneRootForOutside(root) {
    const clone = root.clone(true);
    clone.traverse(o => {
        if (o.isMesh && o.material) o.material = o.material.clone();
    });
    return clone;
}

function applyViewType(root, viewType) {
    root.traverse(o => {
        if (!o.isMesh || !o.material) return;
        const baseColor = o.userData.baseColor || ('#' + o.material.color.getHexString());
        o.userData.baseColor = baseColor;
        const prev = o.material;
        o.material = viewType === 'realistic'
            ? new THREE.MeshPhysicalMaterial({
                color: baseColor,
                metalness: 0.95,
                roughness: 0.05,
                clearcoat: 1.0,
                clearcoatRoughness: 0.05,
                reflectivity: 0.9
            })
            : new THREE.MeshStandardMaterial({
                color: baseColor,
                metalness: 0.3,
                roughness: 0.5
            });
        prev.dispose();
    });
}

export function rebuildHandle() {
    if (outsideClone) {
        scene.remove(outsideClone);
        disposeTree(outsideClone);
        outsideClone = null;
    }
    if (handleRoot) {
        scene.remove(handleRoot);
        disposeTree(handleRoot);
    }
    handleRoot = buildHandle();
    scene.add(handleRoot);
    applyHandleTransforms();
}

export function rebuildFrameStack() {
    buildFrame();
    buildBeads();
    buildGlass();
    rebuildHandle();
    controls.target.set(state.width / 2, state.height / 2, 0);
}

export function applyHandleTransforms() {
    if (!handleRoot) return;
    const { side, orientation, placement, viewType, width, height, ghh } = state;

    let posX=0, posY=0, rotZ=0;
    switch (side) {
        case 'right': posX = width-15; posY = ghh; rotZ = 0; break;
        case 'left': posX = 15; posY = ghh; rotZ = 0; break;
        case 'top': posX = ghh; posY = height-15; rotZ = Math.PI / 2; break;
        case 'bottom': posX = ghh; posY = 15; rotZ = 3*Math.PI / 2; break;
        default: posX = width; posY = ghh; rotZ = 0;
    }
    handleRoot.position.set(posX, posY, 0);
    handleRoot.rotation.z = rotZ;

    const orientScale = orientation === 'left' ? 1 : -1;

    if (outsideClone) {
        scene.remove(outsideClone);
        outsideClone.traverse(o => {
            if (o.isMesh && o.material) o.material.dispose();
        });
        outsideClone = null;
    }

    if (placement === 'inside') {
        handleRoot.scale.set(orientScale, 1, 1);
        handleRoot.position.z = 0;
    } else if (placement === 'outside') {
        handleRoot.scale.set(-orientScale, 1, -1);
        handleRoot.position.z = -frameW;
    } else if (placement === 'both') {
        handleRoot.scale.set(orientScale, 1, 1);
        handleRoot.position.z = 0;
        outsideClone = cloneRootForOutside(handleRoot);
        outsideClone.scale.set(-orientScale, 1, -1);
        outsideClone.position.set(posX, posY, -frameW);
        outsideClone.rotation.z = rotZ;
        scene.add(outsideClone);
    }

    applyViewType(handleRoot, viewType);
    if (outsideClone) applyViewType(outsideClone, viewType);
}

setupLights();
buildFrame();
buildBeads();
buildGlass();
setupSelection();
rebuildHandle();

// const grdHlp = new THREE.GridHelper(500, 500);
// scene.add(grdHlp);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
