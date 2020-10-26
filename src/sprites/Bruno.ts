import * as phaser from 'phaser';
import { SpriteConfig } from './Base';
import { DogSprite } from './Dog';

export class BrunoSprite extends DogSprite {
    constructor(spriteConfig: SpriteConfig) {
        spriteConfig.animationFrames = {
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
        };

        super(spriteConfig);
    }

    public bark(scene: phaser.Scene) {
        scene.sound.play('brunobark');
    }
}