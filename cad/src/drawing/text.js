import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/Addons.js';
import { TextGeometry } from 'three/examples/jsm/Addons.js';
import { scene } from '../scene';
import { layout } from '../layout';

// Loads the font and draws all the static labels plus the two dimension values.
export async function addLabels() {
    const {
        width,
        height,
        panelWidth,
        pdBoxW,
        pdBoxH,
        windowWidth,
        windowHeight,
        centerX,
        centerY,
        dimOffset,
        dimX,
        dimY,
    } = layout;

    const loader = new FontLoader();
    const font = await loader.loadAsync('/fonts/helvetiker_regular.typeface.json');

    function addText(text, x, y, size = height * 0.012, color = '#000000') {
        const geometry = new TextGeometry(text, { font, size, depth: 0, curveSegments: 12 });
        const material = new THREE.MeshBasicMaterial({ color });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, y, 0);
        scene.add(mesh);
    }

    const textItems = [
        {
            text: 'Design Name:-',
            x: width - panelWidth + panelWidth * 0.02,
            y: height - height * 0.02,
        },
        {
            text: 'Org name:-',
            x: width - panelWidth + panelWidth * 0.02,
            y: height - height * 0.12,
        },
        {
            text: 'Project Id:-',
            x: width - panelWidth + panelWidth * 0.52,
            y: height - height * 0.12,
        },
        {
            text: 'Lorem ipsum...',
            x: width - panelWidth + panelWidth * 0.02,
            y: height - height * 0.22,
            color: '#636262',
        },
        {
            text: 'Design Details:-',
            x: width - panelWidth + panelWidth * 0.02,
            y: height - height * 0.32,
        },
        { text: 'Date:-', x: width - panelWidth + panelWidth * 0.02, y: height - height * 0.52 },
        {
            text: 'Developer\nName:-',
            x: width - panelWidth + panelWidth * 0.77,
            y: height - height * 0.62,
        },
        {
            text: 'Hardware details:-',
            x: width - panelWidth + panelWidth * 0.02,
            y: height - height * 0.62,
        },
        {
            text: 'Design dimensions:-',
            x: width - panelWidth + panelWidth * 0.02,
            y: height - height * 0.77,
        },
        {
            text: 'Scale factor:-',
            x: width - panelWidth + panelWidth * 0.02,
            y: height - height * 0.845,
        },
        {
            text: 'Signature:-',
            x: width - panelWidth + panelWidth * 0.02,
            y: height - height * 0.92,
        },
        { text: 'Ashutosh Dash', x: pdBoxW - pdBoxW / 1.55, y: height - pdBoxH * 0.2 },
        { text: 'EvA/304', x: pdBoxW - pdBoxW / 1.75, y: height - pdBoxH * 0.4 },
        { text: 'Configurator Developer', x: pdBoxW - pdBoxW / 1.35, y: height - pdBoxH * 0.65 },
        { text: `${windowWidth}`, x: centerX - dimOffset / 2, y: dimY - dimOffset * 0.12 },
        { text: `${windowHeight}`, x: dimX - dimOffset * 0.5, y: centerY - dimOffset / 5 },
    ];

    textItems.forEach(({ text, x, y }) => addText(text, x, y));
}
