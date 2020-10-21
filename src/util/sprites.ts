import * as phaser from 'phaser';

export function wander(character: phaser.Physics.Arcade.Sprite, speed: number) {
    const body = character.body as phaser.Physics.Arcade.Body;
    const option: number = Math.floor(Math.random() * Math.floor(5));

    body.setVelocity(0);
    character.anims.stop();
    body.velocity.normalize().scale(speed);

    if (option === 0) {
        body.setVelocity(0);
        character.anims.play(`${character.name}Turn`, true);
    } else if (option === 1) {
        body.setVelocityY(-speed);
        character.anims.play(`${character.name}Up`, true);
    } else if (option === 2) {
        body.setVelocityY(speed);
        character.anims.play(`${character.name}Down`, true);
    } else if (option === 3) {
        body.setVelocityX(-speed);
        character.anims.play(`${character.name}Left`, true);
    } else if (option === 4) {
        body.setVelocityX(speed);
        character.anims.play(`${character.name}Right`, true);
    } else {
        body.setVelocity(0);
        character.anims.stop();
    }
}