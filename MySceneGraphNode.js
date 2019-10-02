class MySceneGraphNode {
    constructor(id, transform, appearance, texture, primitive) {
        this.id = id;
        this.primitive = primitive;
        this.transform = transform;
        this.appearance = appearance; 
        this.texture = texture;
        this.visited = false;
        this.adjacent = [];
    }

    addEdge(dest_node) {
        this.adjacent.push(dest_node);
    }
}