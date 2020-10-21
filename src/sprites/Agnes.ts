import * as phaser from 'phaser';
import { BaseSprite } from './Base';

export class AgnesSprite extends BaseSprite {
    constructor(name: string, scene: phaser.Scene, map: phaser.Tilemaps.Tilemap, spawn: string, scale: number, depth: number, speed: number) {
        super(name, scene, map, spawn, scale, depth, 'pets', speed, {
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