import * as phaser from 'phaser';
import { SusanSprite } from '../sprites/Susan';
import { BlackySprite } from '../sprites/Blacky';
import { BrunoSprite } from '../sprites/Bruno';
import * as move from '../util/controls';

export default class Yard extends phaser.Scene {
    susan!: SusanSprite;
    blacky!: BlackySprite;
    bruno!: BrunoSprite;
    delay: number = 0;
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

        const allTilesets = [cars, chairs, farm, modern, outside, terrain, omega, jungle];

        this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const above1Layer = map.createDynamicLayer('above1', allTilesets, 0, 0);
        const above0Layer = map.createDynamicLayer('above0', allTilesets, 0, 0);
        const world4Layer = map.createDynamicLayer('world4', allTilesets, 0, 0);
        const world3Layer = map.createDynamicLayer('world3', allTilesets, 0, 0);
        const world2Layer = map.createDynamicLayer('world2', allTilesets, 0, 0);
        const world1Layer = map.createDynamicLayer('world1', allTilesets, 0, 0);
        const world0Layer = map.createDynamicLayer('world0', allTilesets, 0, 0);
        const belowLayer = map.createDynamicLayer('below', allTilesets, 0, 0);

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

        const spacebar: phaser.Input.Keyboard.Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

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

        const spriteGroup = this.add.group();

        this.susan = new SusanSprite('susan', this, map, 'susanSpawn', .4, 6, 200);
        this.susan.setBodySize(50, 30);
        this.susan.setOffset(18, 80);
        spriteGroup.add(this.susan);

        this.blacky = new BlackySprite('blacky', this, map, 'blackySpawn', .5, 5, 300);
        this.blacky.setBodySize(33, 42);
        this.blacky.setOffset(9, 30);
        this.physics.add.collider(this.susan, this.blacky);
        this.physics.add.overlap(this.susan.interactField, this.blacky, () => {
            if (phaser.Input.Keyboard.JustDown(spacebar)) {
                console.log("Interact!!!");
            };
        });
        spriteGroup.add(this.blacky);

        this.physics.add.collider(spriteGroup, world4Layer);
        this.physics.add.collider(spriteGroup, world3Layer);
        this.physics.add.collider(spriteGroup, world2Layer);
        this.physics.add.collider(spriteGroup, world1Layer);
        this.physics.add.collider(spriteGroup, world0Layer);
        this.physics.add.collider(spriteGroup, spriteGroup);

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

        camera.startFollow(this.susan);
        camera.setZoom(2);
        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.fadeIn(2000, 0, 0, 0);
    }

    update(time: any, delta: any) {
        // Apply the controls to the camera each update tick of the game
        this.controls.update(delta);
        this.input.activePointer.updateWorldPoint(this.cameras.main);

        const pointer = this.input.activePointer;
        const camera = this.cameras.main;
        const susanBody = this.susan.body as phaser.Physics.Arcade.Body;
        const blackyBody = this.blacky.body as phaser.Physics.Arcade.Body;

        // Stop any previous movement from the last frame
        susanBody.setVelocity(0);
        this.susan.interactField.setVelocity(0);



        // Movement
        if (this.cursors.left.isDown || (this.input.activePointer.isDown && move.mobileLeftCondition(pointer, this.susan, camera))) {
            this.susan.moveLeft();
        } else if (this.cursors.right.isDown || (this.input.activePointer.isDown && move.mobileRightCondition(pointer, this.susan, camera))) {
            this.susan.moveRight();
        } else if (this.cursors.up.isDown || (this.input.activePointer.isDown && move.mobileUpCondition(pointer, this.susan, camera))) {
            this.susan.moveUp()
        } else if (this.cursors.down.isDown || (this.input.activePointer.isDown && move.mobileDownCondition(pointer, this.susan, camera))) {
            this.susan.moveDown();
        } else {
            this.susan.setVelocity(0);
            this.susan.anims.stop();
        }

        // Normalize and scale the velocity so that player can't move faster along a diagonal
        susanBody.velocity.normalize().scale(this.susan.speed);
        this.susan.interactField.body.velocity.normalize().scale(this.susan.speed);

        if (time > this.delay) {
            this.blacky.wander(50);
            this.delay = time + 3000;
        }
    }
}