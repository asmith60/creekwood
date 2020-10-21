import * as phaser from 'phaser';
import { DogSprite } from './Dog';

export class BrunoSprite extends DogSprite {
    constructor(name: string, scene: phaser.Scene, map: phaser.Tilemaps.Tilemap, spawn: string, scale: number, depth: number, speed: number) {
        super(name, scene, map, spawn, scale, depth, speed, {
            initialFrame: 10,
            turnFrame: 10,
            leftStartFrame: 21,
            leftEndFrame: 23,
            rightStartFrame: 33,
            rightEndFrame: 35,
            upStartFrame: 45,
            upEndFrame: 47,
            downStartFrame: 9,
            downEndFrame: 11
        });
    }
}