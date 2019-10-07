export const CRITTER_KEY = 'critter';


export default class Critter {
	constructor(scene) {
        this.sprite = scene.physics.add.sprite(582, 50, CRITTER_KEY);
        this.sprite.setSize(16, 16);
        this.createAnimations(scene);
        this.scene = scene;
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