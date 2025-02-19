class Regular extends Phaser.Scene{
    constructor(){ //Function that constructs the class "Regular" using the constructor function from Phaser.Scene.
        super({key: "Regular"})
    }

    preload(){ //Function that loads all the images/physical objects used.
        this.load.image("back", "assets/bg.png");
        this.load.image("et", "assets/alienigena.png");
        this.load.image('fire', 'assets/turbo.png');
        this.load.image('tijolao', 'assets/tijolos.png');
        this.load.image('moeda', 'assets/moeda.png');
        this.load.spritesheet('bird', 'assets/bird-red.png', {frameWidth: 75, frameHeight:75})
    }

    create(){ //Function that creates images and physical objects and models physical phenomena.
        this.add.image(gameWidth/2, gameHeight/2, "back"); //Adds background.
        this.fire = this.add.image(0,0, 'fire'); //Adds fire from turbo mode.
        this.alien = this.physics.add.image(gameWidth/2, 0, "et"); //Adds the alien.
        this.tijolao = this.physics.add.staticImage(gameWidth/2, gameHeight/2, "tijolao"); //Adds the brick.
        this.money = this.physics.add.image(Phaser.Math.RND.between (50,680), 0, 'moeda'); //Adds the coin.
        this.bird = this.physics.add.sprite(Phaser.Math.RND.between (50,680), 0, 'bird').setScale(1.3); //Adds the bird.
        this.points = [0,0]; //Defines a list that stores the points acquired by the user [0] and the bird [1].
        this.placar = this.add.text(50, 50, 'Suas moedas:' + this.points[0], {fontSize:'20px', fill:'#495613'}); //Creates a text that shows the user's points.
        this.bird.placar = this.add.text(450, 50, 'Moedas do pássaro:' + this.points[1], {fontSize:'20px', fill:'#495613'}); //Creates a text that shows the bird's points.
        this.exit = this.add.text(15, 10, 'X', {backgroundColor: "#000000", color: "#ffffff"}).setScale(2); //Creates the exit button.

        this.alien.setCollideWorldBounds(true); //Sets collisions between the alien and the game's boundaries.
        this.money.setCollideWorldBounds(true); //Sets collisions between the coin and the game's boundaries.
        this.bird.setCollideWorldBounds(true); //Sets collisions between the bird and the game's boundaries.

        this.bird.setBounce(0.9); //Sets bouncing for the bird.
        this.money.setBounce(0.6); //Sets bouncing for the coin.

        this.physics.add.collider(this.alien, this.tijolao); //Sets collisions between the alien and the brick.
        this.physics.add.collider(this.money, this.tijolao); //Sets collisions between the coin and the brick.
        this.physics.add.collider(this.bird, this.alien); //Sets collisions between the alien and the bird.
        this.physics.add.collider(this.bird, this.tijolao); //Sets collisions between the bird and the brick.

        this.fire.setVisible(false); //Hides the fire from the turbo mode.

        this.keys = this.input.keyboard.addKeys("W, A, S, D, left, right, up, down"); //Adds keys for keyboard input.

        this.physics.add.overlap(this.alien, this.money, () => { //Sets overlaping between the alien and the coin, as well as how the user gets points.
            this.money.setVisible(false);
            this.points[0] += 1;
            this.placar.setText('Suas moedas: ' + this.points[0]);
            this.money.x = Phaser.Math.RND.between (50,680);
            this.money.y = 20;
            this.money.setVisible(true);
        });

        this.physics.add.overlap(this.bird, this.money, () => { //Sets overlaping between the bird and the coin, as well as how the bird gets points.
            this.money.setVisible(false);
            this.points[1] += 1;
            this.bird.placar.setText('Moedas do pássaro: ' + this.points[1]);
            this.money.x = Phaser.Math.RND.between (50,680);
            this.money.y = 20;
            this.money.setVisible(true);
        });


        this.anims.create({ //Sets animation so that the bird can "fly".
            key: 'fly',
            frames: this.anims.generateFrameNumbers('bird', {start:0, end:7}),
            frameRate: 17,
            repeat: -1,

        });

        this.bird.anims.play('fly'); //Starts the animation "fly".

        this.exit.setInteractive({ //Sets change in the cursor when on the exit button.
            useHandCursor: true
        });

        this.exit.on('pointerdown', () => { //Sets return for the initial screen.
            this.scene.stop('Regular');
            this.scene.start('InitialScreen')

        })

        
    
    }

    update(){
        this.fire.x = this.alien.x; //Updates the fire x position.
        this.fire.y = this.alien.y + this.alien.height/2; //Updates the fire y position.

        if(this.bird.body.velocity.x <0){ //Sets flip for the bird's image depending on what x direction it's moving.
            this.bird.setFlip(true, false);
        } else if (this.bird.body.velocity.x > 0){
            this.bird.setFlip(false, false);
        }

        this.physics.moveTo(this.bird, this.money.x, this.money.y, 150); //Sets how the bird follows the coin.

        if (this.keys.W.isDown || this.keys.up.isDown){ //Sets how the alien moves depending on the keyboard input.
            this.alien.setVelocityY(-150);
            this.fire.setVisible(true);
        }else if(this.keys.S.isDown || this.keys.down.isDown){
            this.alien.setVelocityY(150);
            this.fire.setVisible(true);
        }else{
            this.fire.setVisible(false)
        };

        if(this.keys.D.isDown || this.keys.right.isDown){ //Sets how the alien moves depending on the keyboard input.
            this.alien.setVelocityX(150);
        }else if (this.keys.A.isDown || this.keys.left.isDown){
            this.alien.setVelocityX(-150);
        }else if(this.alien.y == (gameHeight - this.alien.height/2) ||this.alien.y == (gameHeight/2 - this.tijolao.height/2 - this.alien.height/2)) {
            this.alien.setVelocityX(0);
        };
    }

}