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

    public moveLeftWithBlacky(speed: number = this.speed, scene: Yard) {
        (this.body as phaser.Physics.Arcade.Body).setVelocityX(-speed);
        this.anims.play(`${this.name}Left`, true);
        if (scene.blacky.following) {
            scene.blacky.anims.play('blackyLeft', true);
        }
    }

    public moveRightWithBlacky(speed: number = this.speed, scene: Yard) {
        (this.body as phaser.Physics.Arcade.Body).setVelocityX(speed);
        this.anims.play(`${this.name}Right`, true)
        if (scene.blacky.following) {
            scene.blacky.anims.play('blackyRight', true);
        }
    }

    public moveUpWithBlacky(speed: number = this.speed, scene: Yard) {
        (this.body as phaser.Physics.Arcade.Body).setVelocityY(-speed);
        this.anims.play(`${this.name}Up`, true)
        if (scene.blacky.following) {
            scene.blacky.anims.play('blackyUp', true);
        }
    }

    public moveDownWithBlacky(speed: number = this.speed, scene: Yard) {
        (this.body as phaser.Physics.Arcade.Body).setVelocityY(speed);
        this.anims.play(`${this.name}Down`, true);
        if (scene.blacky.following) {
            scene.blacky.anims.play('blackyDown', true);
        }
    }

    public turnWithBlacky(scene: Yard) {
        (this.body as phaser.Physics.Arcade.Body).setVelocity(0);
        this.anims.play(`${this.name}Turn`, true);
        if (scene.blacky.following) {
            scene.blacky.anims.play('blackyTurn', true);
        }
    }

    public stopWithBlacky(scene: Yard) {
        (this.body as phaser.Physics.Arcade.Body).setVelocity(0);
        this.anims.stop();
        if (scene.blacky.following) {
            scene.blacky.anims.stop();
        }
    }

    public everyTick(): void {
        (this.interactField.body as phaser.Physics.Arcade.Body).x = this.body.x - 6;
        (this.interactField.body as phaser.Physics.Arcade.Body).y = this.body.y - 5;
    }
}