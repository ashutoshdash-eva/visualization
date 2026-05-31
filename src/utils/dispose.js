// Centralized Three.js resource cleanup.
//
// Three.js geometries, materials and textures hold GPU memory that is NOT
// freed by garbage collection — you must call .dispose() explicitly. These
// helpers replace the near-identical disposal blocks that used to live in
// Frame.js, Bead.js, Glass.js and main.js.

/**
 * Dispose a single object's own GPU resources (its geometry and material(s)).
 * Handles the case where `material` is an array.
 */
export function disposeObject(object) {
    object.geometry?.dispose();
    if (Array.isArray(object.material)) {
        object.material.forEach((material) => material.dispose());
    } else {
        object.material?.dispose();
    }
}

/**
 * Recursively dispose an object and every descendant. Use this only for
 * hierarchies that are fully owned by the caller (e.g. the handle group),
 * where no child's geometry is shared with something still in the scene.
 */
export function disposeTree(root) {
    root.traverse(disposeObject);
}

/**
 * Dispose a mesh together with its directly-attached edge LineSegments,
 * leaving any other children untouched. Frame meshes, for example, also
 * parent the beads — those are owned by Bead.js and disposed separately.
 */
export function disposeMeshWithEdges(mesh) {
    disposeObject(mesh);
    mesh.children.forEach((child) => {
        if (child.isLineSegments) disposeObject(child);
    });
}
