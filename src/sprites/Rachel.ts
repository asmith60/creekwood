import { SpriteConfig } from './Base';
import { ChickenSprite } from './Chicken';

export class RachelSprite extends ChickenSprite {
    constructor(spriteConfig: SpriteConfig) {
        spriteConfig.animationFrames = {
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
        };

        super(spriteConfig);
    }
}