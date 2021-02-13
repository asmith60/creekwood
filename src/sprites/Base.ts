import * as phaser from 'phaser';

export abstract class BaseSprite extends phaser.Physics.Arcade.Sprite {
    moveUpDownSwitch: boolean = true;
    moveLeftRightSwitch: boolean = true;
    moveSquareSwitch: number = 0;
    speed: number;
    followers: BaseSprite[] = [];
    following: boolean = false;
    constructor(spriteConfig: SpriteConfig) {
        super(spriteConfig.scene, (spriteConfig.map.findObject("objects", obj => obj.name === spriteConfig.spawn) as any).x, (spriteConfig.map.findObject("objects", obj => obj.name === spriteConfig.spawn) as any).y, spriteConfig.key || 'none', spriteConfig.animationFrames!.initialFrame);
        spriteConfig.scene.add.existing(this);
        spriteConfig.scene.physics.add.existing(this);
        this.name = spriteConfig.name;
        if (spriteConfig.bodySizeX && spriteConfig.bodySizeY) {
            this.setBodySize(spriteConfig.bodySizeX, spriteConfig.bodySizeY);
        }
        if (spriteConfig.offsetX && spriteConfig.offsetY) {
            this.setOffset(spriteConfig.offsetX, spriteConfig.offsetY);
        }
        this.setScale(spriteConfig.scale);
        this.setDepth(spriteConfig.depth);
        this.setCollideWorldBounds(true);
        this.body.immovable = true;

        this.speed = spriteConfig.speed;

        if (spriteConfig.animationFrames) {
            spriteConfig.scene.anims.create({
                key: `${this.name}Left`,
                frames: spriteConfig.scene.anims.generateFrameNumbers(this.texture.key, { start: spriteConfig.animationFrames.leftStartFrame, end: spriteConfig.animationFrames.leftEndFrame }),
                frameRate: 10,
                repeat: -1
            });

            spriteConfig.scene.anims.create({
                key: `${this.name}Turn`,
                frames: [{ key: this.texture.key, frame: spriteConfig.animationFrames.turnFrame }],
                frameRate: 20
            });

            spriteConfig.scene.anims.create({
                key: `${this.name}Right`,
                frames: spriteConfig.scene.anims.generateFrameNumbers(this.texture.key, { start: spriteConfig.animationFrames.rightStartFrame, end: spriteConfig.animationFrames.rightEndFrame }),
                frameRate: 10,
                repeat: -1
            });

            spriteConfig.scene.anims.create({
                key: `${this.name}Up`,
                frames: spriteConfig.scene.anims.generateFrameNumbers(this.texture.key, { start: spriteConfig.animationFrames.upStartFrame, end: spriteConfig.animationFrames.upEndFrame }),
                frameRate: 10,
                repeat: -1
            });

            spriteConfig.scene.anims.create({
                key: `${this.name}Down`,
                frames: spriteConfig.scene.anims.generateFrameNumbers(this.texture.key, { start: spriteConfig.animationFrames.downStartFrame, end: spriteConfig.animationFrames.downEndFrame }),
                frameRate: 10,
                repeat: -1
            });
        }
    }

    public moveLeft(speed: number = this.speed) {
        (this.body as phaser.Physics.Arcade.Body).setVelocityX(-speed);
        this.anims.play(`${this.name}Left`, true)
    }

    public moveRight(speed: number = this.speed) {
        (this.body as phaser.Physics.Arcade.Body).setVelocityX(speed);
        this.anims.play(`${this.name}Right`, true)
    }

    public moveUp(speed: number = this.speed) {
        (this.body as phaser.Physics.Arcade.Body).setVelocityY(-speed);
        this.anims.play(`${this.name}Up`, true)
    }

    public moveDown(speed: number = this.speed) {
        (this.body as phaser.Physics.Arcade.Body).setVelocityY(speed);
        this.anims.play(`${this.name}Down`, true)
    }

    public turn() {
        (this.body as phaser.Physics.Arcade.Body).setVelocity(0);
        this.anims.play(`${this.name}Turn`, true)
    }

    public stop() {
        (this.body as phaser.Physics.Arcade.Body).setVelocity(0);
        this.anims.stop();
    }

    public moveWander(speed: number = this.speed) {
        const body = this.body as phaser.Physics.Arcade.Body;
        const option: number = Math.floor(Math.random() * Math.floor(5));

        this.stop();
        body.velocity.normalize().scale(speed);

        if (option === 0) {
            this.turn();
        } else if (option === 1) {
            this.moveLeft(speed);
        } else if (option === 2) {
            this.moveRight(speed);
        } else if (option === 3) {
            this.moveUp(speed);
        } else if (option === 4) {
            this.moveDown(speed);
        } else {
            this.stop();
        }
    }

