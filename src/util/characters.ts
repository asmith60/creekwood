import * as phaser from 'phaser';

export const animalConfigs: CharacterConfig[] = [
    {
        name: 'blacky',
        spriteSheetName: 'pets',
        spriteSheetPath: 'assets/sprites/pets.png',
        scale: 1,
        initialFrame: 1,
        turnFrame: 1,
        leftStartFrame: 12,
        leftEndFrame: 14,
        rightStartFrame: 24,
        rightEndFrame: 26,
        upStartFrame: 36,
        upEndFrame: 38,
        downStartFrame: 0,
        downEndFrame: 2
    },
    {
        name: 'bruno',
        spriteSheetName: 'pets',
        spriteSheetPath: 'assets/sprites/pets.png',
        scale: 1,
        initialFrame: 10,
        turnFrame: 10,
        leftStartFrame: 21,
        leftEndFrame: 23,
        rightStartFrame: 33,
        rightEndFrame: 35,
        upStartFrame: 45,
        upEndFrame: 47,
        downStartFrame: 9,
        downEndFrame: 11
    },
    {
        name: 'agnes',
        spriteSheetName: 'pets',
        spriteSheetPath: 'assets/sprites/pets.png',
        scale: 1,
        initialFrame: 58,
        turnFrame: 58,
        leftStartFrame: 69,
        leftEndFrame: 71,
        rightStartFrame: 81,
        rightEndFrame: 83,
        upStartFrame: 93,
        upEndFrame: 95,
        downStartFrame: 57,
        downEndFrame: 59
    },
    {
        name: 'nala',
        spriteSheetName: 'pets',
        spriteSheetPath: 'assets/sprites/pets.png',
        scale: 1,
        initialFrame: 49,
        turnFrame: 49,
        leftStartFrame: 60,
        leftEndFrame: 62,
        rightStartFrame: 72,
        rightEndFrame: 74,
        upStartFrame: 84,
        upEndFrame: 86,
        downStartFrame: 48,
        downEndFrame: 50
    },
    {
        name: 'mika',
        spriteSheetName: 'pets',
        spriteSheetPath: 'assets/sprites/pets.png',
        scale: 1,
        initialFrame: 49,
        turnFrame: 49,
        leftStartFrame: 60,
        leftEndFrame: 62,
        rightStartFrame: 72,
        rightEndFrame: 74,
        upStartFrame: 84,
        upEndFrame: 86,
        downStartFrame: 48,
        downEndFrame: 50
    },
    {
        name: 'helena',
        spriteSheetName: 'chickens',
        spriteSheetPath: 'assets/sprites/chickens.png',
        scale: 1.5,
        initialFrame: 37,
        turnFrame: 37,
        leftStartFrame: 12,
        leftEndFrame: 14,
        rightStartFrame: 0,
        rightEndFrame: 2,
        upStartFrame: 24,
        upEndFrame: 26,
        downStartFrame: 36,
        downEndFrame: 38
    },
    {
        name: 'krystal',
        spriteSheetName: 'chickens',
        spriteSheetPath: 'assets/sprites/chickens.png',
        scale: 1.5,
        initialFrame: 37,
        turnFrame: 37,
        leftStartFrame: 12,
        leftEndFrame: 14,
        rightStartFrame: 0,
        rightEndFrame: 2,
        upStartFrame: 24,
        upEndFrame: 26,
        downStartFrame: 36,
        downEndFrame: 38
    },
    {
        name: 'rachel',
        spriteSheetName: 'chickens',
        spriteSheetPath: 'assets/sprites/chickens.png',
        scale: 1.5,
        initialFrame: 37,
        turnFrame: 37,
        leftStartFrame: 12,
        leftEndFrame: 14,
        rightStartFrame: 0,
        rightEndFrame: 2,
        upStartFrame: 24,
        upEndFrame: 26,
        downStartFrame: 36,
        downEndFrame: 38
    },
    {
        name: 'beth',
        spriteSheetName: 'chickens',
        spriteSheetPath: 'assets/sprites/chickens.png',
        scale: 1.5,
        initialFrame: 37,
        turnFrame: 37,
        leftStartFrame: 12,
        leftEndFrame: 14,
        rightStartFrame: 0,
        rightEndFrame: 2,
        upStartFrame: 24,
        upEndFrame: 26,
        downStartFrame: 36,
        downEndFrame: 38
    },
    {
        name: 'allison',
        spriteSheetName: 'chickens',
        spriteSheetPath: 'assets/sprites/chickens.png',
        scale: 1.5,
        initialFrame: 37,
        turnFrame: 37,
        leftStartFrame: 12,
        leftEndFrame: 14,
        rightStartFrame: 0,
        rightEndFrame: 2,
        upStartFrame: 24,
        upEndFrame: 26,
        downStartFrame: 36,
        downEndFrame: 38
    },
    {
        name: 'cosima',
        spriteSheetName: 'chickens',
        spriteSheetPath: 'assets/sprites/chickens.png',
        scale: 1.5,
        initialFrame: 37,
        turnFrame: 37,
        leftStartFrame: 12,
        leftEndFrame: 14,
        rightStartFrame: 0,
        rightEndFrame: 2,
        upStartFrame: 24,
        upEndFrame: 26,
        downStartFrame: 36,
        downEndFrame: 38
    },
    {
        name: 'mopsy',
        spriteSheetName: 'rabbits',
        spriteSheetPath: 'assets/sprites/rabbits.png',
        scale: 1.5,
        initialFrame: 7,
        turnFrame: 7,
        leftStartFrame: 18,
        leftEndFrame: 20,
        rightStartFrame: 30,
        rightEndFrame: 32,
        upStartFrame: 42,
        upEndFrame: 44,
        downStartFrame: 6,
        downEndFrame: 8
    }
];

export function wander(character: phaser.Physics.Arcade.Sprite, speed: number) {
    const body = character.body as phaser.Physics.Arcade.Body;
    const option: number = Math.floor(Math.random() * Math.floor(5));

    body.setVelocity(0);
    character.anims.stop();
    body.velocity.normalize().scale(speed);

    if (option === 0) {
        body.setVelocity(0);
        character.anims.stop();
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

export interface CharacterConfig {
    name: string;
    spriteSheetName: string;
    spriteSheetPath: string;
    scale: number;
    initialFrame: number;
    turnFrame: number;
    leftStartFrame: number;
    leftEndFrame: number;
    rightStartFrame: number;
    rightEndFrame: number;
    upStartFrame: number;
    upEndFrame: number;
    downStartFrame: number;
    downEndFrame: number;
}