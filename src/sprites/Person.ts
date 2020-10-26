import { BaseSprite, SpriteConfig } from './Base';

export abstract class PersonSprite extends BaseSprite {
    constructor(spriteConfig: SpriteConfig) {
        super(spriteConfig);
    }
}