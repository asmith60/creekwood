import * as phaser from 'phaser';
import { BaseQuest } from "./Base";
import Yard from '../scenes/Yard';
import { ChickenSprite } from '../sprites/Chicken';
import { HelenaSprite } from '../sprites/Helena';
import { RachelSprite } from '../sprites/Rachel';
import { KrystalSprite } from '../sprites/Krystal';
import { CosimaSprite } from '../sprites/Cosima';
import { AllisonSprite } from '../sprites/Allison';
import { BethSprite } from '../sprites/Beth';

export class CoopBreakQuest extends BaseQuest {

    chickensCaught: number = 0;
    constructor() {
        super('coopBreak', 'Coop Break');
    }

    activate(scene: Yard): void {
        this.state = 'ACTIVE';

        scene.helena = new HelenaSprite('helena', scene, scene.map, 'helenaSpawn', 1, 5, 250);
        scene.helena.setBodySize(17, 17);
        scene.allSprites.add(scene.helena);
        scene.npcSprites.add(scene.helena);
        scene.chickenSprites.add(scene.helena);

        scene.krystal = new KrystalSprite('krystal', scene, scene.map, 'krystalSpawn', 1, 5, 250);
        scene.krystal.setBodySize(17, 17);
        scene.allSprites.add(scene.krystal);
        scene.npcSprites.add(scene.krystal);
        scene.chickenSprites.add(scene.krystal);

        scene.rachel = new RachelSprite('rachel', scene, scene.map, 'rachelSpawn', 1, 5, 250);
        scene.rachel.setBodySize(17, 17);
        scene.allSprites.add(scene.rachel);
        scene.npcSprites.add(scene.rachel);
        scene.chickenSprites.add(scene.rachel);

        scene.beth = new BethSprite('beth', scene, scene.map, 'bethSpawn', 1, 5, 250);
        scene.beth.setBodySize(17, 17);
        scene.allSprites.add(scene.beth);
        scene.npcSprites.add(scene.beth);
        scene.chickenSprites.add(scene.beth);

        scene.cosima = new CosimaSprite('cosima', scene, scene.map, 'cosimaSpawn', 1, 5, 250);
        scene.cosima.setBodySize(17, 17);
        scene.allSprites.add(scene.cosima);
        scene.npcSprites.add(scene.cosima);
        scene.chickenSprites.add(scene.cosima);

        scene.allison = new AllisonSprite('allison', scene, scene.map, 'allisonSpawn', 1, 5, 250);
        scene.allison.setBodySize(17, 17);
        scene.allSprites.add(scene.allison);
        scene.npcSprites.add(scene.allison);
        scene.chickenSprites.add(scene.allison);

        scene.physics.add.overlap(scene.susan.interactField, scene.chickenSprites, (susan, chicken) => {
            console.log(`Caught ${chicken.name}`);
            this.chickensCaught++;
            console.log(`Total chickens caught is ${this.chickensCaught}`);
            (chicken as ChickenSprite).cluck(scene);
            let message: string;
            if (this.chickensCaught !== 6) {
                message = `You caught ${chicken.name}`;
            } else {
                message = `You caught ${chicken.name}\nThat's all of them!`;
            }
            const text = scene.add.text((scene as any).susan.body.x - 150, (scene as any).susan.body.y - 30, message, {
                font: {
                    fontSize: '12px',
                    fontFamily: '"Lucida Console", Monaco, monospace'
                },
                fill: '#ffffff',
                padding: { x: 20, y: 10 },
                backgroundColor: 'transparent',
            });

            text.depth = 10;

            scene.time.delayedCall(3000, () => {
                text!.destroy()
            }, [], scene);

            chicken.destroy();
            if (this.chickensCaught === 6) {
                this.complete(scene);
            }
        });
    }

    complete(scene: Yard): void {
        this.state = 'COMPLETE';
    }

    everyTick(scene: Yard): void {
        if (this.state === 'ACTIVE') {
            for (const entry of scene.chickenSprites.children.entries) {
                const chicken = entry as ChickenSprite;
                if (phaser.Math.Distance.Between(scene.susan.body.x, scene.susan.body.y, chicken.body.x, chicken.body.y) < 100) {
                    chicken.setVelocity(scene.susan.body.velocity.x + 100, scene.susan.body.velocity.y + 100);
                    if ((scene.susan.body as phaser.Physics.Arcade.Body).facing === phaser.Physics.Arcade.FACING_LEFT) {
                        chicken.anims.play(`${chicken.name}Left`, true);
                    } else if ((scene.susan.body as phaser.Physics.Arcade.Body).facing === phaser.Physics.Arcade.FACING_RIGHT) {
                        chicken.anims.play(`${chicken.name}Right`, true);
                    } else if ((scene.susan.body as phaser.Physics.Arcade.Body).facing === phaser.Physics.Arcade.FACING_UP) {
                        chicken.anims.play(`${chicken.name}Up`, true);
                    } else if ((scene.susan.body as phaser.Physics.Arcade.Body).facing === phaser.Physics.Arcade.FACING_DOWN) {
                        chicken.anims.play(`${chicken.name}Down`, true);
                    } else {
                        chicken.anims.play(`${chicken.name}Turn`, true)
                    }
                }
            }
        }
    }

    chickenWander(scene: Yard) {
        if (this.state === 'ACTIVE') {
            for (const entry of scene.chickenSprites.children.entries) {
                const chicken = entry as ChickenSprite;
                if (phaser.Math.Distance.Between(scene.susan.body.x, scene.susan.body.y, chicken.body.x, chicken.body.y) > 100) {
                    chicken.moveWander(50)
                }
            }
        }
    }
}