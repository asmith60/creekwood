import * as phaser from 'phaser';
import { SusanSprite } from '../sprites/Susan';
import { AdamSprite } from '../sprites/Adam';
import { IrisSprite } from '../sprites/Iris';
import { BlackySprite } from '../sprites/Blacky';
import { BrunoSprite } from '../sprites/Bruno';
import { MopsySprite } from '../sprites/Mopsy';
import { CoopBreakQuest } from '../quests/CoopBreak';
import * as move from '../util/controls';

export default class Yard extends phaser.Scene {
    state: {} = {};
    susan!: SusanSprite;
    adam!: AdamSprite;
    iris!: IrisSprite;
    blacky!: BlackySprite;
    bruno!: BrunoSprite;
    mopsy!: MopsySprite;
    allSprites!: phaser.GameObjects.Group;
    npcSprites!: phaser.GameObjects.Group;
    dogSprites!: phaser.GameObjects.Group;
    chickenSprites!: phaser.GameObjects.Group;
    coopBreakQuest!: CoopBreakQuest;
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
        // Setup world
        const map = this.make.tilemap({ key: 'yard' });
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

        // Add spacebar for interaction
        const spacebar: phaser.Input.Keyboard.Key = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        // Setup sprites
        this.allSprites = this.add.group();
        this.npcSprites = this.add.group();
        this.dogSprites = this.add.group();

        this.susan = new SusanSprite('susan', this, map, 'susanSpawn', .4, 6, 200);
        this.susan.setBodySize(50, 30);
        this.susan.setOffset(18, 80);
        this.physics.add.overlap(this.susan.interactField, this.npcSprites, (susan, other) => {
            if (phaser.Input.Keyboard.JustDown(spacebar)) {
                console.log(`Interacted with ${other.name}`);
            };
        });
        this.allSprites.add(this.susan);

        this.adam = new AdamSprite('adam', this, map, 'adamSpawn', .4, 5, 200);
        this.adam.setBodySize(55, 90);
        this.adam.setOffset(17, 10);
        this.allSprites.add(this.adam);
        this.npcSprites.add(this.adam);

        this.iris = new IrisSprite('iris', this, map, 'irisSpawn', .4, 5, 200);
        this.iris.setBodySize(45, 50);
        this.iris.setOffset(5, 25);
        this.allSprites.add(this.iris);
        this.npcSprites.add(this.iris);

        this.blacky = new BlackySprite('blacky', this, map, 'blackySpawn', .5, 5, 50);
        this.blacky.setBodySize(33, 42);
        this.blacky.setOffset(9, 30);
        this.allSprites.add(this.blacky);
        this.npcSprites.add(this.blacky);
        this.dogSprites.add(this.blacky);

        this.bruno = new BrunoSprite('bruno', this, map, 'brunoSpawn', .5, 5, 50);
        this.bruno.setBodySize(33, 35);
        this.bruno.setOffset(9, 35);
        this.allSprites.add(this.bruno);
        this.npcSprites.add(this.bruno);
        this.dogSprites.add(this.bruno);

        this.mopsy = new MopsySprite('mopsy', this, map, 'mopsySpawn', 1, 5, 50);
        this.mopsy.setBodySize(15, 15);
        this.allSprites.add(this.mopsy);
        this.npcSprites.add(this.mopsy);

        this.physics.add.collider(this.allSprites, world4Layer);
        this.physics.add.collider(this.allSprites, world3Layer);
        this.physics.add.collider(this.allSprites, world2Layer);
        this.physics.add.collider(this.allSprites, world1Layer);
        this.physics.add.collider(this.allSprites, world0Layer);
        this.physics.add.collider(this.npcSprites, this.allSprites);

        // Setup camera and movement controls
        const camera = this.cameras.main;

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
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        camera.fadeIn(2000, 0, 0, 0);

        //Setup quests
        this.coopBreakQuest = new CoopBreakQuest();
    }

    update(time: any, delta: any) {
        // Apply the controls to the camera each update tick of the game
        this.controls.update(delta);

        // Convenience vars
        const pointer = this.input.activePointer;
        const camera = this.cameras.main;
        const susanBody = this.susan.body as phaser.Physics.Arcade.Body;

        // Update pointer location
        this.input.activePointer.updateWorldPoint(this.cameras.main);

        // Stop any previous movement from the last frame
        susanBody.setVelocity(0);
        this.susan.interactField.setVelocity(0);

        // Run this every update tick
        this.susan.everyTick();

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

        // Everything that runs on the default delay
        if (time > this.delay) {
            this.blacky.moveWander(50);
            this.bruno.moveLeftRight(250);
            this.mopsy.moveSquare(30);
            this.delay = time + 3000;
        }

        // Coop Break Quest
        if (this.coopBreakQuest.shouldActivate(this)) {
            this.coopBreakQuest.activate(this);
        };
        if (this.coopBreakQuest.state === 'ACTIVE') {

        }
    }
}