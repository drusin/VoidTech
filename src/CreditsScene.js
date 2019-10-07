import { Scene } from 'phaser';

import VoidTech from './assets/VoidTech.png'

export default class CreditsScene extends Scene {
    constructor() {
        super({ key: CreditsScene.KEY });
    }
	
	static get KEY() {
		return 'credits-scene'
    }

    preload() {
        this.load.image('void_tech', VoidTech);
    }

    create() {
        const { width, height } = this.sys.game.canvas;
        this.scene.scene.add.text(width / 2 - 70, 40, "Thank you for playing..." , { fontSize: 10 });
        const image = this.add.image(width / 2, height / 4 + 25, "void_tech").setScale(0.4);

        this.scene.scene.add.text(width / 2 - 70, 100, "Ricarda M" , { fontSize: 10 });
        this.scene.scene.add.text(width / 2 - 70, 120, "Dawid Rusin" , { fontSize: 10 });
        this.scene.scene.add.text(width / 2 - 70, 140, "Murat Özkan" , { fontSize: 10 });
        this.scene.scene.add.text(width / 2 - 70, 160, "Simon Lenz" , { fontSize: 10 });
        this.scene.scene.add.text(width / 2 - 70, 180, "Sven Hemmer" , { fontSize: 10 });

        this.graphics = this.scene.scene.add.graphics();

    }
}