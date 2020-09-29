import * as phaser from 'phaser';

export function mobileLeftCondition(pointer: phaser.Input.Pointer, player: phaser.Physics.Arcade.Sprite, camera: phaser.Cameras.Scene2D.Camera): boolean {
    if (pointer.worldX < player.getCenter().x &&
        pointer.worldX < (player.getCenter().x - (camera.displayWidth * .25)) &&
        pointer.worldY < (player.getCenter().y + (camera.displayHeight * .25)) &&
        pointer.worldY > (player.getCenter().y - (camera.displayHeight * .25))
    ) {
        return true;
    }

    return false;
}

export function mobileRightCondition(pointer: phaser.Input.Pointer, player: phaser.Physics.Arcade.Sprite, camera: phaser.Cameras.Scene2D.Camera): boolean {
    if (pointer.worldX > player.getCenter().x &&
        pointer.worldX > (player.getCenter().x + (camera.displayWidth * .25)) &&
        pointer.worldY < (player.getCenter().y + (camera.displayHeight * .25)) &&
        pointer.worldY > (player.getCenter().y - (camera.displayHeight * .25))
    ) {
        return true;
    }

    return false;
}

export function mobileUpCondition(pointer: phaser.Input.Pointer, player: phaser.Physics.Arcade.Sprite, camera: phaser.Cameras.Scene2D.Camera): boolean {
    if (pointer.worldY < player.getCenter().y &&
        pointer.worldY < (player.getCenter().y - (camera.displayHeight * .25)) &&
        pointer.worldX < (player.getCenter().x + (camera.displayWidth * .25)) &&
        pointer.worldX > (player.getCenter().x - (camera.displayWidth * .25))
    ) {
        return true;
    }

    return false;
}

export function mobileDownCondition(pointer: phaser.Input.Pointer, player: phaser.Physics.Arcade.Sprite, camera: phaser.Cameras.Scene2D.Camera): boolean {
    if (pointer.worldY > player.getCenter().y &&
        pointer.worldY > (player.getCenter().y + (camera.displayHeight * .25)) &&
        pointer.worldX < (player.getCenter().x + (camera.displayWidth * .25)) &&
        pointer.worldX > (player.getCenter().x - (camera.displayWidth * .25))
    ) {
        return true;
    }

    return false;
}