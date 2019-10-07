export const CRITTER_KEY = 'critter';


export default class Critter {
	constructor(scene) {
        this.sprite = scene.physics.add.staticSprite(582, 50, CRITTER_KEY);
        this.sprite.setSize(48, 48);
        this.createAnimations(scene);
        this.scene = scene;
        window.critter = this;
    }

    createAnimations(scene) {
        scene.anims.create({
            key: 'eating',
            frames: scene.anims.generateFrameNumbers(CRITTER_KEY, { start: 0, end: 4 }),
            frameRate: 10,
            repeat: 1
        });
    }

    update() {
        this.sprite.anims.play('eating', true);
    }

}