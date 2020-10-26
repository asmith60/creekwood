import { SpriteConfig } from './Base';
import { CatSprite } from './Cat';

export class MikaSprite extends CatSprite {
    constructor(spriteConfig: SpriteConfig) {
        spriteConfig.animationFrames = {
            initialFrame: 49,
            turnFrame: 49,
            leftStartFrame: 60,
            leftEndFrame: 62,
            rightStartFrame: 72,
            rightEndFrame: 74,
            upStartFrame: 84,
            upEndFrame: 86,
            downStartFrame: 48,
            downEndFrame: 50
        };

        super(spriteConfig);
    }
}