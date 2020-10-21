import * as phaser from 'phaser';
import { BaseSprite } from './Base';

export class ChickenSprite extends BaseSprite {
    constructor(name: string, scene: phaser.Scene, map: phaser.Tilemaps.Tilemap, spawn: string, scale: number, depth: number, speed: number) {
        super(name, scene, map, spawn, scale, depth, 'chickens', speed, {
            initialFrame: 37,
            turnFrame: 37,
            leftStartFrame: 12,
            leftEndFrame: 14,
            rightStartFrame: 0,
            rightEndFrame: 2,
            upStartFrame: 24,
            upEndFrame: 26,
            downStartFrame: 36,
            downEndFrame: 38
        });
    }
}