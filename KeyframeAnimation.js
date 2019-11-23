/**
 * class defining an animation using keyframes
 */
class KeyframeAnimation extends Animation {
    constructor(scene, transformations) {
        super(scene);
        this.scene = scene;

        // process keyframe info 
        // each element of this.keyframes is a list of 4 elements: the starting instant of the keyframe, 
        // followed by the translation, rotation and scale vectors
        this.keyframes = [[0, [0, 0, 0], [0, 0, 0], [1, 1, 1]]];
        this.keyframes.push(...transformations);

        this.nkeyframes = this.keyframes.length; // number of keyframes (including keyframe 0)
        this.keyframe_instants = [];
        this.keyframe_animations = [];
        this.curr_keyframe = 0;

        // get starting instants of each keyframe
        this.keyframes.forEach((transformation) => {
            this.keyframe_instants.push(transformation[0]);
            this.keyframe_animations = transformation.slice(1, 4);
        });
    }

    update(t) {
        var matrix = mat4.create();

        var translation = vec3.create();
        var rotation = vec3.create();
        var scale = vec3.create();

        var curr_transfs = this.keyframe_animations;
        var keyframe_time = this.keyframe_instants[this.curr_keyframe + 1] - this.keyframe_instants[this.curr_keyframe];
        var real_time = t / 1000;
        var lerp_factor;

        // when keyframe ends lerp_factor should be 1 to prevent further animations
        if (real_time > keyframe_time)
            lerp_factor = 1;
        else 
            lerp_factor = real_time * (1 / keyframe_time);

        // interpolate translation vector
        vec3.lerp(translation, translation, curr_transfs[0], lerp_factor);
        mat4.translate(matrix, matrix, translation);
        
        // interpolate rotation
        vec3.lerp(rotation, rotation, curr_transfs[1], lerp_factor);
        mat4.rotate(matrix, matrix, rotation[0] * Math.PI / 180, [1,0,0]);
        mat4.rotate(matrix, matrix, rotation[1] * Math.PI / 180, [0,1,0]);
        mat4.rotate(matrix, matrix, rotation[2] * Math.PI / 180, [0,0,1]);

        // interpolate scale
        vec3.lerp(scale, scale, curr_transfs[2], lerp_factor);
        mat4.scale(matrix, matrix, scale);

        return matrix;
    }
}