import * as phaser from 'phaser';
import { CatSprite } from './Cat';

export class NalaSprite extends CatSprite {
    constructor(name: string, scene: phaser.Scene, map: phaser.Tilemaps.Tilemap, spawn: string, scale: number, depth: number, speed: number) {
        super(name, scene, map, spawn, scale, depth, speed, {
            initialFrame: 49,
            turnFrame: 49,
            leftStartFrame: 60,
            leftEndFrame: 62,
            rightStartFrame: 72,
            rightEndFrame: 74,
            upStartFrame: 84,
            upEndFrame: 86,
            downStartFrame: 48,
            downEndFrame: 50
        });
    }
}