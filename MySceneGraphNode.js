/**
 * MySceneGraphNode class, representing a node from the scene graph.
 */
class MySceneGraphNode {
    /**
     * @constructor Builds a scene graph node
     * @param {int} id Internal id of the node
     * @param {mat4} transform Transformation matrix to be applied, can be inherited from parent or class-defined
     * @param {CGFappearance} appearance Appearance to be applied, can be inherited from parent or class-defined
     * @param primitive Primitive to be drawn, defined only by leaf nodes
     */
    constructor(id, transform, material) {
        this.id = id;
        this.primitives = [];
        this.transform = transform;
        this.material = material;
        this.visited = false;
        this.adjacent = [];
    }

    /**
     * Add an endge to a given node
     * @param {MySceneGraphEdge} dest_node Node to connect the edge to 
     */
    addEdge(dest_node) {
        this.adjacent.push(dest_node);
    }

    addPrimitives(primitives_list) {
        this.primitives.push(...primitives_list);
    }

    addAdjacent(adjacent_list) {
        this.adjacent.push(...adjacent_list);
    }
}