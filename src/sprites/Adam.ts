import * as phaser from 'phaser';
import { PersonSprite } from './Person';

export class AdamSprite extends PersonSprite {
    constructor(name: string, scene: phaser.Scene, map: phaser.Tilemaps.Tilemap, spawn: string, scale: number, depth: number, speed: number) {
        super(name, scene, map, spawn, scale, depth, 'people1', speed, {
            initialFrame: 55,
            turnFrame: 55,
            leftStartFrame: 66,
            leftEndFrame: 68,
            rightStartFrame: 78,
            rightEndFrame: 80,
            upStartFrame: 90,
            upEndFrame: 92,
            downStartFrame: 54,
            downEndFrame: 56
        });
    }

    public talk(scene: phaser.Scene) {
        let text: phaser.GameObjects.Text | undefined;
        if ((scene as any).coopBreakQuest.state === 'INACTIVE') {
            text = scene.add.text((scene as any).adam.body.x - 150, (scene as any).adam.body.y + 50, 'The chickens broke out of the coop!\nWould you please go catch them all?\nI would do it myself, but I\'m watching Iris', {
                font: {
                    fontSize: '12px',
                    fontFamily: '"Lucida Console", Monaco, monospace'
                },
                fill: '#ffffff',
                padding: { x: 20, y: 10 },
                backgroundColor: 'transparent',
            });
            (scene as any).coopBreakQuest.activate(scene);
        } else if ((scene as any).coopBreakQuest.state === 'ACTIVE') {
            text = scene.add.text((scene as any).adam.body.x - 150, (scene as any).adam.body.y + 50, 'Have you caught all the chickens yet?\nCome find me when you do.', {
                font: {
                    fontSize: '12px',
                    fontFamily: '"Lucida Console", Monaco, monospace'
                },
                fill: '#ffffff',
                padding: { x: 20, y: 10 },
                backgroundColor: 'transparent',
            });
        } else {
            text = scene.add.text((scene as any).adam.body.x - 150, (scene as any).adam.body.y + 50, 'Thanks for catching all the chickens.\nYou are the best!\nAlso . . .\nHappy Birthday :)', {
                font: {
                    fontSize: '12px',
                    fontFamily: '"Lucida Console", Monaco, monospace'
                },
                fill: '#ffffff',
                padding: { x: 20, y: 10 },
                backgroundColor: 'transparent',
            });
        }

        text.depth = 10;

        scene.time.delayedCall(8000, () => {
            text!.destroy()
        }, [], scene);
    }
}