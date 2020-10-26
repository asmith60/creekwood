import { BaseSprite, SpriteConfig, AnimationFrames } from './Base';

export abstract class DogSprite extends BaseSprite {
    constructor(spriteConfig: SpriteConfig) {
        spriteConfig.key = 'pets';
        super(spriteConfig);
    }
}