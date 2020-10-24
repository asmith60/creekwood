import * as phaser from 'phaser';
import { BaseScene } from '../scenes/Base';

export function displayText(scene: BaseScene, message: string, x: number, y: number, time: number, fontSize: string = '12px'): void {
    if (scene.state.text) {
        scene.state.text.destroy();
        scene.state.text = null;
        if (scene.state.textTimer) {
            scene.state.textTimer.destroy();
            scene.state.textTimer = null;
        }
    }

    scene.state.text = scene.add.text(x, y, message, {
        font: {
            fontSize,
            fontFamily: '"Lucida Console", Monaco, monospace'
        },
        fill: '#ffffff',
        padding: { x: 20, y: 10 },
        backgroundColor: 'transparent',
    });

    scene.state.text.depth = 10;

    scene.state.textTimer = scene.time.delayedCall(time, () => {
        scene.state.text!.destroy()
        scene.state.text = null;
        scene.state.textTimer = null;
    }, [], scene);
}