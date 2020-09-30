import * as phaser from 'phaser';
import * as move from '../util/movement';
import { moveCursor } from 'readline';

export default class Yard extends phaser.Scene {
    player!: phaser.Physics.Arcade.Sprite;
    cursors: any;
    controls: any;

    constructor() {
        super({
            key: 'Yard'
        });
    }

    preload() {
        this.load.image('cars', 'assets/tilesets/cars.png');
        this.load.image('chairs', 'assets/tilesets/chairs.png');
        this.load.image('farm', 'assets/tilesets/farm.png');
        this.load.image('modern', 'assets/tilesets/modern.png');
        this.load.image('outside', 'assets/tilesets/outside.png');
        this.load.image('terrain', 'assets/tilesets/terrain.png');
        this.load.image('omega', 'assets/tilesets/omega.png');
        this.load.image('jungle', 'assets/tilesets/jungle.png');
        this.load.spritesheet('people', 'assets/sprites/people.png', { frameWidth: 72, frameHeight: 110 });
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/yard.json');
    }

    create() {
        const map = this.make.tilemap({ key: 'map' });
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        const cars = map.addTilesetImage('cars');
        const chairs = map.addTilesetImage('chairs');
        const farm = map.addTilesetImage('farm');
        const modern = map.addTilesetImage('modern');
        const outside = map.addTilesetImage('outside');
        const terrain = map.addTilesetImage('terrain');
        const omega = map.addTilesetImage('omega');
        const jungle = map.addTilesetImage('jungle');

        const allLayers = [cars, chairs, farm, modern, outside, terrain, omega, jungle];

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const above1Layer = map.createDynamicLayer('above1', allLayers, 0, 0);
        const above0Layer = map.createDynamicLayer('above0', allLayers, 0, 0);
        const world4Layer = map.createDynamicLayer('world4', allLayers, 0, 0);
        const world3Layer = map.createDynamicLayer('world3', allLayers, 0, 0);
        const world2Layer = map.createDynamicLayer('world2', allLayers, 0, 0);
        const world1Layer = map.createDynamicLayer('world1', allLayers, 0, 0);
        const world0Layer = map.createDynamicLayer('world0', allLayers, 0, 0);
        const belowLayer = map.createDynamicLayer('below', allLayers, 0, 0);

        world4Layer.setCollisionByProperty({ collide: true });
        world3Layer.setCollisionByProperty({ collide: true });
        world2Layer.setCollisionByProperty({ collide: true });
        world1Layer.setCollisionByProperty({ collide: true });
        world0Layer.setCollisionByProperty({ collide: true });

        above1Layer.setDepth(8);
        above0Layer.setDepth(7);
        world4Layer.setDepth(5);
        world3Layer.setDepth(4);
        world2Layer.setDepth(3);
        world1Layer.setDepth(2);
        world0Layer.setDepth(1);
        belowLayer.setDepth(0);

        // world4Layer.renderDebug(this.add.graphics().setAlpha(0.75), {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });
        // world3Layer.renderDebug(this.add.graphics().setAlpha(0.75), {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });
        // world2Layer.renderDebug(this.add.graphics().setAlpha(0.75), {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });
        // world1Layer.renderDebug(this.add.graphics().setAlpha(0.75), {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });
        // world0Layer.renderDebug(this.add.graphics().setAlpha(0.75), {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        // });

        const spawnPoint: any = map.findObject("objects", obj => obj.name === 'spawnPoint');

        this.player = this.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'people', 1);
        this.player.setBodySize(50, 30);
        this.player.setScale(.4);
        this.player.setOffset(20, 80);
        this.player.setDepth(6);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, world4Layer);
        this.physics.add.collider(this.player, world3Layer);
        this.physics.add.collider(this.player, world2Layer);
        this.physics.add.collider(this.player, world1Layer);
        this.physics.add.collider(this.player, world0Layer);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('people', { start: 13, end: 15 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'people', frame: 1 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('people', { start: 26, end: 28 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'up',
            frames: this.anims.generateFrameNumbers('people', { start: 39, end: 41 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'down',
            frames: this.anims.generateFrameNumbers('people', { start: 0, end: 2 }),
            frameRate: 10,
            repeat: -1
        });

        // Phaser supports multiple cameras, but you can access the default camera like this:
        const camera = this.cameras.main;

        // Set up the arrows to control the camera
        this.cursors = this.input.keyboard.createCursorKeys();
        this.controls = new phaser.Cameras.Controls.FixedKeyControl({
            camera: camera,
            left: this.cursors.left,
            right: this.cursors.right,
            up: this.cursors.up,
            down: this.cursors.down,
            speed: 0.5
        });

        camera.startFollow(this.player);
        camera.setZoom(2.5);
        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Help text that has a "fixed" position on the screen
        // this.add.text(16, 16, 'Arrow keys to scroll', {
        //     font: '18px monospace',
        //     fill: '#ffffff',
        //     padding: { x: 20, y: 10 },
        //     backgroundColor: '#000000'
        // }).setScrollFactor(0);
    }

    update(time: any, delta: any) {
        const speed: number = 200;
        // Apply the controls to the camera each update tick of the game
        this.controls.update(delta);

        const body = this.player.body as phaser.Physics.Arcade.Body;

        // Stop any previous movement from the last frame
        body.setVelocity(0);

        // Movement
        if (this.cursors.left.isDown) {
            body.setVelocityX(-speed);
            this.player.anims.play('left', true);
        } else if (this.cursors.right.isDown) {
            body.setVelocityX(speed);
            this.player.anims.play('right', true);
        } else if (this.cursors.up.isDown) {
            body.setVelocityY(-speed);
            this.player.anims.play('up', true);
        } else if (this.cursors.down.isDown) {
            body.setVelocityY(speed);
            this.player.anims.play('down', true);
        }
        else if (this.input.activePointer.isDown) {
            // Update pointer position
            this.input.activePointer.updateWorldPoint(this.cameras.main);

            const pointer = this.input.activePointer;
            const player = this.player;
            const camera = this.cameras.main;

            if (move.mobileLeftCondition(pointer, player, camera)) {
                body.setVelocityX(-speed);
                this.player.anims.play('left', true);
            } else if (move.mobileRightCondition(pointer, player, camera)) {
                body.setVelocityX(speed);
                this.player.anims.play('right', true);
            } else if (move.mobileUpCondition(pointer, player, camera)) {
                body.setVelocityY(-speed);
                this.player.anims.play('up', true);
            } else if (move.mobileDownCondition(pointer, player, camera)) {
                body.setVelocityY(speed);
                this.player.anims.play('down', true);
            } else {
                this.player.setVelocity(0);
                this.player.anims.stop();
            }
        } else {
            this.player.setVelocity(0);
            this.player.anims.stop();
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        body.velocity.normalize().scale(speed);
    }
}