import { RabbitSprite } from './Rabbit';
import Yard from '../scenes/Yard';
import { displayText } from '../util/text';
import { SpriteConfig } from './Base';

export class MopsySprite extends RabbitSprite {
    constructor(spriteConfig: SpriteConfig) {
        spriteConfig.animationFrames = {
            initialFrame: 7,
            turnFrame: 7,
            leftStartFrame: 18,
            leftEndFrame: 20,
            rightStartFrame: 30,
            rightEndFrame: 32,
            upStartFrame: 42,
            upEndFrame: 44,
            downStartFrame: 6,
            downEndFrame: 8
        };

        super(spriteConfig);
    }

    interact(scene: Yard) {
        displayText(scene, 'Mopsy seems to be enjoying the garden', scene.susan.body.x - 150, scene.susan.body.y + 30, 5000);
    }
}