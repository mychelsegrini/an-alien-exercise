let gameWidth = 728, //Sets variable with the game's width.
gameHeight = 585; //Sets variable with the game's height.

const config = { //Sets constant with the game's configuration.
    type: Phaser.AUTO,
    width: gameWidth, //Sets game's width.
    backgroundColor: '#000000', //Sets game's background color.
    height: gameHeight, //Sets game's height.
    scene: [InitialScreen, Easy, Regular, Hardcore], //Sets the list of different screens.
    physics:{ //Sets the game's physics.
        default: 'arcade',
        arcade:{
            gravity: {y: 200},
            debug: true
        }
    }
}

const game = new Phaser.Game(config) //Creates the game as an object.