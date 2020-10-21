import * as phaser from 'phaser';
import { DogSprite } from './Dog';

export class BlackySprite extends DogSprite {
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
}