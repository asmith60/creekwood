import * as phaser from 'phaser';
import { DogSprite } from './Dog';
import Yard from '../scenes/Yard';
import { displayText } from '../util/text';

export class BlackySprite extends DogSprite {
    following: boolean = false;
    constructor(name: string, scene: phaser.Scene, map: phaser.Tilemaps.Tilemap, spawn: string, scale: number, depth: number, speed: number) {
        super(name, scene, map, spawn, scale, depth, speed, {
            initialFrame: 1,
            turnFrame: 1,
            leftStartFrame: 12,
            leftEndFrame: 14,
            rightStartFrame: 24,
            rightEndFrame: 26,
            upStartFrame: 36,
            upEndFrame: 38,
            downStartFrame: 0,
            downEndFrame: 2
        });
    }

    public bark(scene: Yard): void {
        scene.sound.play('blackybark');

        if (!this.following) {
            this.following = true;

            displayText(scene, 'Blacky seems to be following you.\nPress the S key to tell him to stop', (scene as any).susan.body.x - 150, (scene as any).susan.body.y - 30, 8000);
        }
    }

    public everyTick(scene: Yard): void {
        if (this.following) {
            (this.body as phaser.Physics.Arcade.Body).x = scene.susan.body.x;
            (this.body as phaser.Physics.Arcade.Body).y = scene.susan.body.y + 30;
            if (phaser.Input.Keyboard.JustDown(scene.sKey)) {
                this.following = false;
            };
        }
    }
}