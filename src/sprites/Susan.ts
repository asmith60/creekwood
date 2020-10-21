import * as phaser from 'phaser';
import { PersonSprite } from './Person';

export class SusanSprite extends PersonSprite {
    constructor(name: string, scene: phaser.Scene, map: phaser.Tilemaps.Tilemap, spawn: string, scale: number, depth: number, speed: number) {
        super(name, scene, map, spawn, scale, depth, speed, {
            initialFrame: 1,
            turnFrame: 1,
            leftStartFrame: 13,
            leftEndFrame: 15,
            rightStartFrame: 26,
            rightEndFrame: 28,
            upStartFrame: 39,
            upEndFrame: 41,
            downStartFrame: 0,
            downEndFrame: 2
        });
    }
}