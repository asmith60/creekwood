import { PersonSprite } from './Person';
import Yard from '../scenes/Yard';
import { displayText } from '../util/text';
import { SpriteConfig } from './Base';

export class AdamSprite extends PersonSprite {
    constructor(spriteConfig: SpriteConfig) {
        spriteConfig.animationFrames = {
            initialFrame: 55,
            turnFrame: 55,
            leftStartFrame: 66,
            leftEndFrame: 68,
            rightStartFrame: 78,
            rightEndFrame: 80,
            upStartFrame: 90,
            upEndFrame: 92,
            downStartFrame: 54,
            downEndFrame: 56
        };

        spriteConfig.key = 'people1';

        super(spriteConfig);
    }

    public talk(scene: Yard) {
        let message: string | undefined;
        if (scene.coopBreakQuest.state === 'INACTIVE') {
            message = 'The chickens broke out of the coop!\nWould you please go catch them all?\nI would do it myself, but I\'m watching Iris';
            scene.coopBreakQuest.activate(scene);
        } else if (scene.coopBreakQuest.state === 'ACTIVE') {
            if (!scene.coopBreakQuest.allChickensCaught) {
                message = 'Have you caught all the chickens yet?\nCome find me when you do.';
            } else {
                message = 'Looks like you caught all the chickens\nLet\'s send them back to the coop';
                scene.coopBreakQuest.chickensMovingToCoop = true;
                for (const chicken of scene.coopBreakQuest.chickensCaught) {
                    chicken.stopFollow(scene.susan);
                    scene.allSprites.remove(chicken);
                }
            }
        } else {
            message = 'Thanks for catching all the chickens.\nYou are the best!\nAlso . . .\nHappy Birthday :) . . . \nand Happy Valentine\'s Day <3';
        }
        displayText(scene, message, (scene as any).adam.body.x - 250, (scene as any).adam.body.y + 50, 8000);
    }
}