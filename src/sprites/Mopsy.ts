import * as phaser from 'phaser';
import { BaseSprite } from './Base';

export class MopsySprite extends BaseSprite {
    constructor(name: string, scene: phaser.Scene, map: phaser.Tilemaps.Tilemap, spawn: string, scale: number, depth: number, speed: number) {
        super(name, scene, map, spawn, scale, depth, 'rabbits', speed, {
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
}