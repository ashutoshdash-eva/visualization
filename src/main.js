import * as THREE from 'three';
import { scene,camera,renderer,controls } from './scene/setupScene';
import { setupLights } from './scene/setupLights';
import { buildFrame } from './objects/Frame';
import { buildBeads } from './objects/Bead';
import { buildGlass } from './objects/Glass';
import { setupSelection } from './interaction/selection';

setupLights();
buildFrame();
buildBeads();
buildGlass();
setupSelection();

const grdHlp = new THREE.GridHelper(500, 500);
scene.add(grdHlp);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();