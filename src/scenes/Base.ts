import * as phaser from 'phaser';

export abstract class BaseScene extends phaser.Scene {
    state: any = {};
    constructor(key: string) {
        super({
            key
        });
    }
}