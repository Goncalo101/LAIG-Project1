/**
 * class defining an abstract animation, including update and apply methods
 */
class Animation {
    constructor(scene) {
        this.animation_mat = mat4.create();
    }

    update(t) {}

    apply() {}
}