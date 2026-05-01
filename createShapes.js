import * as THREE from 'three';

export function createFrameShape(w = 50, h = 50, h1 = 15){
    const shape = new THREE.Shape();
    shape.moveTo(0,0);
    shape.lineTo(w,0);
    shape.lineTo(w,h);
    shape.lineTo(w-h1,h);
    shape.lineTo(w-h1,h1);
    shape.lineTo(0,h1);
    shape.lineTo(0,0);

    return shape;
}

export function createBeadShape(w = 25, h = 35, t = 3, r = 12){
    const shape = new THREE.Shape();
    shape.moveTo(0,0);
    shape.lineTo(t,0);
    shape.lineTo(t, h-(t+r));
    shape.absarc(t+r, h-(t+r),r,Math.PI,Math.PI/2,true);
    shape.lineTo(w,h-t);
    shape.lineTo(w,h);
    shape.lineTo(t+r,h);
    shape.absarc(t+r,h-(t+r),r+t,Math.PI/2,Math.PI,false);
    shape.lineTo(0,0);

    return shape;
}

