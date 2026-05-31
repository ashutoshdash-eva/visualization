import { startRenderLoop } from './scene';
import { createDoubleBoundary } from './drawing/boundary';
import { createPropertyBox } from './drawing/propertyBox';
import { createPDBox } from './drawing/pdBox';
import { createShapeBox } from './drawing/shapeBox';
import { addWindow } from './drawing/window';
import { addHandle } from './drawing/handle';
import { addLabels } from './drawing/text';

createDoubleBoundary();
createPropertyBox();
createPDBox();
createShapeBox();
addWindow();
addHandle();
await addLabels();

startRenderLoop();
