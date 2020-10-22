import * as phaser from 'phaser';
import { PersonSprite } from './Person';

export class IrisSprite extends PersonSprite {
    constructor(name: string, scene: phaser.Scene, map: phaser.Tilemaps.Tilemap, spawn: string, scale: number, depth: number, speed: number) {
        super(name, scene, map, spawn, scale, depth, 'people2', speed, {
            initialFrame: 59,
            turnFrame: 59,
            leftStartFrame: 0,
            leftEndFrame: 0,
            rightStartFrame: 0,
            rightEndFrame: 0,
            upStartFrame: 0,
            upEndFrame: 0,
            downStartFrame: 0,
            downEndFrame: 0
        });
    }
}