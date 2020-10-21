import * as phaser from 'phaser';
import { RabbitSprite } from './Rabbit';

export class MopsySprite extends RabbitSprite {
    constructor(name: string, scene: phaser.Scene, map: phaser.Tilemaps.Tilemap, spawn: string, scale: number, depth: number, speed: number) {
        super(name, scene, map, spawn, scale, depth, speed, {
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