    public moveUpDown(speed: number = this.speed) {
        const body = this.body as phaser.Physics.Arcade.Body;

        this.stop();
        body.velocity.normalize().scale(speed);

        if (this.moveUpDownSwitch) {
            this.moveUp(speed);
            this.moveUpDownSwitch = false;
        } else {
            this.moveDown(speed);
            this.moveUpDownSwitch = true;
        }
    }

    public moveLeftRight(speed: number = this.speed) {
        const body = this.body as phaser.Physics.Arcade.Body;

        this.stop();
        body.velocity.normalize().scale(speed);

        if (this.moveLeftRightSwitch) {
            this.moveRight(speed);
            this.moveLeftRightSwitch = false;
        } else {
            this.moveLeft(speed);
            this.moveLeftRightSwitch = true;
        }
    }

    public moveSquare(speed: number = this.speed) {
        const body = this.body as phaser.Physics.Arcade.Body;

        this.stop();
        body.velocity.normalize().scale(speed);

        if (this.moveSquareSwitch === 0) {
            this.moveDown(speed);
            this.moveSquareSwitch = 1;
        } else if (this.moveSquareSwitch === 1) {
            this.moveRight(speed);
            this.moveSquareSwitch = 2;
        } else if (this.moveSquareSwitch === 2) {
            this.moveUp(speed);
            this.moveSquareSwitch = 3;
        } else if (this.moveSquareSwitch === 3) {
            this.moveLeft(speed);
            this.moveSquareSwitch = 0;
        } else {
            this.stop();
        }
    }

    public follow(sprite: BaseSprite, scene: phaser.Scene, initialDistance: number = 50) {
        this.following = true;
        if (!sprite.followers.some(follower => follower.name === this.name)) {
            sprite.followers.push(this);
        }
        const followDistance = initialDistance + (sprite.followers.findIndex(follower => follower.name === this.name) * 15);
        if (phaser.Math.Distance.Between(this.body.x, this.body.y, sprite.body.x, sprite.body.y) > followDistance) {
            scene.physics.moveToObject(this, sprite, sprite.speed);
            if ((sprite.body as phaser.Physics.Arcade.Body).facing === phaser.Physics.Arcade.FACING_LEFT) {
                this.anims.play(`${this.name}Left`, true);
            } else if ((sprite.body as phaser.Physics.Arcade.Body).facing === phaser.Physics.Arcade.FACING_RIGHT) {
                this.anims.play(`${this.name}Right`, true);
            } else if ((sprite.body as phaser.Physics.Arcade.Body).facing === phaser.Physics.Arcade.FACING_UP) {
                this.anims.play(`${this.name}Up`, true);
            } else if ((sprite.body as phaser.Physics.Arcade.Body).facing === phaser.Physics.Arcade.FACING_DOWN) {
                this.anims.play(`${this.name}Down`, true);
            } else {
                this.anims.play(`${this.name}Turn`, true);
            }
            this.body.velocity.normalize().scale(sprite.speed);
        } else {
            this.stop();
        }
    }

    public stopFollow(sprite: BaseSprite) {
        sprite.followers = sprite.followers.filter(follower => follower.name !== this.name);
    }

    public moveToObject(object: phaser.GameObjects.GameObject, scene: phaser.Scene, speed: number = 150, stoppingDistance: number = 0) {
        const body = object.body as phaser.Physics.Arcade.Body;
        if (phaser.Math.Distance.Between(this.body.x, this.body.y, body.x, body.y) > stoppingDistance) {
            scene.physics.moveToObject(this, object, speed);
            if (this.body.velocity.x < 0 && Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
                this.anims.play(`${this.name}Left`, true);
            } else if (this.body.velocity.x > 0 && Math.abs(this.body.velocity.x) > Math.abs(this.body.velocity.y)) {
                this.anims.play(`${this.name}Right`, true);
            } else if (this.body.velocity.y < 0 && Math.abs(this.body.velocity.y) > Math.abs(this.body.velocity.x)) {
                this.anims.play(`${this.name}Up`, true);
            } else if (this.body.velocity.y > 0 && Math.abs(this.body.velocity.y) > Math.abs(this.body.velocity.x)) {
                this.anims.play(`${this.name}Down`, true);
            } else {
                this.anims.play(`${this.name}Turn`, true);
            }
            this.body.velocity.normalize().scale(speed);
        } else {
            this.stop();
        }
    }
}

export interface AnimationFrames {
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

export interface SpriteConfig {
    name: string;
    scene: phaser.Scene;
    map: phaser.Tilemaps.Tilemap;
    spawn: string;
    scale: number;
    depth: number;
    key?: string;
    speed: number;
    followDistance?: number;
    bodySizeX?: number;
    bodySizeY?: number;
    offsetX?: number;
    offsetY?: number;
    animationFrames?: AnimationFrames;
}