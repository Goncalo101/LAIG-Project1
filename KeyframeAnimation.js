/**
 * class defining an animation using keyframes
 */
class KeyframeAnimation extends Animation {
    constructor(scene, transformations) {
        super(scene);
        this.scene = scene;
        this.transformations = transformations;
        console.log("keyframe transformations");
        console.log(transformations);
    }
}