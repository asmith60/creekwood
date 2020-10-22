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
}