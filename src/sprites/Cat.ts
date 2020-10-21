import * as phaser from 'phaser';
import { BaseSprite, AnimationFrames } from './Base';

export abstract class CatSprite extends BaseSprite {
    constructor(name: string, scene: phaser.Scene, map: phaser.Tilemaps.Tilemap, spawn: string, scale: number, depth: number, speed: number, animationFrames: AnimationFrames) {
        super(name, scene, map, spawn, scale, depth, 'pets', speed, animationFrames);
    }
}