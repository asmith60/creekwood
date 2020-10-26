import { BaseSprite, SpriteConfig } from './Base';

export abstract class CatSprite extends BaseSprite {
    constructor(spriteConfig: SpriteConfig) {
        spriteConfig.key = 'pets';
        super(spriteConfig);
    }
}