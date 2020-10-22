import * as phaser from 'phaser';
import { PersonSprite } from './Person';

export class SusanSprite extends PersonSprite {
    interactField: phaser.Physics.Arcade.Sprite;
    constructor(name: string, scene: phaser.Scene, map: phaser.Tilemaps.Tilemap, spawn: string, scale: number, depth: number, speed: number) {
        super(name, scene, map, spawn, scale, depth, 'people0', speed, {
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
        this.interactField.setAlpha(0);
    }

    public everyTick(): void {
        (this.interactField.body as phaser.Physics.Arcade.Body).x = this.body.x - 6;
        (this.interactField.body as phaser.Physics.Arcade.Body).y = this.body.y - 5;
    }
}