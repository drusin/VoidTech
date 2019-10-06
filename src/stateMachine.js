import dialog from './dialog/dialog.js';
import constants from './constants.js';
import levers from './levers.js';

const STATES = {
    normal: 'normal',
    dialog: 'dialog'
};

Object.freeze(STATES);

export { STATES }; 

class StateMachine {
    init (player) {
        this.player = player;
        this.state = STATES.normal;
    }

    setState(state) {
        this.state = state;
    }

    update() {
        switch (this.state) {
            case STATES.normal:
                this.updateMovement();
                this.handleInteractions();
                break;
            case STATES.dialog:
                this.updateDialog();
        }
    }

    handleInteractions() {
        const { space } = this.player.cursorkeys;
        if (Phaser.Input.Keyboard.JustDown(space)) {
            this.player.scene.physics.overlap(this.player.sprite, this.player.scene.speechTriggers, (left, right) => {
                const trigger = left === this.player.sprite ? right : left;
                dialog.show(trigger.getData('action'));
            });
            this.player.scene.physics.overlap(this.player.sprite, this.player.scene.levers, (left, right) => {
                const trigger = left === this.player.sprite ? right : left;
                levers[trigger.getData('action')](trigger);
            });
            this.player.scene.sounds.lightSwitch.play();
        }
    }

    updateMovement() {
        const { left, right, up, down } = this.player.cursorkeys;
        if (!(left.isDown || right.isDown)) {
            this.player.sprite.setVelocityX(0);
        }
        else {
            this.player.sprite.setVelocityX(left.isDown ? -constants.speed : constants.speed);
        }

        if (!(up.isDown || down.isDown)) {
            this.player.sprite.setVelocityY(0);
        }
        else {
            this.player.sprite.setVelocityY(up.isDown ? -constants.speed : constants.speed);
        }

        this.player._updateWalkingSound();
        this._correctDiagonalMovementSpeed();
    }

    _correctDiagonalMovementSpeed() {
        const velocity = this.player.sprite.body.velocity;
        if (velocity.x != 0 && velocity.y != 0) {
            // Pythagoras!
            const desiredSpeed = Math.sqrt((constants.speed * constants.speed) / 2);
            this.player.sprite.setVelocityX(desiredSpeed * Math.sign(velocity.x));
            this.player.sprite.setVelocityY(desiredSpeed * Math.sign(velocity.y));
        }
    }

    updateDialog() {
        this.player.sprite.setVelocityX(0);
        this.player.sprite.setVelocityY(0);
        const { up, down, space } = this.player.cursorkeys;
        if (dialog.menu) {
            if (Phaser.Input.Keyboard.JustDown(down) && document.activeElement.nextElementSibling) {
                document.activeElement.nextElementSibling.focus();
            }
            if (Phaser.Input.Keyboard.JustDown(up) && document.activeElement.previousElementSibling) {
                document.activeElement.previousElementSibling.focus();
            }
        }
        else {
            if (Phaser.Input.Keyboard.JustDown(space)) {
                dialog.hide();
                this.setState(STATES.normal);
            }
        }
    }
}

const SINGLETON = new StateMachine();

export default SINGLETON;