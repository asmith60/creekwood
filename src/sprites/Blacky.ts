import * as phaser from 'phaser';
import { DogSprite } from './Dog';
import Yard from '../scenes/Yard';
import { displayText } from '../util/text';
import { SpriteConfig } from './Base';

export class BlackySprite extends DogSprite {
    following: boolean;

    constructor(spriteConfig: SpriteConfig) {
        spriteConfig.animationFrames = {
            initialFrame: 1,
            turnFrame: 1,
            leftStartFrame: 12,
            leftEndFrame: 14,
            rightStartFrame: 24,
            rightEndFrame: 26,
            upStartFrame: 36,
            upEndFrame: 38,
            downStartFrame: 0,
            downEndFrame: 2
        };

        super(spriteConfig);

        this.following = false;
    }

    public bark(scene: Yard): void {
        scene.sound.play('blackybark');

        if (!this.following) {
            this.following = true;

            displayText(scene, 'Blacky seems to be following you.\nPress the B key to tell him to stop', (scene as any).susan.body.x - 150, (scene as any).susan.body.y - 30, 8000);
        }
    }

    public everyTick(scene: Yard): void {
        if (phaser.Input.Keyboard.JustDown(scene.bKey)) {
            this.following = false;
        };

        if (this.following) {
            if (phaser.Math.Distance.Between(this.body.x, this.body.y, scene.susan.body.x, scene.susan.body.y) > 50) {
                scene.physics.moveToObject(this, scene.susan, scene.susan.speed);
                if ((scene.susan.body as phaser.Physics.Arcade.Body).facing === phaser.Physics.Arcade.FACING_LEFT) {
                    this.anims.play(`${this.name}Left`, true);
                } else if ((scene.susan.body as phaser.Physics.Arcade.Body).facing === phaser.Physics.Arcade.FACING_RIGHT) {
                    this.anims.play(`${this.name}Right`, true);
                } else if ((scene.susan.body as phaser.Physics.Arcade.Body).facing === phaser.Physics.Arcade.FACING_UP) {
                    this.anims.play(`${this.name}Up`, true);
                } else if ((scene.susan.body as phaser.Physics.Arcade.Body).facing === phaser.Physics.Arcade.FACING_DOWN) {
                    this.anims.play(`${this.name}Down`, true);
                } else {
                    this.anims.play(`${this.name}Turn`, true);
                }
                this.body.velocity.normalize().scale(scene.susan.speed);
            } else {
                this.stop();
            }
        }
    }
}