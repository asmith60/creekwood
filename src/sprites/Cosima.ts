import { SpriteConfig } from './Base';
import { ChickenSprite } from './Chicken';

export class CosimaSprite extends ChickenSprite {
    constructor(spriteConfig: SpriteConfig) {
        spriteConfig.animationFrames = {
            initialFrame: 37,
            turnFrame: 37,
            leftStartFrame: 12,
            leftEndFrame: 14,
            rightStartFrame: 0,
            rightEndFrame: 2,
            upStartFrame: 24,
            upEndFrame: 26,
            downStartFrame: 36,
            downEndFrame: 38
        };

        super(spriteConfig);
    }
}