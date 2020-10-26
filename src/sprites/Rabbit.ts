import { BaseSprite, SpriteConfig } from './Base';

export abstract class RabbitSprite extends BaseSprite {
    constructor(spriteConfig: SpriteConfig) {
        spriteConfig.key = 'rabbits';
        super(spriteConfig);
    }
}