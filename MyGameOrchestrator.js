class MyGameOrchestrator {
    constructor(scene) {
        this.scene = scene
        // this.animator = new MyAnimator()
        this.gameboard = new MyGameBoard(scene)
    }

    update(t) {
        this.animator.update(t)
    }

    display() {
        this.scene.displayScene()
        // this.gameboard.display()
        // this.animator.display()
    }

    // These functions may not work out of the box, needs adaptation to our game
    onObjectSelected(obj, id) {
        if (obj instanceof MyPiece) {// do something with id knowing it is a piece
        } else if (obj instanceof MyTile) {// do something with id knowing it is a tile
        } else {// error ? 
        }
    }

    managePick(mode, results) {
        if (mode == false /* && some other game conditions */)
            if (results != null && results.length > 0) { // any results?
                for (var i = 0; i < results.length; i++) {
                    var obj = pickResults[i][0]; // get object from result
                    if (obj) { // exists?
                        var uniqueId = pickResults[i][1] // get id
                        this.onObjectSelected(obj, uniqueId);
                    }
                } 
                
                // clear results
                pickResults.splice(0, pickResults.length);
            }
    }
}