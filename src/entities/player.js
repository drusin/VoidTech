export const PLAYER_TILESET_KEY = 'chara';
import constants from '../constants.js';

export default class Player {
	constructor(scene) {
        this.sprite = scene.physics.add.sprite(constants.START_X, constants.START_Y, PLAYER_TILESET_KEY);
        this.sprite.setSize(16, 16);
        this.createAnimations(scene);
        this.cursorkeys = scene.input.keyboard.createCursorKeys();
        this.dialogs = scene.Dialog;
        this.scene = scene;
        this.wearsSpaceSuit = false;
    }

    createAnimations(scene) {
        scene.anims.create({
            key: 'walking',
            frames: scene.anims.generateFrameNumbers(PLAYER_TILESET_KEY, { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        });
        scene.anims.create({
            key: 'putOnSpaceSuit',
            frames: scene.anims.generateFrameNumbers(PLAYER_TILESET_KEY, { start: 8, end: 11 }),
            frameRate: 5,
            repeat: 0
        });
        scene.anims.create({
            key: 'standing',
            frames: scene.anims.generateFrameNumbers(PLAYER_TILESET_KEY, { start: 0, end: 0 }),
            frameRate: 1,
            repeat: -1
        });
    }

    _updateAnimation() {
        if (this.sprite.body.velocity.x != 0 || this.sprite.body.velocity.y != 0) {
            this.sprite.anims.play('walking', true);

            // rotate sprite according to body and correct different rotation systems
            this.sprite.rotation = this.sprite.body.angle + Math.PI / 2;
        }
        else {
            // console.log('set anim to standing')
            this.sprite.anims.play('standing', true);
        }
    }

    _updateWalkingSound() {
        const walkingOnWoodSound = this.scene.sounds.walkingWood2;
        const walkingOnMetalSound = this.scene.sounds.walkingMetal1;

        const tileStandingOn = this.scene.walkableLayer.getTileAtWorldXY(this.sprite.x, this.sprite.y);
        const currentFloorType = tileStandingOn.properties['floorType'];

        if (!this._isMoving(this.sprite.body.velocity)) {
            walkingOnWoodSound.stop();
            walkingOnMetalSound.stop();
        }
        else {
            if (currentFloorType === 'metal') {
                if (walkingOnWoodSound.isPlaying) {
                    walkingOnWoodSound.stop();
                }
                if (!walkingOnMetalSound.isPlaying) {
                    walkingOnMetalSound.play({loop: false});
                }
            }
            else {
                if (walkingOnMetalSound.isPlaying) {
                    walkingOnMetalSound.stop();
                }
                if (!walkingOnWoodSound.isPlaying) {
                    walkingOnWoodSound.play({loop: false});
                }
            }
        }
    }

    _isMoving(velocity) {
        return velocity.x != 0 || velocity.y != 0;
    }

    update() {
        // this._updateMovement();
        this._updateAnimation();
    }
}