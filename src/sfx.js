import lightSwitchSound from './assets/sounds/Okt. 06, 830873-light-switch.ogg';
import lightSwitchSoundAlternative from './assets/sounds/Okt. 06, 830873-light-switch-alternative.ogg';
import walkingWood1 from './assets/sounds/Okt. 06, 508575-steps-wood.ogg';
import walkingWood2 from './assets/sounds/Okt. 06, 022498-walking-wood.ogg';
import walkingWood3 from './assets/sounds/Okt. 06, 969136-walking-wood-alternative.ogg';
import walkingMetal1 from './assets/sounds/Okt. 06, 469754-walking-metal.ogg';
import doorSwoosh from './assets/sounds/Okt. 06, 259500-door-shush.ogg';
import oxygen from './assets/sounds/Okt. 06, 581718-oxigen.ogg';
import generatorNoise1 from './assets/sounds/Okt. 07, 830680-generator-noise.ogg';
import generatorNoise2 from './assets/sounds/Okt. 07, 128891-generator-noise-alternative.ogg';
import drawerWardrobe1 from './assets/sounds/Okt. 06, 578141-drawer-wardrobe.ogg';
import putOnSpaceSuitNoise from './assets/sounds/Okt. 07, 690746-put-on-space-suit.ogg';
import heavyBreathing from './assets/sounds/Okt. 07, 755535-breathing.ogg';

import music1 from './assets/music/void tech 1.ogg';
import music2 from './assets/music/void tech 2.ogg';
import music3 from './assets/music/void tech 3.ogg';

export default class Sfx {

    constructor() {
        this.sounds = {};
		this.tracks = {};
		this.currentTrack = 1;
        this.soundsEnabled = true;
		this.musicEnabled = true;
		this.musicVolume = 1;
    }

    preloadSounds(load) {
        load.audio('light-switch-1', lightSwitchSound);
		load.audio('light-switch-2', lightSwitchSoundAlternative);
		load.audio('walking-wood-1', walkingWood1);
		load.audio('walking-wood-2', walkingWood2);
		load.audio('walking-wood-3', walkingWood3);
		load.audio('walking-metal-1', walkingMetal1);
		load.audio('door-swoosh-1', doorSwoosh);
		load.audio('oxygen', oxygen);
		load.audio('generator-noise-1', generatorNoise1);
		load.audio('generator-noise-2', generatorNoise2);
		load.audio('drawer-wardrobe-1', drawerWardrobe1);
		load.audio('put-on-space-suit-noise-1', putOnSpaceSuitNoise);
		load.audio('heavy-breathing-1', heavyBreathing);
    }

    preloadMusic(load) {
		load.audio('music-1', music1);
		load.audio('music-2', music2);
		load.audio('music-3', music3);
    }

    createSounds(sound) {
		this.sounds.lightSwitch = sound.add('light-switch-1');
		this.sounds.lightSwitchAlternative = sound.add('light-switch-2');
		this.sounds.walkingWood1 = sound.add('walking-wood-1');
		this.sounds.walkingWood2 = sound.add('walking-wood-2');
		this.sounds.walkingWood3 = sound.add('walking-wood-3');
		this.sounds.walkingMetal1 = sound.add('walking-metal-1');
		this.sounds.doorSwoosh1 = sound.add('door-swoosh-1');
		this.sounds.oxygen = sound.add('oxygen');
		this.sounds.generatorNoise = sound.add('generator-noise-2');
		this.sounds.drawerWardrobe = sound.add('drawer-wardrobe-1');
		this.sounds.putOnSpaceSuitNoise = sound.add('put-on-space-suit-noise-1');
		this.sounds.heavyBreathing = sound.add('heavy-breathing-1');

		this.sounds.walkingOnWoodSound = this.sounds.walkingWood2;
        this.sounds.walkingOnMetalSound = this.sounds.walkingMetal1;
	}

	createMusic(sound) {
		this.tracks.music1 = sound.add('music-1');
		this.tracks.music2 = sound.add('music-2');
		this.tracks.music3 = sound.add('music-3');
		
		this.setTrack(1);
	}

	generatorRoom(generatorsOn) {
		if (!this.soundsEnabled) {
			return;
		}
		if (!generatorsOn) {
			this.sounds.generatorNoise.stop();
		}
		else if (generatorsOn && !this.sounds.generatorNoise.isPlaying) {
			this.sounds.generatorNoise.play();
		}
	}

	pipesRoom() {
		if (!this.soundsEnabled) {
			return;
		}
		if (!this.sounds.oxygen.isPlaying) {
			this.sounds.oxygen.play();
		}
	}

	quietArea() {
		this.sounds.generatorNoise.stop();
		this.sounds.oxygen.stop();
	}

	notMoving() {
		this.sounds.walkingOnWoodSound.stop();
		this.sounds.walkingOnMetalSound.stop();
		this.sounds.heavyBreathing.stop();
	}

	walking(material, walkingRate, wearsSpaceSuit) {
		if (!this.soundsEnabled) {
			return;
		}
		if (material === 'metal') {
			if (this.sounds.walkingOnWoodSound.isPlaying) {
				this.sounds.walkingOnWoodSound.stop();
			}
			if (!this.sounds.walkingOnMetalSound.isPlaying) {
				this.sounds.walkingOnMetalSound.play({loop: false, rate: walkingRate});
			}
		}
		else {
			if (this.sounds.walkingOnMetalSound.isPlaying) {
				this.sounds.walkingOnMetalSound.stop();
			}
			if (!this.sounds.walkingOnWoodSound.isPlaying) {
				this.sounds.walkingOnWoodSound.play({loop: false, rate: walkingRate});
			}
		}
        if (wearsSpaceSuit) {
            if (!this.sounds.heavyBreathing.isPlaying) {
                this.sounds.heavyBreathing.play({loop: false});
            }
        }
        else {
            this.sounds.heavyBreathing.stop();
        }
	}

	doorSwoosh() {
		if (!this.soundsEnabled) {
			return;
		}
		this.sounds.doorSwoosh1.play({volume: 0.1});
	}

	lightSwitch() {
		if (!this.soundsEnabled) {
			return;
		}
		this.sounds.lightSwitch.play();
	}

	drawer() {
		if (!this.soundsEnabled) {
			return;
		}
		this.sounds.drawerWardrobe.play({volume: 0.3});
	}

	wearSpaceSuit() {
		if (this.musicEnabled) {
			this.getCurrentTrack().setVolume(0.5);
		}

		if (!this.soundsEnabled) {
			return;
		}
		this.sounds.putOnSpaceSuitNoise.play();
		this.musicVolume = 0.5;
	}

	takeOffSpaceSuit() {
		if (this.musicEnabled) {
			this.getCurrentTrack().setVolume(1);
		}

		if (!this.soundsEnabled) {
			return;
		}

		this.sounds.putOnSpaceSuitNoise.play();
		this.musicVolume = 1;
	}
	
	setSoundEnabled(enabled) {
		this.soundsEnabled = enabled;
	}

	setMusicEnabled(enabled) {
		this.musicEnabled = enabled;
		this.getCurrentTrack().setMute(!enabled);
	}

	setTrack(num) {
		if (!this.musicEnabled) {
			return;
		}
		this.currentTrack = num;
		["music1", "music2", "music3"].forEach(m => this.tracks[m].stop());
		const currentMusic = this.getCurrentTrack();
		currentMusic.play();
		currentMusic.setVolume(this.musicVolume);
	}

	getCurrentTrack() {
		return this.tracks["music" + this.currentTrack];
	}
}
