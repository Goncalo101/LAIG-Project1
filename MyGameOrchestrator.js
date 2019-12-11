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
}