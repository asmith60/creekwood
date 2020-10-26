import * as phaser from 'phaser';
import { BaseSprite, AnimationFrames, SpriteConfig } from './Base';

export abstract class ChickenSprite extends BaseSprite {
    constructor(spriteConfig: SpriteConfig) {
        spriteConfig.key = 'chickens';
        super(spriteConfig);
    }

    public cluck(scene: phaser.Scene) {
        scene.sound.play('chickencluck');
    }
}