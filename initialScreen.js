class InitialScreen extends Phaser.Scene{
    constructor(){ //Function that constructs the class "InitialScreen" using the constructor function from Phaser.Scene.
        super({key: "InitialScreen"})
    }

    preload(){ //Function that loads assets.
        this.load.image('logo', "assets/logo.png"); //Loads logo.
        this.load.audio('music', 'assets/chopin.mp3')
    }

    create(){ //Function that adds assets to the screen.
        this.add.image(gameWidth/2, gameHeight/2 - 100, 'logo').setScale(0.4); //Adds logo.
        this.easy = this.add.text(gameWidth/2 - 50, gameHeight/2 + 125, 'Easy Mode').setScale(1.2); //Adds button for "Easy Mode"
        this.regular = this.add.text(gameWidth/2 - 65, gameHeight/2 + 175, 'Regular Mode').setScale(1.2); //Adds button for "Regular Mode"
        this.hardcore = this.add.text(gameWidth/2 - 70, gameHeight/2 + 225, 'Hardcore Mode').setScale(1.2); //Adds button for "Hardcore Mode"

        this.easy.setInteractive({ //Sets change in the cursor when on the "Easy Mode" button.
            useHandCursor: true
        });

        this.regular.setInteractive({ //Sets change in the cursor when on the "Regular Mode" button.
            useHandCursor: true
        });

        this.hardcore.setInteractive({ //Sets change in the cursor when on the "Hardcore Mode" button.
            useHandCursor: true
        });

        this.easy.on('pointerdown', () => { //Sets change for "Easy Mode" game
            this.scene.stop('InitialScreen');
            this.scene.start('Easy')

        });

        this.regular.on('pointerdown', () => { //Sets change for "Regular Mode" game
            this.scene.stop('InitialScreen');
            this.scene.start('Regular')

        });

        this.hardcore.on('pointerdown', () => { //Sets change for "Hardcore Mode" game
            this.scene.stop('InitialScreen');
            this.scene.start('Hardcore')

        });

        this.music = this.sound.add('music', {
            volume: 1,
            loop: true
        });
        
        this.music.play()
    }

    update(){

    }

}