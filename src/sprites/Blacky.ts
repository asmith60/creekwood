import * as phaser from 'phaser';
import { DogSprite } from './Dog';
import Yard from '../scenes/Yard';

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

    public bark(scene: phaser.Scene): void {
        scene.sound.play('blackybark');

        if (!this.following) {
            this.following = true;

            const text = scene.add.text((scene as any).susan.body.x - 150, (scene as any).susan.body.y - 30, 'Blacky seems to be following you.\nPress the S key to tell him to stop', {
                font: {
                    fontSize: '12px',
                    fontFamily: '"Lucida Console", Monaco, monospace'
                },
                fill: '#ffffff',
                padding: { x: 20, y: 10 },
                backgroundColor: 'transparent',
            });

            text.depth = 10;

            scene.time.delayedCall(8000, () => {
                text!.destroy()
            }, [], scene);
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