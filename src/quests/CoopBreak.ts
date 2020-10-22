import * as phaser from 'phaser';
import { BaseQuest } from "./Base";

export class CoopBreakQuest extends BaseQuest {
    constructor() {
        super('coopBreak', 'Coop Break');
    }

    shouldActivate(scene: phaser.Scene): boolean {
        return false;
    }

    activate(scene: phaser.Scene): void {
        this.state = 'ACTIVE';
    }
}