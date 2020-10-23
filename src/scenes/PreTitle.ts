import * as phaser from 'phaser';

export default class PreTitle extends phaser.Scene {
    allSprites!: phaser.GameObjects.Group;
    delay!: number;

    constructor() {
        super({
            key: 'PreTitle'
        });
    }

    preload() { }

    create() {
        this.add.text(170, 300, 'Press any button to initialize game', {
            font: {
                fontSize: '30px',
                fontFamily: '"Lucida Console", Monaco, monospace'
            },
            fill: '#ffffff',
            padding: { x: 20, y: 10 },
            backgroundColor: 'transparent',

        });

        this.input.keyboard.on('keydown', () => {
            this.scene.start('Title');
        }, this);
    }

    update(time: any, delta: any) {
        if (this.input.activePointer.isDown) {
            this.scene.start('Title ');
        }
    }
}