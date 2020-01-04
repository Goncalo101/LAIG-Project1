/**
* MyInterface class, creating a GUI interface.
*/
class MyInterface extends CGFinterface {
    /**
     * @constructor
     */
    constructor() {
        super();
    }

    /**
     * Initializes the interface.
     * @param {CGFapplication} application
     */
    init(application) {
        super.init(application);
        // init GUI. For more information on the methods, check:
        //  http://workshop.chromeexperiments.com/examples/gui

        this.gui = new dat.GUI({resizable: false});

        // add a group of controls (and open/expand by defult)
        this.lights_folder = this.gui.addFolder('Lights');
        this.lights_folder.open();

        this.gui.add(this.scene, 'selectedDifficulty', this.scene.difficulties).name('Difficulty');
        this.gui.add(this.scene, 'selectedGameType', this.scene.gameTypes).name('Game Type');
        this.sceneSelected = this.gui.add(this.scene, 'selectedScene', this.scene.scenes).name('Selected Scene');
        this.gui.add(this.scene, 'undoMove').name('Undo Move');
        this.gui.add(this.scene, 'playMovie').name('Play Movie');
        this.gui.add(this.scene, 'resetGame').name('Reset Game');

        this.initKeys();

        return true;
    }

    /**
     * initKeys
     */
    initKeys() {
        this.scene.gui = this;
        this.processKeyboard = function () { };
        this.activeKeys = {};
    }

    processKeyDown(event) {
        this.activeKeys[event.code] = true;
    };

    processKeyUp(event) {
        this.activeKeys[event.code] = false;
    };

    isKeyPressed(keyCode) {
        return this.activeKeys[keyCode] || false;
    }
}