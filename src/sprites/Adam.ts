import * as phaser from 'phaser';
import { PersonSprite } from './Person';
import { BaseScene } from '../scenes/Base';
import { displayText } from '../util/text';

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

    public talk(scene: BaseScene) {
        let message: string | undefined;
        if ((scene as any).coopBreakQuest.state === 'INACTIVE') {
            message = 'The chickens broke out of the coop!\nWould you please go catch them all?\nI would do it myself, but I\'m watching Iris';
            (scene as any).coopBreakQuest.activate(scene);
        } else if ((scene as any).coopBreakQuest.state === 'ACTIVE') {
            message = 'Have you caught all the chickens yet?\nCome find me when you do.';
        } else {
            message = 'Thanks for catching all the chickens.\nYou are the best!\nAlso . . .\nHappy Birthday :)';
        }
        displayText(scene, message, (scene as any).adam.body.x - 150, (scene as any).adam.body.y + 50, 8000);
    }
}