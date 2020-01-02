class MyGameOrchestrator {
    constructor(graph, xmlscene) {
        this.graph = graph
        this.xmlscene = xmlscene

        this.graph.myOrchestrator = this;
        this.animator = new MyAnimator()
        this.gameboard = new MyGameBoard(this.xmlscene, this);
        this.prolog = new MyPrologInterface(8081, this);

        this.moves = []

        this.possibleMoves = [];

        this.winner = 0;

        this.computerMove = null;

        this.currentPlayer = 0;

        this.prolog.requestComputerMove(this.currentPlayer, this.gameboard.board);
        this.prolog.requestPossibleMoves(this.currentPlayer, this.gameboard.board);
        

        this.lastPiecePassive = 0;
        this.lastTilePassive = 0;
        this.lastPieceAgressive = 0;
        this.lastTileAgressive = 0;

        this.previousTime = null;
        this.currentTime = null;
    }

    changePlayer(){
        this.currentPlayer ^= 1;
        document.getElementById('player_turn').innerHTML = this.currentPlayer === 0 ? "Black" : "White";
    }

    changeToPlayer(player){
        this.currentPlayer = player;
        document.getElementById('player_turn').innerHTML = this.currentPlayer === 0 ? "Black" : "White";
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
            // console.log("Piece with id = " + id + " pressed.");

            if (this.lastTilePassive == 0){
                console.log("First Piece with id = " + id + " pressed.");
                this.lastPiecePassive = id;
            } else {
                console.log("Second Piece with id = " + id + " pressed.");
                this.lastPieceAgressive = id;
            }

        } else if (obj instanceof MyRectangle) {// do something with id knowing it is a tile
            // console.log("Tile with id = " + id + " pressed.");

            if (this.lastPieceAgressive != 0 ){
                console.log("Second Tile with id = " + id + " pressed.");
                this.lastTileAgressive = id;
                this.gameboard.makeMove(this.lastPiecePassive, this.lastTilePassive, this.lastPieceAgressive, this.lastTileAgressive);

                this.lastPiecePassive = 0;
                this.lastTilePassive = 0;
                this.lastPieceAgressive = 0;
                this.lastTileAgressive = 0;

            } else if (this.lastPiecePassive != 0 ){
                console.log("First Tile with id = " + id + " pressed.");
                this.lastTilePassive = id;
            }
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