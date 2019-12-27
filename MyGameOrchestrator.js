class MyGameOrchestrator {
    constructor(graph, xmlscene) {
        this.graph = graph
        this.xmlscene = xmlscene

        this.graph.myOrchestrator = this;
        this.animator = new MyAnimator()
        this.gameboard = new MyGameBoard(this.xmlscene, this);
        this.prolog = new MyPrologInterface(8081, this);
        this.prolog.requestPossibleMoves(0, this.gameboard.board);
        this.moves = []

        this.possibleMoves;

        this.lastPiece = 0;
        this.lastTile = 0;

        this.previousTime = null;
        this.currentTime = null;
    }

    update(t) {
        this.animator.update(t)

        if (this.previousTime == null)
            this.currentTime = t;
        this.previousTime = this.currentTime;
        this.currentTime = t;

        this.gameboard.update(this.currentTime - this.previousTime);
    }

    undoMove(){
        this.gameboard.undoMove();
    }

    display() {
        this.graph.displayScene()
        // this.gameboard.display()
        // this.animator.display()
    }

    // These functions may not work out of the box, needs adaptation to our game
    onObjectSelected(obj, id) {
        if (obj instanceof MySphere) {// do something with id knowing it is a piece
            console.log("Piece with id = " + id + " pressed.");
            this.lastPiece = id;
            this.lastTile = 0;
        } else if (obj instanceof MyRectangle) {// do something with id knowing it is a tile
            console.log("Tile with id = " + id + " pressed.");
            this.lastTile = id;
            if (this.lastPiece != 0){
                this.gameboard.makeMove(this.lastPiece, this.lastTile);
            }
            this.lastPiece = 0;
            this.lastTile = 0;
        } else {// error ? 
        }
    }

    managePick(mode, results) {
        if (mode == false /* && some other game conditions */)
            if (results != null && results.length > 0) { // any results?
                for (var i = 0; i < results.length; i++) {
                    var obj = results[i][0]; // get object from result
                    if (obj) { // exists?
                        var uniqueId = results[i][1] // get id
                        this.onObjectSelected(obj, uniqueId);
                    }
                } 
                
                // clear results
                results.splice(0, results.length);
            }
    }

    loadScene(filename) {
        this.graph = new MySceneGraph(filename, this.xmlscene);
        this.graph.myOrchestrator = this;
        this.xmlscene.graph = this.graph;
    }
}