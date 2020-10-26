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
import { displayText } from '../util/text';

export class CoopBreakQuest extends BaseQuest {

    chickensCaught: number = 0;
    constructor() {
        super('coopBreak', 'Coop Break');
    }

    activate(scene: Yard): void {
        this.state = 'ACTIVE';

        scene.helena = new HelenaSprite({
            name: 'helena',
            scene: scene,
            map: scene.map,
            spawn: 'helenaSpawn',
            scale: 1,
            depth: 5,
            speed: 250,
            bodySizeX: 17,
            bodySizeY: 17
        });
        scene.krystal = new KrystalSprite({
            name: 'krystal',
            scene: scene,
            map: scene.map,
            spawn: 'krystalSpawn',
            scale: 1,
            depth: 5,
            speed: 250,
            bodySizeX: 17,
            bodySizeY: 17
        });
        scene.rachel = new RachelSprite({
            name: 'rachel',
            scene: scene,
            map: scene.map,
            spawn: 'rachelSpawn',
            scale: 1,
            depth: 5,
            speed: 250,
            bodySizeX: 17,
            bodySizeY: 17
        });
        scene.cosima = new CosimaSprite({
            name: 'cosima',
            scene: scene,
            map: scene.map,
            spawn: 'cosimaSpawn',
            scale: 1,
            depth: 5,
            speed: 250,
            bodySizeX: 17,
            bodySizeY: 17
        });
        scene.beth = new BethSprite({
            name: 'beth',
            scene: scene,
            map: scene.map,
            spawn: 'bethSpawn',
            scale: 1,
            depth: 5,
            speed: 250,
            bodySizeX: 17,
            bodySizeY: 17
        });
        scene.allison = new AllisonSprite({
            name: 'allison',
            scene: scene,
            map: scene.map,
            spawn: 'allisonSpawn',
            scale: 1,
            depth: 5,
            speed: 250,
            bodySizeX: 17,
            bodySizeY: 17
        });

        scene.allSprites.add(scene.helena);
        scene.npcSprites.add(scene.helena);
        scene.chickenSprites.add(scene.helena);

        scene.allSprites.add(scene.krystal);
        scene.npcSprites.add(scene.krystal);
        scene.chickenSprites.add(scene.krystal);

        scene.allSprites.add(scene.rachel);
        scene.npcSprites.add(scene.rachel);
        scene.chickenSprites.add(scene.rachel);

        scene.allSprites.add(scene.beth);
        scene.npcSprites.add(scene.beth);
        scene.chickenSprites.add(scene.beth);

        scene.allSprites.add(scene.cosima);
        scene.npcSprites.add(scene.cosima);
        scene.chickenSprites.add(scene.cosima);

        scene.allSprites.add(scene.allison);
        scene.npcSprites.add(scene.allison);
        scene.chickenSprites.add(scene.allison);

        scene.physics.add.overlap(scene.susan.interactField, scene.chickenSprites, (susan, chicken) => {
            this.chickensCaught++;
            (chicken as ChickenSprite).cluck(scene);
            let message: string;
            if (this.chickensCaught !== 6 && this.chickensCaught !== 5) {
                message = `You caught ${chicken.name}\nThere are ${6 - this.chickensCaught} left`;
            } else if (this.chickensCaught === 5) {
                message = `You caught ${chicken.name}\nThere is ${6 - this.chickensCaught} left`;
            } else {
                message = `You caught ${chicken.name}\nThat's all of them!`;
            }

            displayText(scene, message, (scene as any).susan.body.x - 150, (scene as any).susan.body.y, 3000);

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