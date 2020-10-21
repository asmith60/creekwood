import * as phaser from 'phaser';
import { PersonSprite } from './Person';

export class SusanSprite extends PersonSprite {
    interactField: phaser.Physics.Arcade.Sprite;
    constructor(name: string, scene: phaser.Scene, map: phaser.Tilemaps.Tilemap, spawn: string, scale: number, depth: number, speed: number) {
        super(name, scene, map, spawn, scale, depth, speed, {
            initialFrame: 1,
            turnFrame: 1,
            leftStartFrame: 13,
            leftEndFrame: 15,
            rightStartFrame: 26,
            rightEndFrame: 28,
            upStartFrame: 39,
            upEndFrame: 41,
            downStartFrame: 0,
            downEndFrame: 2
        });

        this.body.immovable = false;

        const spawnPoint: any = map.findObject("objects", obj => obj.name === spawn);
        this.interactField = scene.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'people');
        this.interactField.setScale(scale);
        this.interactField.setDepth(depth);
        this.interactField.setBodySize(80, 55);
        this.interactField.setOffset(3, 66);
        this.interactField.setAlpha(0);
    }

    public moveLeft(speed: number = this.speed) {
        (this.body as phaser.Physics.Arcade.Body).setVelocityX(-speed);
        (this.interactField.body as phaser.Physics.Arcade.Body).x = this.body.x - 5;
        this.anims.play(`${this.name}Left`, true)
    }

    public moveRight(speed: number = this.speed) {
        (this.body as phaser.Physics.Arcade.Body).setVelocityX(speed);
        (this.interactField.body as phaser.Physics.Arcade.Body).x = this.body.x - 5;
        this.anims.play(`${this.name}Right`, true)
    }

    public moveUp(speed: number = this.speed) {
        (this.body as phaser.Physics.Arcade.Body).setVelocityY(-speed);
        (this.interactField.body as phaser.Physics.Arcade.Body).y = this.body.y - 5;
        this.anims.play(`${this.name}Up`, true)
    }

    public moveDown(speed: number = this.speed) {
        (this.body as phaser.Physics.Arcade.Body).setVelocityY(speed);
        (this.interactField.body as phaser.Physics.Arcade.Body).y = this.body.y - 5;
        this.anims.play(`${this.name}Down`, true)
    }

    public turn() {
        (this.body as phaser.Physics.Arcade.Body).setVelocity(0);
        this.anims.play(`${this.name}Turn`, true)
    }

    public stop() {
        (this.body as phaser.Physics.Arcade.Body).setVelocity(0);
        this.anims.stop();
    }
}