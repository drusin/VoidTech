import { Scene } from 'phaser';

import VoidTech from './assets/VoidTech.png'
import GameScene from './GameScene';

const ButtonSize = { width: 100, height: 20 };

export default class HomeScene extends Scene {
    constructor() {
        super({ key: HomeScene.KEY });
        this.music = true;
        this.sounds = true;
        this.selectedIndex = 0;
        this.menuChanged = true;
    }
	
	static get KEY() {
		return 'home-scene'
    }

    preload() {
		this.load.image('void_tech', VoidTech);
    }

    create() {
        const { width, height } = this.sys.game.canvas;
        const image = this.add.image(width / 2, height / 4, "void_tech").setScale(0.4);

        this.graphics = this.scene.scene.add.graphics();

        this.centeredText(0, "Start...");
        this.soundsText = this.centeredText(1, "Sounds: " + (this.sounds ? "ON" : "OFF"));
        this.musicText = this.centeredText(2, "Music: " + (this.music ? "ON" : "OFF"));

        this.cursorkeys = this.scene.scene.input.keyboard.createCursorKeys();
    }

    update(time, delta) {
        const { up, down, space } = this.cursorkeys;
        let action = false;
        if (Phaser.Input.Keyboard.JustDown(up)) {
            this.selectedIndex = (this.selectedIndex + 2) % 3;
            this.menuChanged = true;
        } else if (Phaser.Input.Keyboard.JustDown(down)) {
            this.selectedIndex = (this.selectedIndex + 1) % 3;
            this.menuChanged = true;
        } else if (Phaser.Input.Keyboard.JustDown(space)) {
            action = true;
            this.menuChanged = true;
        }

        if (action) {
            switch (this.selectedIndex) {
                case 0: 
                    this.scene.start(GameScene.KEY);
                break;
                case 1:
                    this.sounds = !this.sounds;
                    this.soundsText.setText("Sounds: " + (this.sounds ? "ON" : "OFF"));
                    break;
                case 2:
                    this.music = !this.music;
                    this.musicText.setText("Music: " + (this.music ? "ON" : "OFF"));
                    break;
            }
            action = false;
        }

        if (this.menuChanged) {
            this.graphics.clear();

            const {x, y} = this.buttonCoords(this.selectedIndex);
            // highlight selected option
            this.graphics.fillStyle(0x7e7e7e, 0.2);
            this.graphics.fillRect(x, y, ButtonSize.width, ButtonSize.height);

            this.menuChanged = false;
        }
    }

    centeredText(i, text) {
        const {x, y} = this.buttonCoords(i);

        return this.scene.scene.add.text(x + 5, y + 5, text, { fontSize: 10 });
    }

    buttonCoords(i) {
        const { width, height } = this.sys.game.canvas;

        const x = width / 2 - (ButtonSize.width / 2);
        const y = height / 2 + (ButtonSize.height + 5) * i;

        return {x, y};
    }
}
