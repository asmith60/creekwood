import { SpriteConfig } from './Base';
import { CatSprite } from './Cat';

export class AgnesSprite extends CatSprite {
    constructor(spriteConfig: SpriteConfig) {
        spriteConfig.animationFrames = {
            initialFrame: 58,
            turnFrame: 58,
            leftStartFrame: 69,
            leftEndFrame: 71,
            rightStartFrame: 81,
            rightEndFrame: 83,
            upStartFrame: 93,
            upEndFrame: 95,
            downStartFrame: 57,
            downEndFrame: 59
        };

        super(spriteConfig);
    }
}