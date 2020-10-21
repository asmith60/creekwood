import * as phaser from 'phaser';
import { SusanSprite } from '../sprites/Susan';
import * as move from '../util/controls';

export default class Yard extends phaser.Scene {
    player!: SusanSprite;
    cursors: any;
    controls: any;

    constructor() {
        super({
            key: 'Yard'
        });
    }

    preload() {
        console.log('preload');
    }

    create() {
        console.log('create');
        const map = this.make.tilemap({ key: 'yard' });
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

        this.player = new SusanSprite('susan', this, map, 'susanSpawn', .4, 6, 200);
        this.player.setBodySize(50, 30);
        this.player.setOffset(20, 80);
        this.physics.add.collider(this.player, world4Layer);
        this.physics.add.collider(this.player, world3Layer);
        this.physics.add.collider(this.player, world2Layer);
        this.physics.add.collider(this.player, world1Layer);
        this.physics.add.collider(this.player, world0Layer);

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
        camera.setZoom(2);
        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.fadeIn(2000, 0, 0, 0);
    }

    update(time: any, delta: any) {
        const speed: number = 200;
        // Apply the controls to the camera each update tick of the game
        this.controls.update(delta);
        this.input.activePointer.updateWorldPoint(this.cameras.main);

        const pointer = this.input.activePointer;
        const player = this.player;
        const camera = this.cameras.main;

        const body = this.player.body as phaser.Physics.Arcade.Body;

        // Stop any previous movement from the last frame
        body.setVelocity(0);

        // Movement
        if (this.cursors.left.isDown || (this.input.activePointer.isDown && move.mobileLeftCondition(pointer, player, camera))) {
            this.player.moveLeft();
        } else if (this.cursors.right.isDown || (this.input.activePointer.isDown && move.mobileRightCondition(pointer, player, camera))) {
            this.player.moveRight();
        } else if (this.cursors.up.isDown || (this.input.activePointer.isDown && move.mobileUpCondition(pointer, player, camera))) {
            this.player.moveUp()
        } else if (this.cursors.down.isDown || (this.input.activePointer.isDown && move.mobileDownCondition(pointer, player, camera))) {
            this.player.moveDown();
        } else {
            this.player.setVelocity(0);
            this.player.anims.stop();
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        body.velocity.normalize().scale(speed);
    }
}