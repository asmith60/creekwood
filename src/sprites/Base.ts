import * as phaser from 'phaser';

export abstract class BaseSprite extends phaser.Physics.Arcade.Sprite {
    speed: number;
    constructor(name: string, scene: phaser.Scene, map: phaser.Tilemaps.Tilemap, spawn: string, scale: number, depth: number, key: string, speed: number, animationFrames: AnimationFrames) {
        super(scene, (map.findObject("objects", obj => obj.name === spawn) as any).x, (map.findObject("objects", obj => obj.name === spawn) as any).y, key, animationFrames.initialFrame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.name = name;
        this.setScale(scale);
        this.setDepth(depth);
        this.setCollideWorldBounds(true);

        this.speed = speed;

        scene.anims.create({
            key: `${this.name}Left`,
            frames: scene.anims.generateFrameNumbers(this.texture.key, { start: animationFrames.leftStartFrame, end: animationFrames.leftEndFrame }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: `${this.name}Turn`,
            frames: [{ key: this.texture.key, frame: animationFrames.turnFrame }],
            frameRate: 20
        });

        scene.anims.create({
            key: `${this.name}Right`,
            frames: scene.anims.generateFrameNumbers(this.texture.key, { start: animationFrames.rightStartFrame, end: animationFrames.rightEndFrame }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: `${this.name}Up`,
            frames: scene.anims.generateFrameNumbers(this.texture.key, { start: animationFrames.upStartFrame, end: animationFrames.upEndFrame }),
            frameRate: 10,
            repeat: -1
        });

        scene.anims.create({
            key: `${this.name}Down`,
            frames: scene.anims.generateFrameNumbers(this.texture.key, { start: animationFrames.downStartFrame, end: animationFrames.downEndFrame }),
            frameRate: 10,
            repeat: -1
        });
    }

    public moveLeft(speed: number = this.speed) {
        (this.body as phaser.Physics.Arcade.Body).setVelocityX(-speed);
        this.anims.play(`${this.name}Left`, true)
    }

    public moveRight(speed: number = this.speed) {
        (this.body as phaser.Physics.Arcade.Body).setVelocityX(speed);
        this.anims.play(`${this.name}Right`, true)
    }

    public moveUp(speed: number = this.speed) {
        (this.body as phaser.Physics.Arcade.Body).setVelocityY(-speed);
        this.anims.play(`${this.name}Up`, true)
    }

    public moveDown(speed: number = this.speed) {
        (this.body as phaser.Physics.Arcade.Body).setVelocityY(speed);
        this.anims.play(`${this.name}Down`, true)
    }
}

export interface AnimationFrames {
    initialFrame: number;
    turnFrame: number;
    leftStartFrame: number;
    leftEndFrame: number;
    rightStartFrame: number;
    rightEndFrame: number;
    upStartFrame: number;
    upEndFrame: number;
    downStartFrame: number;
    downEndFrame: number;
}