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

        this.keyframe_changed = false;
        this.counter = 0;

        this.start_time = this.scene.start_time;
        this.time_factor = 0;

        // get starting instants of each keyframe
        this.keyframes.forEach((transformation) => {
            this.keyframe_instants.push(transformation[0]);
        });

        this.keyframe_animations = this.keyframes[1].slice(1, 4);

        this.prev_animation = this.keyframes[0].slice(1, 4);

        this.matrices = [mat4.create()];

        console.log("keyframes")
        console.log(this.keyframes, this.keyframe_animations, this.base_matrix);
    }

    update(t) {
        // javascript assignment, actually assigns a reference, not a value
        var matrix = JSON.parse(JSON.stringify(this.matrices[this.curr_keyframe]));

        if (this.counter > 0) {
            --this.counter;
            this.keyframe_changed = false;
            return matrix;
        }

        var translation = vec3.create();
        var rotation = vec3.create();
        var scale = [1, 1, 1];

        var curr_transfs = this.keyframe_animations;
        var keyframe_time = this.keyframe_instants[this.curr_keyframe + 1] - this.keyframe_instants[this.curr_keyframe];
        var real_time = t / 1000;
        var lerp_factor;

        // when keyframe ends lerp_factor should be 1 to prevent further animations
        lerp_factor = real_time * (1 / keyframe_time);

        if (lerp_factor > 1) lerp_factor = 1;
        
        // console.log(real_time, keyframe_time);

        // console.log("prev + " + this.prev_animation);
        // console.log("next + " + this.keyframe_animations);

        matrix = mat4.create();


        
        // interpolate translation vector
        vec3.lerp(translation, this.prev_animation[0], curr_transfs[0], lerp_factor);
        mat4.translate(matrix, matrix, translation);

        // var finalRotate = vec3.create();
        // vec3.divide(finalScale, curr_transfs[2], this.prev_animation[2]);

        // interpolate rotation
        vec3.lerp(rotation, this.prev_animation[1], curr_transfs[1], lerp_factor);
        mat4.rotate(matrix, matrix, rotation[0] * Math.PI / 180, [1, 0, 0]);
        mat4.rotate(matrix, matrix, rotation[1] * Math.PI / 180, [0, 1, 0]);
        mat4.rotate(matrix, matrix, rotation[2] * Math.PI / 180, [0, 0, 1]);

        // var finalScale = vec3.create();
        // vec3.divide(finalScale, curr_transfs[2], this.prev_animation[2]);
        
        // interpolate scale
        vec3.lerp(scale, this.prev_animation[2], curr_transfs[2], lerp_factor);
        mat4.scale(matrix, matrix, scale);
        
        if ((real_time > keyframe_time) && ((this.curr_keyframe + 2) < this.nkeyframes)) {
            this.prev_animation = JSON.parse(JSON.stringify(this.keyframe_animations));
            this.matrices.push(matrix);
            this.keyframe_animations = this.keyframes[this.curr_keyframe + 2].splice(1, 4);
            ++this.curr_keyframe;
            this.scene.count = 0;
            this.scene.setStartTime(this.scene.curr_time)
            this.scene.checkUpdate();
            this.keyframe_changed = true;
            this.counter = 50;
        }
        
        return matrix;
    }
}