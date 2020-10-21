import * as phaser from 'phaser';
import { CatSprite } from './Cat';

export class AgnesSprite extends CatSprite {
    constructor(name: string, scene: phaser.Scene, map: phaser.Tilemaps.Tilemap, spawn: string, scale: number, depth: number, speed: number) {
        super(name, scene, map, spawn, scale, depth, speed, {
            initialFrame: 58,
            turnFrame: 58,
            leftStartFrame: 69,
            leftEndFrame: 71,
            rightStartFrame: 81,
            rightEndFrame: 83,
            upStartFrame: 93,
            upEndFrame: 95,
            downStartFrame: 57,
            downEndFrame: 59
        });
    }
}