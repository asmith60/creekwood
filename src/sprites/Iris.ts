import * as phaser from 'phaser';
import { SpriteConfig } from './Base';
import { PersonSprite } from './Person';

export class IrisSprite extends PersonSprite {
    constructor(spriteConfig: SpriteConfig) {
        spriteConfig.animationFrames = {
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
        };

        spriteConfig.key = 'people2';

        super(spriteConfig);
    }

    public talk(scene: phaser.Scene) {
        const option: number = Math.floor(Math.random() * Math.floor(4));

        if (option === 0) {
            scene.sound.play('iristalk0');
        } else if (option === 1) {
            scene.sound.play('iristalk1', {
                volume: 1
            });
        } else if (option === 2) {
            scene.sound.play('iristalk2');
        } else if (option === 3) {
            scene.sound.play('iristalk3');
        }
    }
}