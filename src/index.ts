import * as phaser from 'phaser';
import PreTitle from './scenes/PreTitle';
import Title from './scenes/Title';
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
            debug: false,
            gravity: { y: 0 }
        }
    },
    render: {
        pixelArt: true
    },
    scene: [
        PreTitle,
        Title,
        Yard
    ]
};

new phaser.Game(config);