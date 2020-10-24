import * as phaser from 'phaser';
import { RabbitSprite } from './Rabbit';
import Yard from '../scenes/Yard';
import { displayText } from '../util/text';

export class MopsySprite extends RabbitSprite {
    constructor(name: string, scene: phaser.Scene, map: phaser.Tilemaps.Tilemap, spawn: string, scale: number, depth: number, speed: number) {
        super(name, scene, map, spawn, scale, depth, speed, {
            initialFrame: 7,
            turnFrame: 7,
            leftStartFrame: 18,
            leftEndFrame: 20,
            rightStartFrame: 30,
            rightEndFrame: 32,
            upStartFrame: 42,
            upEndFrame: 44,
            downStartFrame: 6,
            downEndFrame: 8
        });
    }

    interact(scene: Yard) {
        displayText(scene, 'Mopsy seems to be enjoying the garden', scene.susan.body.x - 150, scene.susan.body.y + 30, 5000);
    }
}