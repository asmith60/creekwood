import * as phaser from 'phaser';
import { BaseSprite } from '../sprites/Base';
import { BlackySprite } from '../sprites/Blacky';
import { BrunoSprite } from '../sprites/Bruno';
import { AgnesSprite } from '../sprites/Agnes';
import { NalaSprite } from '../sprites/Nala';
import { MikaSprite } from '../sprites/Mika';
import { HelenaSprite } from '../sprites/Helena';
import { RachelSprite } from '../sprites/Rachel';
import { KrystalSprite } from '../sprites/Krystal';
import { CosimaSprite } from '../sprites/Cosima';
import { AllisonSprite } from '../sprites/Allison';
import { BethSprite } from '../sprites/Beth';
import { MopsySprite } from '../sprites/Mopsy';

export default class Title extends phaser.Scene {
    allSprites!: phaser.GameObjects.Group;
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
        this.load.spritesheet('people0', 'assets/sprites/people0.png', { frameWidth: 72, frameHeight: 110 });
        this.load.spritesheet('people1', 'assets/sprites/people1.png', { frameWidth: 77, frameHeight: 110 });
        this.load.spritesheet('people2', 'assets/sprites/people2.png', { frameWidth: 106, frameHeight: 110 });
        this.load.spritesheet('pets', 'assets/sprites/pets.png', { frameWidth: 52, frameHeight: 72 });
        this.load.spritesheet('rabbits', 'assets/sprites/rabbits.png', { frameWidth: 42, frameHeight: 39 });
        this.load.spritesheet('chickens', 'assets/sprites/chickens.png', { frameWidth: 42, frameHeight: 39 });
        this.load.tilemapTiledJSON('yard', 'assets/tilemaps/yard.json');
        this.load.tilemapTiledJSON('title', 'assets/tilemaps/title.json');
        this.load.audio('yardmusic', 'assets/audio/yardmusic.wav');
        this.load.audio('titlemusic', 'assets/audio/titlemusic.m4a');
        this.load.audio('blackybark', 'assets/audio/blackybark.m4a');
        this.load.audio('brunobark', 'assets/audio/brunobark.m4a');
        this.load.audio('chickencluck', 'assets/audio/chickencluck.mp3');
        this.load.audio('iristalk0', 'assets/audio/iristalk0.m4a');
        this.load.audio('iristalk1', 'assets/audio/iristalk1.m4a');
        this.load.audio('iristalk2', 'assets/audio/iristalk2.m4a');
        this.load.audio('iristalk3', 'assets/audio/iristalk3.m4a');
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

        this.allSprites = this.add.group([
            new HelenaSprite('helena', this, map, 'helenaSpawn', 1.5, 6, 50),
            new RachelSprite('rachel', this, map, 'rachelSpawn', 1.5, 6, 50),
            new KrystalSprite('krystal', this, map, 'krystalSpawn', 1.5, 6, 50),
            new CosimaSprite('cosima', this, map, 'cosimaSpawn', 1.5, 6, 50),
            new BethSprite('beth', this, map, 'bethSpawn', 1.5, 6, 50),
            new AllisonSprite('allison', this, map, 'allisonSpawn', 1.5, 6, 50),
            new BlackySprite('blacky', this, map, 'blackySpawn', 1, 6, 50),
            new BrunoSprite('bruno', this, map, 'brunoSpawn', 1, 6, 50),
            new AgnesSprite('agnes', this, map, 'agnesSpawn', 1, 6, 50),
            new NalaSprite('nala', this, map, 'nalaSpawn', 1, 6, 50),
            new MikaSprite('mika', this, map, 'mikaSpawn', 1, 6, 50),
            new MopsySprite('mopsy', this, map, 'mopsySpawn', 1.5, 6, 50)
        ]);

        const music = this.sound.add('titlemusic');
        music.play({
            loop: true
        });

        const camera = this.cameras.main;

        camera.scrollX = 25;

        camera.setZoom(.94);

        // Constrain the camera so that it isn't allowed to move outside the width/height of tilemap
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

        camera.fadeIn(2000, 0, 0, 0);

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
                music.stop();
            });
        });
    }

    update(time: any, delta: any) {
        if (time > this.delay) {
            for (const sprite of this.allSprites.getChildren()) {
                (sprite as BaseSprite).moveWander(50);
                this.delay = time + 3000;
            }
        }

        if (this.input.activePointer.isDown) {
            this.cameras.main.fadeOut(2000, 0, 0, 0);
        }
    }
}