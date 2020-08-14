import * as phaser from 'phaser';
import Yard from './scenes/Yard';

const config: phaser.Types.Core.GameConfig = {
    type: phaser.AUTO,
    scale: {
        parent: "game-container",
        mode: phaser.Scale.FIT
    },
    parent: "game-container",
    physics: {
        default: "arcade",
        arcade: {
            debug: true,
            gravity: { y: 0 }
        }
    },
    scene: [
        Yard
    ]
};

new phaser.Game(config);