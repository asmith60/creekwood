import * as phaser from 'phaser';
import { PersonSprite } from './Person';
import Yard from '../scenes/Yard';
import { SpriteConfig } from './Base';

export class SusanSprite extends PersonSprite {
    interactField: phaser.Physics.Arcade.Sprite;
    constructor(spriteConfig: SpriteConfig) {
        spriteConfig.animationFrames = {
            initialFrame: 1,
            turnFrame: 1,
            leftStartFrame: 13,
            leftEndFrame: 15,
            rightStartFrame: 26,
            rightEndFrame: 28,
            upStartFrame: 39,
            upEndFrame: 41,
            downStartFrame: 0,
            downEndFrame: 2
        };

        spriteConfig.key = 'people0';

        super(spriteConfig);

        this.body.immovable = false;

        const spawnPoint: any = spriteConfig.map.findObject("objects", obj => obj.name === spriteConfig.spawn);
        this.interactField = spriteConfig.scene.physics.add.sprite(spawnPoint.x, spawnPoint.y, 'people0');
        this.interactField.setScale(spriteConfig.scale);
        this.interactField.setDepth(spriteConfig.depth);
        this.interactField.setBodySize(80, 55);
        this.interactField.setAlpha(0);
    }

    public everyTick(): void {
        (this.interactField.body as phaser.Physics.Arcade.Body).x = this.body.x - 6;
        (this.interactField.body as phaser.Physics.Arcade.Body).y = this.body.y - 5;
    }
}