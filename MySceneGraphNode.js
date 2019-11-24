/**
 * MySceneGraphNode class, representing a node from the scene graph.
 */
class MySceneGraphNode {
    /**
     * @constructor Builds a scene graph node
     * @param {int} id Internal id of the node
     * @param {mat4} transform Transformation matrix to be applied, can be inherited from parent or class-defined
     * @param {CGFappearance} material Appearance to be applied, can be inherited from parent or class-defined
     * @param primitive Primitive to be drawn, defined only by leaf nodes
     */
    constructor(id, transform, material, texture, s_length, t_length) {
        this.id = id;
        this.primitives = [];

        if (transform.length == 0) {
            this.transform = [mat4.create()];
        } else {
            this.transform = transform;
        }

        this.material = material;
        this.texture = texture;
        this.s_length = s_length;
        this.t_length = t_length;
        this.adjacent = [];
        this.matDisplay = [];

        this.animation;
    }


    addPrimitives(primitives_list) {
        this.primitives.push(...primitives_list);
    }

    addAdjacent(adjacent_list) {
        this.adjacent.push(...adjacent_list);
    }

    setAnimation(animation) {
        this.animation = animation;
    }
}