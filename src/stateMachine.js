import dialog from './dialog/dialog.js';
import constants from './constants.js';
import levers from './levers.js';
import { ensureDoorOpen, ensureAllDoorsClosed } from './doors.js';

const STATES = {
    normal: 'normal',
    dialog: 'dialog',
    cutScene: 'cutScene'
};

Object.freeze(STATES);

export { STATES }; 

class StateMachine {
    init (player) {
        this.game = player.scene.game;
        this.player = player;
        this.state = STATES.normal;
        this.generatorsOn = false;
    }

    setState(state) {
        this.state = state;
    }

    update() {
        switch (this.state) {
            case STATES.normal:
                this.updateMovement();
                this.handleInteractions();
                this.updateAreaSounds();
                this.player.update();
                break;
            case STATES.dialog:
                this.updateDialog();
                this.updateAreaSounds();
                break;
            case STATES.cutScene:
                // do nothing and wait till cutscene is over
        }
    }

    updateAreaSounds() {
        const playerInArea = this.player.scene.physics.overlap(this.player.sprite, this.player.scene.audioAreas, (left, right) => {
            const trigger = left === this.player.sprite ? right : left;
            if (trigger.name === 'generator-room') {
                this.game.globals.sfx.generatorRoom(this.generatorsOn);
            }
            else if (trigger.name === 'pipes-room') {
                this.game.globals.sfx.pipesRoom();
            }
        });
        if (!playerInArea) {
            this.game.globals.sfx.quietArea();
        }
    }

    handleInteractions() {
        const { SPACE, ENTER } = this.player.cursorkeys;
        const confirmPressed = Phaser.Input.Keyboard.JustDown(SPACE) || Phaser.Input.Keyboard.JustDown(ENTER);
        if (confirmPressed) {
            this.player.scene.physics.overlap(this.player.sprite, this.player.scene.speechTriggers, (left, right) => {
                const trigger = left === this.player.sprite ? right : left;
                if (trigger.getData('sound') === 'drawer') {
                    this.game.globals.sfx.drawer();
                }
                dialog.show(trigger.getData('action'), trigger);
            });
            this.player.scene.physics.overlap(this.player.sprite, this.player.scene.levers, (left, right) => {
                const trigger = left === this.player.sprite ? right : left;
                levers[trigger.getData('action')](trigger);
            });
        }

        const overlapWithDoorTrigger = this.player.scene.physics.overlap(this.player.sprite, this.player.scene.doorTriggers, (left, right) => {
            const trigger = left === this.player.sprite ? right : left;
            ensureDoorOpen(trigger.name);
        });
        if (!overlapWithDoorTrigger) {
            ensureAllDoorsClosed();
        }
    }

    updateMovement() {
        const speed = this.player.wearsSpaceSuit ? constants.speed * constants.spaceSuiteMovementMultiplier : constants.speed;

        const { LEFT, RIGHT, UP, DOWN, W, A, S, D } = this.player.cursorkeys;
        const leftPressed = (LEFT.isDown || A.isDown);
        const rightPressed = (RIGHT.isDown || D.isDown);
        const upPressed = (UP.isDown || W.isDown);
        const downPressed = (DOWN.isDown || S.isDown);

        if (!(leftPressed || rightPressed)) {
            this.player.sprite.setVelocityX(0);
        }
        else {
            this.player.sprite.setVelocityX(leftPressed ? -speed : speed);
        }

        if (!(upPressed || downPressed)) {
            this.player.sprite.setVelocityY(0);
        }
        else {
            this.player.sprite.setVelocityY(upPressed ? -speed : speed);
        }

        this.player._updateWalkingSound();
        this._correctDiagonalMovementSpeed();
    }

    _correctDiagonalMovementSpeed() {
        const velocity = this.player.sprite.body.velocity;
        if (velocity.x != 0 && velocity.y != 0) {
            // Pythagoras!
            const desiredSpeed = Math.sqrt((velocity.x * velocity.x) / 2);
            this.player.sprite.setVelocityX(desiredSpeed * Math.sign(velocity.x));
            this.player.sprite.setVelocityY(desiredSpeed * Math.sign(velocity.y));
        }
    }

    updateDialog() {
        this.player.sprite.setVelocityX(0);
        this.player.sprite.setVelocityY(0);
        const { UP, DOWN, W, S, SPACE, ENTER } = this.player.cursorkeys;
        const confirmPressed = (Phaser.Input.Keyboard.JustDown(SPACE) || Phaser.Input.Keyboard.JustDown(ENTER));
        const upPressed = (Phaser.Input.Keyboard.JustDown(UP) || Phaser.Input.Keyboard.JustDown(W));
        const downPressed = (Phaser.Input.Keyboard.JustDown(DOWN) || Phaser.Input.Keyboard.JustDown(S));

        if (dialog.menu) {
            if (downPressed && document.activeElement.nextElementSibling) {
                document.activeElement.nextElementSibling.focus();
            }
            if (upPressed && document.activeElement.previousElementSibling) {
                document.activeElement.previousElementSibling.focus();
            }
        }
        else {
            if (confirmPressed) {
                this.setState(STATES.normal);
                dialog.hide();
            }
        }
    }
}

const SINGLETON = new StateMachine();

export default SINGLETON;