import * as phaser from 'phaser';
import { wander, animalConfigs } from '../util/characters';

export default class Yard extends phaser.Scene {
    animals: phaser.Physics.Arcade.Sprite[] = [];
    delay!: number;

    constructor() {
        super({
            key: 'Title'
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
        this.load.spritesheet('pets', 'assets/sprites/pets.png', { frameWidth: 52, frameHeight: 72 });
        this.load.spritesheet('rabbits', 'assets/sprites/rabbits.png', { frameWidth: 42, frameHeight: 39 });
        this.load.spritesheet('chickens', 'assets/sprites/chickens.png', { frameWidth: 42, frameHeight: 39 });
        this.load.tilemapTiledJSON('yard', 'assets/tilemaps/yard.json');
        this.load.tilemapTiledJSON('title', 'assets/tilemaps/title.json');
    }

    create() {
        const map = this.make.tilemap({ key: 'title' });
        // Parameters are the name you gave the tileset in Tiled and then the key of the tileset image in
        // Phaser's cache (i.e. the name you used in preload)
        const farm = map.addTilesetImage('farm');
        const outside = map.addTilesetImage('outside');
        const terrain = map.addTilesetImage('terrain');
        const jungle = map.addTilesetImage('jungle');

        const allLayers = [farm, outside, terrain, jungle];

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

        for (const config of animalConfigs) {
            const animalSpawn: any = map.findObject("objects", obj => obj.name === `${config.name}Spawn`);
            const animal = this.physics.add.sprite(animalSpawn.x, animalSpawn.y, config.spriteSheetName, config.initialFrame);
            animal.name = config.name;
            animal.setCollideWorldBounds(true);
            animal.setScale(config.scale);
            animal.setDepth(6);
            this.animals.push(animal);

            this.anims.create({
                key: `${config.name}Left`,
                frames: this.anims.generateFrameNumbers(config.spriteSheetName, { start: config.leftStartFrame, end: config.leftEndFrame }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: `${config.name}Turn`,
                frames: [{ key: config.spriteSheetName, frame: config.turnFrame }],
                frameRate: 20
            });

            this.anims.create({
                key: `${config.name}Right`,
                frames: this.anims.generateFrameNumbers(config.spriteSheetName, { start: config.rightStartFrame, end: config.rightEndFrame }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: `${config.name}Up`,
                frames: this.anims.generateFrameNumbers(config.spriteSheetName, { start: config.upStartFrame, end: config.upEndFrame }),
                frameRate: 10,
                repeat: -1
            });

            this.anims.create({
                key: `${config.name}Down`,
                frames: this.anims.generateFrameNumbers(config.spriteSheetName, { start: config.downStartFrame, end: config.downEndFrame }),
                frameRate: 10,
                repeat: -1
            });
        }

        const camera = this.cameras.main;

        camera.setZoom(.94);

        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        this.delay = 3000;

        this.add.text(275, 650, 'Press any button to begin', {
            font: {
                fontSize: '30px',
                fontFamily: '"Lucida Console", Monaco, monospace'
            },
            fill: '#ffffff',
            padding: { x: 20, y: 10 },
            backgroundColor: 'transparent',

        });

        this.input.keyboard.on('keydown', () => {
            this.cameras.main.fadeOut(2000, 0, 0, 0);
        }, this);

        this.cameras.main.once(Phaser.Cameras.Scene2D.Events.FADE_OUT_COMPLETE, () => {
            this.time.delayedCall(1000, () => {
                this.scene.start('Yard');
            });
        });
    }

    update(time: any, delta: any) {
        if (time > this.delay) {
            for (const animal of this.animals) {
                wander(animal, 50);
                this.delay = time + 3000;
            }
        }

        if (this.input.activePointer.isDown) {
            this.cameras.main.fadeOut(2000, 0, 0, 0);
        }
    }
}