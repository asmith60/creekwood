import * as phaser from 'phaser';
import { ChickenSprite } from './Chicken';

export class HelenaSprite extends ChickenSprite {
    constructor(name: string, scene: phaser.Scene, map: phaser.Tilemaps.Tilemap, spawn: string, scale: number, depth: number, speed: number) {
        super(name, scene, map, spawn, scale, depth, speed, {
            initialFrame: 40,
            turnFrame: 40,
            leftStartFrame: 15,
            leftEndFrame: 17,
            rightStartFrame: 3,
            rightEndFrame: 5,
            upStartFrame: 27,
            upEndFrame: 29,
            downStartFrame: 39,
            downEndFrame: 41
        });
    }
}